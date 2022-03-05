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
            #c.commit()
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
        #c.commit()
        c.close()

    '''
         babyID = value['babyId']        #split tuple into individual variables
        bathroomType = value['type']
        bathroomComment = value['comment']
        bathroomDateTime = value['dateTime']
        bathroomDateTime = bathroomDateTime.replace("T", " ")
    '''


    # need to do read_db to see exact form for items
    #def make_baby(self, first_name = "Mathias", last_name = "Bee", birthDate = "2022-01-21", abbreviatedName = 'MB', birthWeight = '8', birthHeight = '22'):
        
        # make a baby and return
        # insert baby into db
        # return babyID

    # Bathroom events can be specified as good or bad and also can be custom
    # This constructs a simple python dictionary for sending to bathroom_sql_ins()
    def make_bath_event(self, event_type = "Good") :
        if event_type == "Bad" :
            babyID = 400
            type = -9999
            dateTime = 'never'
            comment = 400
        elif event_type == "Good" :
            babyID = 1
            type = 1
            dateTime = "2022-02-21T13:54:24"
            comment = "Very little"

        event = {'babyID': babyID,
                'type': type, 
                'dateTime': dateTime, 
                'comment': comment
                }
        return event

    # tests add_baby() function in sql_functions.py
    def test_add_baby(self, db_path = './tests/test.db'):
        exit_code = sf.add_baby({'birthDate': '2022-01-01', 'firstName':'Jane', 'lastName':'Baby', 'abbreviatedName':'JB', 'birthWeight':3600 , 'birthHeight':45})
        self.assertNotEqual(exit_code, -1) #expecting an exit code of -1 for db write issues

        #check db
        conn = sqlite3.connect('./tests/test.db')
        c = conn.cursor()
        baby = sf.Baby(c.execute('SELECT * FROM babies;'))
        print('baby check', baby.firstName)
        self.assertEqual(baby.firstName[0], 'Jane')
        c.close()


    def test_bathroom_sql_ins(self):
        # Good data insert test
        good_event_dict = self.make_bath_event(event_type = "Good")
        exit_code = sf.bathroom_sql_ins(good_event_dict, db_path = './tests/test.db')
        self.assertNotEqual(exit_code, -1) # success exit code
        # check database
        # assert return yields exact entry

        # Bad data insert test
        bad_event_dict = self.make_bath_event(event_type = "Bad")
        exit_code = sf.bathroom_sql_ins(bad_event_dict, db_path = './tests/test.db')
        # check database
        # ASSERT return yields no entry
        # ASSERT exit code is returned as -1
        # test to see what database holds using queries
        pass



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