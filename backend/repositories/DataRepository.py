from sqlite3 import paramstyle
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
    def read_status_lampen():
        sql = "SELECT * from lampen"
        return Database.get_rows(sql)

    @staticmethod
    def read_status_lamp_by_id(id):
        sql = "SELECT * from lampen WHERE id = %s"
        params = [id]
        return Database.get_one_row(sql, params)

    @staticmethod
    def update_status_lamp(id, status):
        sql = "UPDATE lampen SET status = %s WHERE id = %s"
        params = [status, id]
        return Database.execute_sql(sql, params)

    @staticmethod
    def update_status_alle_lampen(status):
        sql = "UPDATE lampen SET status = %s"
        params = [status]
        return Database.execute_sql(sql, params)
    
    @staticmethod
    def read_history():
        sql = "select * from Historiek;"
        return Database.get_rows(sql)
    
    @staticmethod
    def read_devices():
        sql = "select * from Device;"
        return Database.get_rows(sql)

    @staticmethod
    def Read_history_per_device(deviceID):
        sql = "Select * from Historiek where DeviceID = %s"
        params = [deviceID]
        return Database.get_rows(sql,params)

    @staticmethod
    def create_temp(actiedatum, waarde, commentaar, deviceid, actieid, statusid):
        sql = "insert into Historiek(actiedatum, waarde, commentaar, deviceid, actieid, statusid) values (%s,%s,%s,%s,%s,%s);"
        params = [actiedatum, waarde,commentaar,deviceid,actieid,statusid]
        return Database.execute_sql(sql,params)
