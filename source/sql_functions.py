import sqlite3


# value should be python dict: {babyID: int, type: int, comment: string, dateTime: valid dateTime string} 
def bathroom_sql_ins(value, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    babyID = value['babyId']        #split dictionary into individual variables
    bathroomType = value['type']
    bathroomComment = value['comment']
    bathroomDateTime = value['dateTime']

    #execute sql insert statement
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("INSERT INTO bathroom (babyID, bathroomType, bathroomDateTime, bathroomComment) VALUES(?, ?, ?, ?);", (babyID, bathroomType, bathroomDateTime, bathroomComment))
    conn.commit()
    conn.close()
    # return error/success code

def bathroom_recent_events(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    cur.execute("SELECT\
        bathroom.bathroomEventID,\
        babies.firstName || ' ' || babies.lastName as 'Baby',\
        bathroom.bathroomDateTime as 'Time',\
        bathroomType.bathroomTypeName as 'Type',\
        bathroom.bathroomComment as 'Comment' FROM bathroom\
        LEFT JOIN babies ON bathroom.babyID = babies.babyID\
        LEFT JOIN bathroomType ON bathroom.bathroomType = bathroomType.bathroomTypeID\
        ORDER BY bathroomDateTime DESC\
        LIMIT 3;")
    rows = cur.fetchall()
    
    bathroom_recent_lst = []
    for row in rows:
        print(row)
        tuple = (row[0], row[1], row[2], row[3])
        bathroom_recent_lst.append(tuple)

    conn.commit()
    conn.close()
    return bathroom_recent_lst

def get_babies_old(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()   

    # query database for all babies stored in db
    cur.execute("PRAGMA foreign_keys = ON")
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

    # query database for all babies stored in db
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("SELECT * FROM babies")
    baby_lst = cur.fetchall()
    conn.close()
    return baby_lst

#apparently you can't have a variable for select statements so we'll have to build a separate function
#for each table to get their assocaited last baby.  
#returns an int of the last babyID e.g 1
def get_last_baby_bathroom(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()   

    # query database for last babies stored in bathroom
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("SELECT babyID FROM bathroom ORDER BY bathroomDateTime DESC LIMIT 1;")
    baby_lst = cur.fetchone()
    babyid = baby_lst[0] #take first tuple
    conn.close()
    return babyid

def get_last_baby_sleep(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()   

    # query database for last babies stored in sleep
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("SELECT babyID FROM sleep ORDER BY sleepDateTime DESC LIMIT 1;")
    baby_lst = cur.fetchone()
    babyid = baby_lst[0] #take first tuple
    conn.close()
    return babyid
    
# function inserts new baby into database
# SELECT * FROM babies shows babies table as (1, u'Baby', u'2022-02-02', u'Jane', u'Test2')
def add_baby(baby_dict, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    
    #initials=baby_dict['firstName'][0] + baby_dict['lastName'][0]
    cur.execute("PRAGMA foreign_keys = ON") # enforce foreign key constraints
    cur.execute("INSERT INTO babies (birthDate, firstName, lastName, abbreviatedName, birthWeight, birthHeight) VALUES (?, ?, ?, ?, ?, ?);",(baby_dict['birthDate'], baby_dict['firstName'], baby_dict['lastName'], baby_dict['abbreviation'], baby_dict['birthWeight'], baby_dict['birthHeight']))
    
    conn.commit()
    conn.close()
    #return error/success code

#sleep function, added for testing
def sleep_sql_ins(value, db_path = "./sqlite3/baby.db"):
    pass

#feed function, added for testing
def feed_sql_ins(value, db_path = "./sqlite3/baby.db"):
    pass


class Baby:
    def __init__(self, rows):
        self.babyID = []
        self.eventType = []
        self.birthDate = []
        self.firstName = []
        self.lastName = []
        self.abbreviatedName = []
        self.birthWeight = []
        self.birthHeight = []
        for row in rows:
            self.babyID.append(row[0])
            self.eventType.append(row[1])
            self.birthDate.append(row[2])
            self.firstName.append(row[3])
            self.lastName.append(row[4])
            self.abbreviatedName.append(row[5])
            self.birthWeight.append(row[6])
            self.birthHeight.append(row[7])

class Bathroom:
    def __init__(self, rows):
        self.bathroomEventID = []
        self.eventType = []
        self.babyID = []
        self.bathroomType = []
        self.bathroomDateTime = []
        self.bathroomComment = []
        for row in rows:
            self.bathroomEventID.append(row[0])
            self.eventType.append(row[1])
            self.babyID.append(row[2])
            self.bathroomType.append(row[3])
            self.bathroomDateTime.append(row[4])
            self.bathroomComment.append(row[5])
        
class Sleep:
    def __init__(self, rows):
        self.sleepEventID = []
        self.eventType = []
        self.babyID = []
        self.sleepType = []
        self.sleepDateTime = []
        self.sleepComment = []
        for row in rows:
            self.sleepEventID.append(row[0])
            self.eventType.append(row[1])
            self.babyID.append(row[2])
            self.sleepType.append(row[3])
            self.sleepDateTime.append(row[4])
            self.sleepComment.append(row[5])
    
class Feed:
    def __init__(self, rows):
        feedEventID = []
        eventType = []
        babyID = []
        leftBreastDur = []
        rigthBreastDur = []
        totalBreastDur = []
        leftPumpQty = []
        rightPumpQty = []
        totalPumpQty = []
        bottleBreastQty = []
        bottleFormulaQty = []
        totalBottleQty = []
        feedDateTime = []
        feedComment = []
        for row in rows:
            feedEventID.append(row[0])
            eventType.append(row[1])
            babyID.append(row[2])
            leftBreastDur.append(row[3])
            rigthBreastDur.append(row[4])
            totalBreastDur.append(row[5])
            leftPumpQty.append(row[6])
            rightPumpQty.append(row[7])
            totalPumpQty.append(row[8])
            bottleBreastQty.append(row[9])
            bottleFormulaQty.append(row[10])
            totalBottleQty.append(row[11])
            feedDateTime.append(row[12])
            feedComment.append(row[13])

#bathroom_recent_events()