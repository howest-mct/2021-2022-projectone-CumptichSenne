import time
import smbus

class i2c:
    def __init__(self, addr, port):
      self.addr = addr
      self.bus = smbus.SMBus(port)

    # Een commando versturen
    def write_cmd(self, cmd):
      self.bus.write_byte(self.addr, cmd)
      time.sleep(0.0001)