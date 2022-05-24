from RPi import GPIO
from helpers.i2c import i2c
from subprocess import check_output
import time

class LCD:
    def __init__(self, addres, rs_pin, enable_pin):
        self.i2c_dev = i2c(addres, 1)

        self.addres = addres
        self.rs_pin = rs_pin
        self.enable_pin = enable_pin

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.rs_pin, GPIO.OUT)
        GPIO.setup(self.enable_pin, GPIO.OUT)

    def send_instruction(self, data):
        GPIO.output(self.rs_pin, 0)
        GPIO.output(self.enable_pin, 1)
        self.i2c_dev.write_cmd(data)
        time.sleep(0.01)
        GPIO.output(self.enable_pin, 0)

    def send_char(self, data):
        ascii_value = ord(data)

        GPIO.output(self.rs_pin, 1)
        GPIO.output(self.enable_pin, 1)
        self.i2c_dev.write_cmd(ascii_value)
        time.sleep(0.01)
        GPIO.output(self.enable_pin, 0)

    def send_text(self, text):
        for letter in text:
            self.send_char(letter)

    def First_line(self):
        self.send_instruction(0b1<<7 | 0x00)


    def Second_line(self):
        self.send_instruction(0b1<<7 | 0x40)

    def send_ip(self):
        self.ips = check_output(['hostname', '--all-ip-addresses'])
        self.decoded_ips = self.ips.decode('utf-8')
        ip_list = self.decoded_ips.split()

        self.First_line()
        self.send_text(str(ip_list[0]))
        self.Second_line()
        self.send_text(str(ip_list[1]))

    def send_cubes(self, amount):
        cube_char = chr(219)
        self.First_line()
        for i in range(int(amount)):
            GPIO.output(self.rs_pin, 1)
            GPIO.output(self.enable_pin, 1)
            self.i2c_dev.write_cmd(ord(cube_char))
            time.sleep(0.01)
            GPIO.output(self.enable_pin, 0)