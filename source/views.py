"""
Routes and views for the flask application.
"""

from datetime import datetime
import json
import random
from xml.etree.ElementTree import tostring
from flask import jsonify, render_template, request
from . import app
from source.sql_functions import *


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
    "time": None,
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

@app.route('/setup',methods = ['POST', 'GET'])
def setup():
    """Renders the setup page."""
    if request.method == 'POST':
        result = request.data
        baby_and_prefs = json.loads(result) # creates python dictionary
        if 'preferences' in baby_and_prefs.keys():
            prefs = baby_and_prefs['preferences']
            print("Preferences: " + str(prefs))
            # update DB with preferences
        elif 'baby' in baby_and_prefs.keys():
            baby = baby_and_prefs['baby']
            print("Baby: " + str(baby))
            # update DB with preferences
        return  jsonify(""), 200
    else:
        return render_template(
            'setup.html',
            # Get preferences
        )

@app.route('/bathroom',methods = ['POST', 'GET'])
def bathroom():
    """Renders the bathroom page."""
    if request.method == 'POST':
        result = request.data
        bathroom_event = json.loads(result) # creates python dictionary
        bathroom_sql_ins(bathroom_event['bathroomEvent'])             #insert into database
        return  jsonify(""), 200
    else:
        return render_template(
            'bathroom.html',
            babies = get_babies()
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

@app.route('/eat')
def eat():
    """Renders the eat page."""
    return render_template(
        'eat.html',
        title='Eat',
        year=datetime.now().year,
        message='Eat data from backend here..'
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

@app.route('/display')
def display(db_path = "./sqlite3/baby.db"):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute("SELECT babies.firstName || ' ' || babies.lastName as 'Baby', bathroom.bathroomDateTime as 'Time', bathroomType.bathroomTypeName as 'Type' FROM bathroom LEFT JOIN babies ON bathroom.babyID = babies.babyID LEFT JOIN bathroomType ON bathroom.bathroomType = bathroomType.bathroomTypeID ORDER BY bathroomDateTime")

    rows = cur.fetchall()
    strlst = []
    for row in rows:
        str = ''
        for item in row:
            str = str+' '+item
        strlst.append(str)
    str = ''
    for row in strlst:
        str = str + ' ' + row

    conn.close()
    return str

