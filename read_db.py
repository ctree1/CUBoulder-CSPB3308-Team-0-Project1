import sqlite3
import os

os.chdir("sqlite3") #If someone can figure out the file path to baby.db, ../sqlite3/baby.db does not work

conn = sqlite3.connect("baby.db")
cur = conn.cursor()
   
cur = conn.cursor()
cur.execute("SELECT * FROM bathroom")

rows = cur.fetchall()

for row in rows:
    print(row)

conn.close()
os.chdir("..")