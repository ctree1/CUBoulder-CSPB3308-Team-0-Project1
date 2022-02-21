"""
Routes and views for the flask application.
"""

from asyncio.windows_events import NULL
from datetime import datetime
import json
import random
from xml.etree.ElementTree import tostring
from flask import jsonify, render_template, request
from . import app
from source.ct_test import *


# Team - This is acting like a simple DB so the methods below can work with data.
# In the future, these will go away and the methods will interact with the DB.
all_babies_sim_db = [(1, "Jane"), (37556, "Giovanna"), (54778, "Bob")]
bathroom_events_sim_db = {}

# Team - Items below to be maintained as global vars, if needed.
# This can reside here or elswhere, if it gets too big.
# Globals are generaly bad, so if we want to get fancy we can create classes, etc.
default_bathroom_event = {
    "babyId": all_babies_sim_db[0][0],
    "bathroomType": "", # need to create enum
    "time": NULL,
    "comment" : "A comment about the event"
}

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/setup')
def setup():
    """Renders the setup page."""
    return render_template(
        'setup.html',
        title='Setup',
        year=datetime.now().year,
        message='Setup data from backend here..'
    )

@app.route('/eat')
def eat():
    """Renders the eat page."""
    return render_template(
        'eat.html',
        title='Eat',
        year=datetime.now().year,
        message='Eat data from backend here..'
    )

@app.route('/sleep')
def sleep():
    """Renders the sleep page."""
    return render_template(
        'sleep.html',
        title='Sleep',
        year=datetime.now().year,
        message='Sleep data from backend here..'
    )

@app.route('/bathroom',methods = ['POST', 'GET'])
def bathroom():
    """Renders the bathroom page."""
    if request.method == 'POST':
        result = request.data
        bathroom_event = json.loads(result)
        print(bathroom_event['bathroomEvent'])
        json_to_sql(bathroom_event['bathroomEvent'])             #insert into database
        return  jsonify(""), 200
    else:
        now = datetime.now().time().strftime('%I:%M %p')
        return render_template(
            'bathroom.html',
            babies = all_babies_sim_db,
        )

@app.route('/measures')
def measures():
    """Renders the measures page."""
    return render_template(
        'measures.html',
        title='Measures',
        year=datetime.now().year,
        message='Measures data from backend here..'
    )

@app.route('/tabular-data')
def tabular_data():
    """Renders the tabular-data page."""
    return render_template(
        'tabular-data.html',
        title='Tabular Data',
        year=datetime.now().year,
        message='Tabular data from backend here..'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='About data from backend here..'
    )
