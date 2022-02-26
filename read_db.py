import sqlite3
import os

def read_db(db_path = "./sqlite3/baby.db", query = "SELECT * FROM bathroom"):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur = conn.cursor()
    cur.execute(query)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return rows # return rows if you want them

read_db()