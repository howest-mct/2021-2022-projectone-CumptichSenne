import string
from RPi import GPIO
import time

sensor_file_name = '/sys/bus/w1/devices/28-01205f3bba45/w1_slave'

try:
    while True:
        with open(sensor_file_name,'r') as sensor_file:
            for line in sensor_file:
                deelstring = str.rstrip(line)
                positie = deelstring.rfind("t=")
                if (positie > 0):
                    temp = round((float(line[positie+2:-1])/1000-4),2)
                    print(f"De temperatuur is: {temp:>8} °Celsius")
        time.sleep(1)
        
except KeyboardInterrupt:
    
    pass