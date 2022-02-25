import sqlite3
import os


# value should be json dict: {babyID: int, type: int, comment: string, dateTime: valid dateTime string} 
def bathroom_sql_ins(value, db_path = "./sqlite3/baby.db"):
    #os.chdir("sqlite3") #change working directory to that of database

    conn = sqlite3.connect(db_path)       #connect to database
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
    #os.chdir("..")

def get_babies():
    os.chdir("sqlite3") #change working directory to that of database

    conn = sqlite3.connect("baby.db")       #connect to database
    cur = conn.cursor()   

    #execute sql insert statement
    cur.execute("SELECT * FROM babies")
    rows = cur.fetchall()
    
    baby_lst = []
    for row in rows:
        print(row)
        tuple = (row[0], row[3])
        baby_lst.append(tuple)

    conn.commit()
    conn.close()
    os.chdir("..")
    return baby_lst

