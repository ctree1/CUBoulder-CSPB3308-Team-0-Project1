#!/bin/python

import sqlite3
import unittest
import json

import source
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
    def make_bad_bath_event(self, babyID = 'Xena', type = 5000, dateTime = 'never', comment = 400) :
        bad_event = {'babyID': babyID, 
                    'type': type, 
                    'dateTime': dateTime, 
                    'comment': comment
                    }
        return bad_event


    def test_bathroom_sql_ins(self):
        bad_event_json = self.make_bad_bath_event()
        sql_functions.bathroom_sql_ins(bad_event_json, "./tests/test.db")
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