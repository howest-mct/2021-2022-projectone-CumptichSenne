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
    def read_devices():
        sql = 'select * from Device where Type = "Sensor";'
        return Database.get_rows(sql)

    @staticmethod
    def create_waarde(actiedatum, waarde, commentaar, deviceid, actieid, statusid):
        sql = "insert into Historiek(actiedatum, waarde, commentaar, deviceid, actieid, statusid) values (%s,%s,%s,%s,%s,%s);"
        params = [actiedatum, waarde,commentaar,deviceid,actieid,statusid]
        return Database.execute_sql(sql,params)
    
    @staticmethod
    def read_temp_chart():
        sql= "Select waarde, unix_timestamp(actiedatum)*1000 as 'actiedatum' from ProjectOneDB.Historiek where DeviceID = 1 order by Actiedatum desc limit 7;"
        return Database.get_rows(sql)

    @staticmethod
    def read_kwaliteit_chart():
        sql= "Select waarde, unix_timestamp(actiedatum)*1000 from ProjectOneDB.Historiek where DeviceID = 2 order by Actiedatum desc limit 7;"
        return Database.get_rows(sql)

    @staticmethod
    def read_ph_chart():
        sql= "Select waarde, unix_timestamp(actiedatum)*1000 from ProjectOneDB.Historiek where DeviceID = 3 order by Actiedatum desc limit 7;"
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

    @staticmethod
    def update_status(Geactiveerd, DeviceID):
        sql = "UPDATE ProjectOneDB.Device SET geactiveerd = %s WHERE deviceid = %s"
        params = [Geactiveerd, DeviceID]
        print(sql)
        return Database.execute_sql(sql, params)
