from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens
    
    @staticmethod
    def read_history():
        sql = "SELECT h.HistoriekID, h.actiedatum ,concat(h.waarde, ' (', d.meeteenheid, ')') as 'Waarde', d.beschrijving as 'Sensor' FROM ProjectOneDB.Historiek h join ProjectOneDB.Device d on h.DeviceID = d.DeviceID where d.Type = 'Sensor' order by h.actiedatum desc;"
        return Database.get_rows(sql)
    
    @staticmethod
    def read_devices():
        sql = 'select * from Device where Type = "Sensor";'
        return Database.get_rows(sql)

    @staticmethod
    def Read_history_per_device(deviceID):
        sql = "SELECT h.HistoriekID, h.actiedatum ,concat(h.waarde, ' (', d.meeteenheid, ')') as 'Waarde', d.beschrijving as 'Sensor' FROM ProjectOneDB.Historiek h join ProjectOneDB.Device d on h.DeviceID = d.DeviceID where d.Type = 'Sensor' and d.deviceID = %s order by h.actiedatum desc;"
        params = [deviceID]
        return Database.get_rows(sql,params)

    @staticmethod
    def create_waarde(actiedatum, waarde, commentaar, deviceid, actieid, statusid):
        sql = "insert into Historiek(actiedatum, waarde, commentaar, deviceid, actieid, statusid) values (%s,%s,%s,%s,%s,%s);"
        params = [actiedatum, waarde,commentaar,deviceid,actieid,statusid]
        return Database.execute_sql(sql,params)
    
    @staticmethod
    def read_temp_chart():
        sql= "Select waarde, actiedatum from ProjectOneDB.Historiek where DeviceID = 1 order by Actiedatum desc limit 7;"
        return Database.get_rows(sql)

    @staticmethod
    def read_kwaliteit_chart():
        sql= "Select waarde, actiedatum from ProjectOneDB.Historiek where DeviceID = 2 order by Actiedatum desc limit 7;"
        return Database.get_rows(sql)

    @staticmethod
    def read_ph_chart():
        sql= "Select waarde, actiedatum from ProjectOneDB.Historiek where DeviceID = 3 order by Actiedatum desc limit 7;"
        return Database.get_rows(sql)
    
    @staticmethod
    def read_temp_radial():
        sql="Select waarde from ProjectOneDB.Historiek where DeviceID = 1 order by Actiedatum desc limit 1;"
        return Database.get_rows(sql)

    @staticmethod
    def read_kwaliteit_radial():
        sql="Select waarde from ProjectOneDB.Historiek where DeviceID = 2 order by Actiedatum desc limit 1;"
        return Database.get_rows(sql)

    @staticmethod
    def read_ph_radial():
        sql="Select waarde from ProjectOneDB.Historiek where DeviceID = 3 order by Actiedatum desc limit 1;"
        return Database.get_rows(sql)
    
    @staticmethod
    def read_status():
        sql="SELECT deviceid, geactiveerd FROM ProjectOneDB.Device where type = 'sensor';"
        return Database.get_rows(sql)
