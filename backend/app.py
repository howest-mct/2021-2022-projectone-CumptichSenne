from crypt import methods
from datetime import datetime
from glob import glob
from urllib.request import Request
from wsgiref.util import request_uri
from RPi import GPIO
from helpers.display import LCD
from helpers.mcp import MCP
import time
import threading

from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify, request
from flask_cors import CORS
from repositories.DataRepository import DataRepository

from selenium import webdriver

lcd = LCD(0x20, 21, 20)
buzzer = 24
ledblauw = 26
ledgroen = 19
var = MCP(0, 0)
var2 = MCP(0, 0)
sensor_file_name = '/sys/bus/w1/devices/28-01205f3bba45/w1_slave'
status_sensor = -1
id_sensor = 0

#De te gebruiken instructies
LCD_FunctieSet = 0b00111000
LCD_DisplayAan = 0b00001111
LCD_DisplayUit = 0b00001000
LCD_DisplayLegenTerugHome = 0b00000001

# Code voor Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'geheim!'
socketio = SocketIO(app, cors_allowed_origins="*", logger=False,
                    engineio_logger=False, ping_timeout=1)

CORS(app)

endpoint = '/api/v1'

@app.route(endpoint + '/devices/', methods=['GET'])
def get_devices():
    if request.method == 'GET':
        return jsonify(devices=DataRepository.read_devices()), 200

@app.route(endpoint + '/temperatuur/', methods=['GET'])
def get_temperatuur_chart():
    if request.method == 'GET':
        return jsonify(temperatuur=DataRepository.read_temp_chart()), 200

@app.route(endpoint + '/kwalitiet/', methods=['GET'])
def get_kwaliteit_chart():
    if request.method == 'GET':
        return jsonify(kwaliteit=DataRepository.read_kwaliteit_chart()), 200

@app.route(endpoint + '/ph/', methods=['GET'])
def get_ph_chart():
    if request.method == 'GET':
        return jsonify(ph=DataRepository.read_ph_chart()), 200

@app.route(endpoint + '/temp/radial/', methods=['GET'])
def get_temp_radial():
    if request.method == 'GET':
        return jsonify(TempRadial=DataRepository.read_temp_radial()), 200

@app.route(endpoint + '/kwaliteit/radial/', methods=['GET'])
def get_kwaliteit_radial():
    if request.method == 'GET':
        return jsonify(KwaliteitRadial=DataRepository.read_kwaliteit_radial()), 200

@app.route(endpoint + '/ph/radial/', methods=['GET'])
def get_ph_radial():
    if request.method == 'GET':
        return jsonify(phRadial=DataRepository.read_ph_radial()), 200

@app.route(endpoint + '/status/', methods=['GET'])
def get_status():
    if request.method == 'GET':
        return jsonify(status=DataRepository.read_status()), 200

@app.route(endpoint + '/status/<DeviceID>/', methods=['PUT'])
def set_device_status(DeviceID):
    if request.method == 'PUT':
        gegevens = DataRepository.json_or_formdata(request)
        data = DataRepository.update_status(
            gegevens['Geactiveerd'], DeviceID)
        return jsonify(device=DeviceID), 200

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print(e)

# API ENDPOINTS


@app.route('/')
def hallo():
    return "Server is running, er zijn momenteel geen API endpoints beschikbaar."


@socketio.on('connect')
def initial_connection():
    print('A new client connect')
    # # Send to the client!
    # vraag de status op van de lampen uit de DB
    status = DataRepository.read_status()
    emit('B2F_status', {'status': status}, broadcast=True)
    temp = DataRepository.read_temp_radial()
    emit('B2F_temp', {'temperatuur': temp}, broadcast=True)
    kwaliteit = DataRepository.read_kwaliteit_radial()
    emit('B2F_kwaliteit', {'kwaliteit': kwaliteit}, broadcast=True)
    ph = DataRepository.read_ph_radial()
    emit('B2F_ph', {'ph': ph}, broadcast=True)
    templine = DataRepository.read_temp_chart()
    emit('B2F_temp_chart', {'temperatuurLine': templine}, broadcast=True)
    kwaliteitline = DataRepository.read_kwaliteit_chart()
    emit('B2F_kwaliteit_chart', {'kwaliteitLine': kwaliteitline}, broadcast=True)
    phline = DataRepository.read_ph_chart()
    emit('B2F_ph_chart', {'phLine': phline}, broadcast=True)

@socketio.on('F2B_actief')
def switch_status(data):
    global status_sensor
    global id_sensor
    # Ophalen van de data
    deviceid = data['DeviceID']
    id_sensor = deviceid
    new_status = data['Geactiveerd']
    if new_status == 0:
        status_sensor = 0
    elif new_status == 1:
        status_sensor = 1
    print(f"sensor {deviceid} wordt geswitcht naar {new_status}")

    # Stel de status in op de DB
    res = DataRepository.update_status(new_status, deviceid)

    # Vraag de (nieuwe) status op van de lamp en stuur deze naar de frontend.
    data = DataRepository.read_status()
    socketio.emit('B2F_verandering_lamp', {'lamp': data}, broadcast=True)

