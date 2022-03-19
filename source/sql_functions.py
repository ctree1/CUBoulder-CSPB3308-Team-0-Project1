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

def add_prefs(pref_dict, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    
    cur.execute("PRAGMA foreign_keys = ON") # enforce foreign key constraints
    cur.execute("INSERT INTO preferences (liquidUnits, weightUnits, heightUnits) VALUES (?, ?, ?);",(pref_dict['liquidUnits'],pref_dict['weightUnits'], pref_dict['heightUnits']))
    
    conn.commit()
    conn.close()
    #return error/success code


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
        LIMIT 5;")
    rows = cur.fetchall()
    
    bathroom_recent_lst = []
    for row in rows:
        print(row)
        row_array = [row[0], row[1], row[2], row[3], row[4]]
        bathroom_recent_lst.append(row_array)

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

# value should be python dict: {babyID: int, type: int, comment: string, dateTime: valid dateTime string} 
def sleep_sql_ins(value, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    babyID = value['babyId']        #split dictionary into individual variables
    sleepType = value['type']
    sleepComment = value['comment']
    sleepDateTime = value['dateTime']

    #execute sql insert statement
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("INSERT INTO sleep (babyID, sleepType, sleepDateTime, sleepComment) VALUES(?, ?, ?, ?);", (babyID, sleepType, sleepDateTime, sleepComment))
    conn.commit()
    conn.close()
    # return error/success code

def sleep_recent_events(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    cur.execute("SELECT\
        sleep.sleepEventID,\
        babies.firstName || ' ' || babies.lastName as 'Baby',\
        sleep.sleepDateTime as 'Time',\
        sleepType.sleepTypeName as 'Type',\
        sleep.sleepComment as 'Comment',\
        round(24 * (JULIANDAY(sleep.sleepDateTime) - LAG(JULIANDAY(sleep.sleepDateTime)) OVER (ORDER BY sleep.sleepDateTime)),1) AS 'Previous Duration, hrs'\
        FROM sleep\
        LEFT JOIN babies ON sleep.babyID = babies.babyID\
        LEFT JOIN sleepType ON sleep.sleepType = sleepType.sleepTypeID\
        ORDER BY sleep.sleepDateTime DESC\
        LIMIT 5;")
    rows = cur.fetchall()
    
    sleep_recent_lst = []
    for row in rows:
        print(row)
        row_array = (row[0], row[1], row[2], row[3], row[4], row[5])
        sleep_recent_lst.append(row_array)

    conn.commit()
    conn.close()
    return sleep_recent_lst

#feed function, added for testing
def feed_sql_ins(value, db_path = "./sqlite3/baby.db"):
    pass

def delete_rows(table, eventID, db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    
    cur.execute("DELETE FROM " + str(table) + "\
        WHERE " + str(table) + "EventID = " + str(eventID) + ";")
        #Example DELETE FROM sleep WHERE sleepEventID = 10;
        #This should be interchangeable between all menus assuming the naming convention works
    conn.commit()
    conn.close()

def delete_preferences(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()
    
    cur.execute("DELETE * FROM preferences;")

    conn.commit()
    conn.close()

def feed_recent_events(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)       #connect to database
    cur = conn.cursor()

    cur.execute("SELECT\
        feed.feedEventID,\
        babies.firstName || ' ' || babies.lastName as 'Baby',\
        feed.feedDateTime as 'Time',\
        feed.leftBreastDur as 'Left Breast, min',\
        feed.rightBreastDur as 'Right Breast, min',\
        feed.totalBreastDur as 'Total Breast, min',\
        feed.leftPumpQty as 'Left Pump Qty',\
        feed.rightPumpQty as 'Right Pump Qty',\
        feed.totalPumpQty as 'Total Pump Qty',\
        feed.bottleBreastQty as 'Bottle Breast Qty',\
        feed.bottleBreastQty as 'Bottle Formulat Qty',\
        feed.totalBottleQty as 'Total Bottle Qty',\
        feed.feedComment as 'Comment' FROM feed\
        LEFT JOIN babies ON feed.babyID = babies.babyID\
        ORDER BY feedDateTime DESC\
        LIMIT 5;")
    rows = cur.fetchall()

    feed_recent_lst = []
    for row in rows:
        print(row)
        row_array = (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13])
        feed_recent_lst.append(row_array)

    conn.commit()
    conn.close()
    return feed_recent_lst

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
#sleep_recent_events()
#delete_rows("sleep", 11)