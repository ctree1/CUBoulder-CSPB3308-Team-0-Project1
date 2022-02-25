import sqlite3
import os

#os.chdir("tests") #If someone can figure out the file path to baby.db, ../sqlite3/baby.db does not work

conn = sqlite3.connect("./tests/test.db")
cur = conn.cursor()
   
cur = conn.cursor()
cur.execute("SELECT eventType, birthDate, firstName, lastName FROM babies;")

rows = cur.fetchall()

for row in rows:
    print(row)

conn.close()
#os.chdir("..")