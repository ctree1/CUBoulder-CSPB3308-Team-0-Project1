import json
import sqlite3

def json_to_sql(value):
    conn = sqlite3.connect("baby.db")
    c = conn.cursor()
    #bathroomEventID, babyID, bathroomType, bathroomDateTime, bathroomComment = value
    #c.execute("INSERT INTO bathroom VALUES(?, ?, ?, ?, ?);", (bathroomEventID, babyID, bathroomType, bathroomDateTime, bathroomComment))
    print(value)
    conn.close()