# START een thread op. Belangrijk!!! Debugging moet UIT staan op start van de server, anders start de thread dubbel op
# werk enkel met de packages gevent en gevent-websocket.
def all_out():
    while True:
        lcd.send_ip()
        with open(sensor_file_name,'r') as sensor_file:
            for line in sensor_file:
                now = datetime.now()
                dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
                deelstring = str.rstrip(line)
                positie = deelstring.rfind("t=")
                if (positie > 0):
                    temp = round((float(line[positie+2:-1])/1000),2)
                    print(f"De temperatuur is: {temp:>8} °Celsius")
                    GPIO.output(buzzer, GPIO.HIGH)
                    if (temp > 40):
                        status = 3
                        GPIO.output(ledblauw, GPIO.HIGH)
                    elif (temp <= 40 and temp >= 5):
                        status = 2
                        GPIO.output(ledgroen, GPIO.HIGH)
                    else:
                        status = 1
                        GPIO.output(ledblauw, GPIO.HIGH)
                    time.sleep(0.4)
                    GPIO.output(buzzer, GPIO.LOW)
                    GPIO.output(ledblauw, GPIO.LOW)
                    GPIO.output(ledgroen, GPIO.LOW)
                    time.sleep(2)
                    DataRepository.create_waarde(dt_string,temp,"Gemeten temperatuur",1,3,status)
                    kwaliteit = var.analog_to_waarde(var.read_channel(0b10000000))
                    print(f"De gemeten kwaliteit van het water is: {kwaliteit}")
                    GPIO.output(buzzer, GPIO.HIGH)
                    if (kwaliteit > 500):
                        status_kwaliteit = 3
                        GPIO.output(ledblauw, GPIO.HIGH)
                    elif(kwaliteit <= 500 and kwaliteit >= 100):
                        status_kwaliteit = 2
                        GPIO.output(ledgroen, GPIO.HIGH)
                    else:
                        status_kwaliteit = 1
                        GPIO.output(ledblauw, GPIO.HIGH)
                    time.sleep(0.4)
                    GPIO.output(buzzer, GPIO.LOW)
                    GPIO.output(ledblauw, GPIO.LOW)
                    GPIO.output(ledgroen, GPIO.LOW)
                    time.sleep(2)
                    DataRepository.create_waarde(dt_string,kwaliteit,"Gemeten kwaliteit waarde",2,3,status_kwaliteit)
                    ph = round(var2.analog_to_waarde(var2.read_channel(0b10100010))/500/3.3*14,2)
                    print(f"De gemeten pH-waarde van het water is: {ph}")
                    GPIO.output(buzzer, GPIO.HIGH)
                    if (ph > 9):
                        status_ph = 3
                        GPIO.output(ledblauw, GPIO.HIGH)
                    elif(ph <= 9 and ph >= 6):
                        status_ph = 2
                        GPIO.output(ledgroen, GPIO.HIGH)
                    else:
                        status_ph = 1
                        GPIO.output(ledblauw, GPIO.HIGH)
                    time.sleep(0.4)
                    GPIO.output(buzzer, GPIO.LOW)
                    GPIO.output(ledblauw, GPIO.LOW)
                    GPIO.output(ledgroen, GPIO.LOW)
                    time.sleep(2)
                    DataRepository.create_waarde(dt_string,ph,"Gemeten pH-waarde",3,3,status_ph)
        kwaliteit = DataRepository.read_kwaliteit_radial()
        temperatuur = DataRepository.read_temp_radial()
        socketio.emit('B2F_temp', {'temperatuur': temperatuur})
        socketio.emit('B2F_kwaliteit', {'kwaliteit': kwaliteit})
        ph = DataRepository.read_ph_radial()
        socketio.emit('B2F_ph', {'ph': ph})
        status = DataRepository.read_status()
        socketio.emit('B2F_status', {'status': status})
        temp_chart = DataRepository.read_temp_chart()
        socketio.emit('B2F_temp_chart', {'temp': temp_chart})
        kwaliteit_chart = DataRepository.read_kwaliteit_chart()
        socketio.emit('B2F_kwaliteit_chart', {'kwaliteit': kwaliteit_chart})
        ph_chart = DataRepository.read_ph_chart()
        socketio.emit('B2F_ph_chart', {'ph': ph_chart})
        time.sleep(10) 

def start_thread():
    print("**** Starting THREAD ****")
    thread = threading.Thread(target=all_out, args=(), daemon=True)
    thread.start()

def start_chrome_kiosk():
    import os

    os.environ['DISPLAY'] = ':0.0'
    options = webdriver.ChromeOptions()
    # options.headless = True
    # options.add_argument("--window-size=1920,1080")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36")
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--allow-running-insecure-content')
    options.add_argument("--disable-extensions")
    # options.add_argument("--proxy-server='direct://'")
    options.add_argument("--proxy-bypass-list=*")
    options.add_argument("--start-maximized")
    options.add_argument('--disable-gpu')
    # options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')
    options.add_argument('--kiosk')
    # chrome_options.add_argument('--no-sandbox')         
    # options.add_argument("disable-infobars")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    driver = webdriver.Chrome(options=options)
    driver.get("http://localhost")
    while True:
        pass


def start_chrome_thread():
    print("**** Starting CHROME ****")
    chromeThread = threading.Thread(target=start_chrome_kiosk, args=(), daemon=True)
    chromeThread.start()

def setup_gpio():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(buzzer,GPIO.OUT)
    GPIO.setup(ledgroen,GPIO.OUT)
    GPIO.setup(ledblauw,GPIO.OUT)


lcd.send_instruction(LCD_FunctieSet)
lcd.send_instruction(LCD_DisplayAan)
lcd.send_instruction(LCD_DisplayLegenTerugHome)

# ANDERE FUNCTIES


if __name__ == '__main__':
    try:
        setup_gpio()
        start_thread()
        start_chrome_thread()
        print("**** Starting APP ****")
        socketio.run(app, debug=False, host='0.0.0.0')
    except KeyboardInterrupt:
        print ('KeyboardInterrupt exception is caught')
    finally:
        GPIO.cleanup()