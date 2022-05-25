from RPi import GPIO
import spidev

class MCP:
    def __init__(self,SPIbus=0,slave=0) -> None:
        self.spi = spidev.SpiDev()
        self.spi.open(SPIbus,slave)
        self.spi.max_speed_hz = 10**5
    
    @staticmethod
    def analog_to_waarde(waarde):
        return waarde
    
    def read_channel(self,channel):
        byte_out = [0b1, channel, 0x00]
        byte_in = self.spi.xfer(byte_out)
        waarde = ((byte_in[1]&3) << 8) | (byte_in[2])
        return waarde
    
    def closespi(self):
        self.spi.close()