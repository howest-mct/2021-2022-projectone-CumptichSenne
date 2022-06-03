from crypt import methods
from datetime import datetime
from urllib.request import Request
from wsgiref.util import request_uri
from RPi import GPIO
from helpers.display import LCD
from helpers.mcp import MCP
import time
import string
import threading

from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify, request
from flask_cors import CORS
from repositories.DataRepository import DataRepository

from selenium import webdriver

lcd = LCD(0x20, 21, 20)
var = MCP(0, 0)
sensor_file_name = '/sys/bus/w1/devices/28-012062255871/w1_slave'

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

@app.route(endpoint + '/historiek/', methods=['GET'])
def get_historiek():
    if request.method == 'GET':
        return jsonify(historiek=DataRepository.read_history()), 200

@app.route(endpoint + '/devices/', methods=['GET'])
def get_devices():
    if request.method == 'GET':
        return jsonify(devices=DataRepository.read_devices()), 200

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
    status = DataRepository.read_history()
    emit('B2F_shistory', {'historiek': status}, broadcast=True)

# START een thread op. Belangrijk!!! Debugging moet UIT staan op start van de server, anders start de thread dubbel op
# werk enkel met de packages gevent en gevent-websocket.
def all_out():
    while True:
        lcd.send_ip()
        with open(sensor_file_name,'r') as sensor_file:
            for line in sensor_file:
                deelstring = str.rstrip(line)
                positie = deelstring.rfind("t=")
                if (positie > 0):
                    temp = round((float(line[positie+2:-1])/1000),2)
                    print(f"De temperatuur is: {temp:>8} °Celsius")
            waarde = var.analog_to_waarde(var.read_channel(0b10000000))
            print(waarde)
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        if (temp > 40):
            status = 3
        elif (temp <= 40 and temp >= 5):
            status = 2
        else:
            status = 1
        DataRepository.create_waarde(dt_string,temp,"Gemeten temperatuur",1,3,status)
        DataRepository.create_waarde(dt_string,waarde,"Gemeten kwaliteit waarde",2,3,2)
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

lcd.send_instruction(LCD_FunctieSet)
lcd.send_instruction(LCD_DisplayAan)
lcd.send_instruction(LCD_DisplayLegenTerugHome)

# ANDERE FUNCTIES


if __name__ == '__main__':
    app.run(debug=True) 
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