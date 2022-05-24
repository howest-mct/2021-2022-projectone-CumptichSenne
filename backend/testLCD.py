from RPi import GPIO
from helpers.display import LCD
import time

lcd = LCD(0x20, 21, 20)

#De te gebruiken instructies
LCD_FunctieSet = 0b00111000
LCD_DisplayAan = 0b00001111
LCD_DisplayUit = 0b00001000
LCD_DisplayLegenTerugHome = 0b00000001

def setup():
    GPIO.setmode(GPIO.BCM)

lcd.send_instruction(LCD_FunctieSet)
lcd.send_instruction(LCD_DisplayAan)
lcd.send_instruction(LCD_DisplayLegenTerugHome)
setup()
try:
    while True:   
        lcd.send_ip()
        time.sleep(0.1)

except Exception as e:
    print(e)

finally:
    print('Cleanup pi')
    GPIO.cleanup()