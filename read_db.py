import sqlite3
import os

def read_db(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect("baby.db")
    cur = conn.cursor()
    
    cur = conn.cursor()
    cur.execute("SELECT * FROM bathroom")

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return rows

read_db()