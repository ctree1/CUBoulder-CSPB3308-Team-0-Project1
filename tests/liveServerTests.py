#!/bin/python
import urllib
from urllib.request import urlopen
from flask import Flask
from flask_testing import LiveServerTestCase

class MyTest(LiveServerTestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        # Default timeout is 5 seconds
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app

    def test_server_is_up_and_running(self):
        test_url = self.get_server_url() # get the url from the test server launch
        response = urllib.urlopen(test_url)
        self.assertEqual(response.code, 200) # 200 is a positive, server is running