import sqlite3
import os


def bathroom_sql_ins(value):
    os.chdir("sqlite3") #change working directory to that of database

    conn = sqlite3.connect("baby.db")       #connect to database
    cur = conn.cursor()   
    babyID = value['babyId']        #split tuple into individual variables
    bathroomType = value['type']
    bathroomComment = value['comment']
    bathroomDateTime = value['dateTime']
    bathroomDateTime = bathroomDateTime.replace("T", " ")

    #execute sql insert statement
    cur.execute("INSERT INTO bathroom (babyID, bathroomType, bathroomDateTime, bathroomComment) VALUES(?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.commit()
    conn.close()
    os.chdir("..")


