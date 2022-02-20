import sqlite3
import os

def json_to_sql(value):
    os.chdir("sqlite3") #If someone can figure out the file path to baby.db, ../sqlite3/baby.db does not work

    conn = sqlite3.connect("baby.db")
    c = conn.cursor()
    babyID = value['babyId']
    bathroomType = value['type']
    bathroomComment = value['comment']
    bathroomDateTime = value['dateTime']

    c.execute("INSERT INTO bathroom (babyID, bathroomType, bathroomDateTime, bathroomComment) VALUES(?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.close()
    os.chdir("..")

