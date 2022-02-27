import sqlite3


# value should be python dict: {babyID: int, type: int, comment: string, dateTime: valid dateTime string} 
def bathroom_sql_ins(value, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()   
    babyID = value['babyId']        #split dictionary into individual variables
    bathroomType = value['type']
    bathroomComment = value['comment']
    bathroomDateTime = value['dateTime']
    bathroomDateTime = bathroomDateTime.replace("T", " ")

    #execute sql insert statement
    cur.execute("INSERT INTO bathroom (babyID, bathroomType, bathroomDateTime, bathroomComment) VALUES(?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.commit()
    conn.close()

def get_babies_old(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
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
    return baby_lst

#returns list of tuples from baby.db [(babyID, eventType, birthdate, firstName, lastName)]
def get_babies(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()   

    #execute sql insert statement
    cur.execute("SELECT * FROM babies")
    baby_lst = cur.fetchall()
    conn.close()
    return baby_lst

# function inserts new baby into database
# SELECT * FROM babies shows babies table as (1, u'Baby', u'2022-02-02', u'Jane', u'Test2')
def add_baby(baby_dict, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    
    initials=baby_dict['firstName'][0] + baby_dict['lastName'][0]
    cur.execute("INSERT INTO babies (birthDate, firstName, lastName, abbreviatedName, birthWeight, birthHeight) VALUES (?, ?, ?, ?, ?, ?);",(baby_dict['birthDate'], baby_dict['firstName'], baby_dict['lastName'], initials, baby_dict['birthWeight'], baby_dict['birthHeight']))
    
    conn.commit()
    conn.close()
    #return baby_dict # optional return
