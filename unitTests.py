# command line executable

import sqlite3
import unittest
import source.sql_functions as sf

# read sql file in stead of hard coding -
def read_sql(queryName):
    with open(queryName)as q:
        query_text = q.read()
    return query_text

    #sql_file = open(queryName)
    #return sql_file.read()

class TestSQLins(unittest.TestCase):

#conn = sqlite3.connect(db_path)
#cur = conn.cursor()

    @classmethod
    def setUpClass(cls):
        try: 
            cls.db_connect = sqlite3.connect("./tests/test.db")
            c = cls.db_connect.cursor()
            # add any initial values needed to table 
            c.executescript(read_sql("./sqlite3/queryExamples/CreateBabiesTable.sql"))
            c.executescript(read_sql("./sqlite3/queryExamples/CreateBathroomTypeTable.sql"))
            c.executescript(read_sql("./sqlite3/queryExamples/CreateBathroomTable.sql"))
            c.executescript(read_sql("./sqlite3/queryExamples/CreateSleepTypeTable.sql"))
            c.executescript(read_sql("./sqlite3/queryExamples/CreateSleepTable.sql"))
            c.executescript(read_sql("./sqlite3/queryExamples/CreatePreferencesTable.sql"))
            c.execute('INSERT INTO bathroomType (bathroomTypeName) VALUES ("Liquid");')
            c.execute('INSERT INTO bathroomType (bathroomTypeName) VALUES ("Solid");')
            c.execute('INSERT INTO bathroomType (bathroomTypeName) VALUES ("Both");')
            c.execute('INSERT INTO sleepType (sleepTypeName) VALUES ("Awake");')
            c.execute('INSERT INTO sleepType (sleepTypeName) VALUES ("Asleep");')
            cls.db_connect.commit()
            c.close()
        except sqlite3.Error as error:
            print("Failed to initialize test cases.  Database issued this error when fetching tables: ", error)


    @classmethod
    def tearDownClass(cls):
        cls.db_connect = sqlite3.connect("./tests/test.db")
        c = cls.db_connect.cursor()
        # delete all tables in database
        c.execute('DROP TABLE babies;')
        c.execute('DROP TABLE bathroom;')
        c.execute('DROP TABLE bathroomType;')
        c.execute('DROP TABLE sleep;')
        c.execute('DROP TABLE sleepType;')
        c.execute('DROP TABLE preferences;')
        cls.db_connect.commit()
        c.close()

    # tests add_baby() function in sql_functions.py
    def test_add_baby(self, db_path = './tests/test.db'):
        sf.add_baby({'birthDate': '2022-01-01', 'firstName':'Jane', 'lastName':'Baby', 'abbreviation':'JB', 'birthWeight':3600 , 'birthHeight':45},db_path)
        sf.add_baby({'birthDate': '2022-02-02', 'firstName':'Jon', 'lastName':'Bae', 'abbreviation':'JB', 'birthWeight':3700 , 'birthHeight':50},db_path)

        #check db
        conn = sqlite3.connect('./tests/test.db')
        c = conn.cursor()
        baby = sf.Baby(c.execute('SELECT * FROM babies;'))
        self.assertEqual(baby.firstName[0], 'Jane', 'Error - firstName incorrect')
        self.assertEqual(baby.birthDate[1], '2022-02-02', 'Error - birthDate incorrect')
        self.assertEqual(baby.babyID[1], 2, 'Error - babyID incorrect')
        self.assertEqual(baby.birthDate[0], '2022-01-01', 'Error - birthDate incorrect')
        c.close()


    def test_bathroom_sql_ins(self, db_path = './tests/test.db'):
        #setup bathroom event types table
        conn = sqlite3.connect('./tests/test.db')
        c = conn.cursor()

        #add bathroom events
        sf.bathroom_sql_ins({'babyId': 1, 'type': 1, 'dateTime':'2022-01-01T01:01', 'comment':'eww'}, db_path)
        sf.bathroom_sql_ins({'babyId': 2, 'type': 2, 'dateTime':'2022-01-01T11:01', 'comment': None}, db_path)
        sf.bathroom_sql_ins({'babyId': 2, 'type': 3, 'dateTime':'2022-02-02T02:22', 'comment':'so much'}, db_path)
        
        bathroom = sf.Bathroom(c.execute('SELECT * FROM bathroom;'))
        self.assertEqual(bathroom.eventType[0], 'Bathroom', 'Error - eventType incorrect')
        self.assertEqual(bathroom.bathroomType[0], 1, 'Error - bathroomType incorrect')
        self.assertEqual(bathroom.bathroomDateTime[1], '2022-01-01T11:01', 'Error - bathroomDateTime incorrect')
        self.assertEqual(bathroom.bathroomComment[2], 'so much', 'Error - bathroomComment incorrect')
        #self.assertRaises(sqlite3.IntegrityError, sf.bathroom_sql_ins({'babyId': 999, 'type': 3, 'dateTime':'2022-02-02T10:22', 'comment': 'text'}, db_path))
        #self.assertRaises(sqlite3.IntegrityError, sf.bathroom_sql_ins({'babyId': 1, 'type': 9, 'dateTime':'2022-02-02T03:33', 'comment': 'a comment'}, db_path))
        c.close()

    def test_sleep_sql_ins(self, db_path = './tests/test.db'):
        #setup bathroom event types table
        conn = sqlite3.connect('./tests/test.db')
        c = conn.cursor()

        #add sleep events
        sf.sleep_sql_ins({'babyId': 1, 'type': 1, 'dateTime':'2022-01-01T11:11', 'comment':'crying'}, db_path)
        sf.sleep_sql_ins({'babyId': 2, 'type': 2, 'dateTime':'2022-01-01T12:11', 'comment': 'more crying'}, db_path)
        
        sleep = sf.Sleep(c.execute('SELECT * FROM sleep;'))
        self.assertEqual(sleep.eventType[0], 'Sleep', 'Error - eventType incorrect')
        self.assertEqual(sleep.sleepType[0], 1, 'Error - sleepType incorrect')
        self.assertEqual(sleep.sleepDateTime[1], '2022-01-01T12:11', 'Error - sleepDateTime incorrect')
        self.assertEqual(sleep.sleepComment[2], 'so much', 'Error - sleepComment incorrect')
        c.close()


# Main: Run Test Cases
if __name__ == '__main__':
    unittest.main()

# Create baby
# Make name a number, boolean, list of no-no's and cycle through with tests
# We should look for failure behaviour?  Should either do nothing and not write to DB
# but more likely should throw an error - what type of error? lookup
# Can start by checking if it wrote bad values to db and if so fail test
# Can make sure it writes good values

# Create Baby test
# Did it write baby to db?


    '''
        def bathroom_sql_ins(value):
            os.chdir("sqlite3") #change working directory to that of database

            conn = sqlite3.connect("baby.db")       #connect to database
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
            os.chdir("..")
    '''