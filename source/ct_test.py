import sqlite3
import os

def json_to_sql(value):
    os.chdir("sqlite3") #If someone can figure out the file path to baby.db, ../sqlite3/baby.db does not work

    conn = sqlite3.connect("baby.db")
    c = conn.cursor()
    babyID = value['babyId']
    bathroomType = value['bathroomType']
    bathroomComment = value['comment']
    bathroomDateTime = value['time']

    c.execute("INSERT INTO bathroom VALUES(?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.close()
    os.chdir("..")