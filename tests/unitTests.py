#!/bin/python

import sqlite3
import unittest

from source import sql_functions


class TestSQLins(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.db_connect = sqlite3.connect("./tests/test.db")
        cls.db_cursor = cls.db_connect.cursor()
        # variable to keep track of number of entries made to db
        cls.num_entries = 0
        return

    @classmethod
    def tearDownClass(cls):
        # reset db to original
        # delete added rows
        cls.db_connect.close()
        return

    '''
         babyID = value['babyId']        #split tuple into individual variables
        bathroomType = value['type']
        bathroomComment = value['comment']
        bathroomDateTime = value['dateTime']
        bathroomDateTime = bathroomDateTime.replace("T", " ")
    '''

    def make_baby(self, babyID = "131313", first_name = "Mathias", last_name = "Bee", ):
        # make a baby and return
        return babyID

    # Bathroom events can be specified as good or bad and also can be custom
    # This constructs a simple python dictionary for sending to bathroom_sql_ins()
    def make_bath_event(self, event_type = "Good", babyID = "34980", type = 1, dateTime = "", comment = "Very little") :
        if event_type == "Bad" :
            babyID = 'Willy Wonka'
            type = -9999
            dateTime = 'never'
            comment = 400
        elif event_type == "Good" :
            babyID = "34980"
            type = 1
            dateTime = '2022-02-21 13:54:24'
            comment = "Very little"

        event = {'babyID': babyID, 
                'type': type, 
                'dateTime': dateTime, 
                'comment': comment
                }
        return event

    # tests add_baby() function in sql_functions.py
    def test_add_baby(self, baby_dict) :
        return None


    def test_bathroom_sql_ins(self):
        # Good data insert test
        good_event_dict = self.make_bath_event(event_type = "Good")
        sql_functions.bathroom_sql_ins(good_event_dict)
        # check database
        # ASSERT return yields exact entry

        # Bad data insert test
        bad_event_dict = self.make_bath_event(event_type = "Bad")
        sql_functions.bathroom_sql_ins(bad_event_dict, "./tests/test.db")
        # check database
        # ASSERT return yields no entry
        # test to see what database holds using queries

        
        return


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