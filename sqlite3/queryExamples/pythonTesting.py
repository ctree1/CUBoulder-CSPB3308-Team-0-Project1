import sqlite3
import os

#os.chdir("sqlite3") #If someone can figure out the file path to baby.db, ../sqlite3/baby.db does not work

conn = sqlite3.connect("./sqlite3/baby.db")
cur = conn.cursor()
   
cur = conn.cursor()
cur.execute("PRAGMA foreign_keys = ON")
cur.execute("INSERT INTO bathroom (babyID, bathroomType, bathroomDateTime, bathroomComment) VALUES (10, 2, '2022-02-02 22:22', 'It is Everywhere!!!');")

#rows = cur.fetchall()

#for row in rows:
#    print(row)

conn.close()
#os.chdir("..")