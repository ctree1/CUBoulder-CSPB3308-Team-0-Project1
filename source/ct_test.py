import sqlite3

def json_to_sql(value):
    conn = sqlite3.connect("baby.db")
    c = conn.cursor()
    babyID = value['babyId']
    bathroomType = value['bathroomType']
    bathroomComment = value['comment']
    bathroomDateTime = value['time']

    c.execute("INSERT INTO bathroom VALUES(?, ?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.close()
