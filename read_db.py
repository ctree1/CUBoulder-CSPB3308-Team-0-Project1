import sqlite3


def read_db(db_path = "./sqlite3/baby.db", query = "SELECT * FROM babies"):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur = conn.cursor()
    cur.execute(query)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.commit()
    conn.close()
    return rows # return rows if you want them

# one of many queries which could be inserted into read_db()
query = '''SELECT * FROM preferences'''

read_db(query=query)