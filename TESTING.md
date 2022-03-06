# Infant Tracking App
## Team members
Connor Tree, Julia Scott (dropped), Michael Lamelza, Steven Putt

## Setting Up the Infant Tracker
1. Create a folder for our project on your computer
2. Open a Git Bash console at that folder location. Verify it's correct at your Git Bash prompt
3. Git Clone repository to that folder
4. Open Visual Studio Code and select that project folder. Verify files load
5. Open terminal ( Ctrl + Shift + ` ) and create a virtual environment for Python --> "python -m venv .venv"
6. Install Python Extension - (Ctrl + Shift + p) Extensions: Install Extentions --> Python
7. Press Ctrl + Shift + P, and enter "Python: Select Iterpreter" - Select the new ".venv" virtual environment
8. Open terminal again ( Ctrl + Shift + ` ) and make sure the new ".venv" shows up in your prompt
9. Note: I included a "requirements.txt" document that lists the needed Python packages. Only Flask is listed at the moment.
10. Open terminal and install the Python packages from the "requirements.txt" doc --> "pip install -r requirements.txt"
11. Try it out. Select the "run_on_dev_server.py" file, then press the play button in the upper right corner of the screen. Terminal will show server launch
12. Open a browser and navigate to http://localhost:5555/

## Automated Tests
### Add Baby
Copy git repository
#### Description
Automates UI inputs to add a bathroom event in the sqlite server
#### Pre-conditions
Testing databases (test.db) setup via sqlite3
#### Test steps
1. Run unitTests.py
2. Advanced - Make changes to or add new query inputs in each test case in the test_add_baby function to test additional results
Expected result
1. test_add_baby tests should all pass with database entries matching mock UI inputs 
#### Actual result
Tests pass a expected
#### Status (Pass/Fail)
Pass
#### Notes
Future testing will be needed to test units based on a preference setting for lbs vs oz etc.
#### Post-conditions
All database entries in test.db are cleared after testing
<br><br>
### Add Bathroom event
Copy git repository
#### Description
Automates UI inputs to add a bathroom event in the sqlite server
#### Pre-conditions
Testing databases (test.db) setup via sqlite3
bathroomType and babies tables are setup with entries (automated with the test)
#### Test steps
1. Run unitTests.py
2. Advanced - Make changes to or add new query inputs in each test case in the test_bathroom_sql_ins function to test additional results
Expected result
1. test_bathroom_sql_ins tests should all pass with database entries matching mock UI inputs
2. Adding a bathroom event for a baby that does not exist should throw a sqlite error 
#### Actual result
Tests pass a expected
#### Status (Pass/Fail)
Pass
#### Post-conditions
All database entries in test.db are cleared after testing
<br><br>
### Add Sleep event
Copy git repository
#### Description
Automates UI inputs to add a bathroom event in the sqlite server
#### Pre-conditions
Testing databases (test.db) setup via sqlite3
sleepType and babies table are setup with entries (automated with the test)
#### Test steps
1. Run unitTests.py
2. Advanced - Make changes to or add new query inputs in each test case in the test_sleep_sql_ins function to test additional results
Expected result
1. test_sleep_sql_ins tests should all pass with database entries matching mock UI inputs 
#### Actual result
Tests fail, this menu is not setup yet
#### Status (Pass/Fail)
Fail
#### Post-conditions
All database entries in test.db are cleared after testing
<br><br>
### Add Feed event
Copy git repository
#### Description
Automates UI inputs to add a feed event in the sqlite server
#### Pre-conditions
Testing databases (test.db) setup via sqlite3
#### Test steps
1. Run unitTests.py
2. Advanced - Make changes to or add new query inputs in each test case in the test_feed_sql_ins function to test additional results
#### Expected result
1. test_feed_sql_ins tests should all pass with database entries matching mock UI inputs 
#### Actual result
Tests fail, menu not setup yet
#### Status (Pass/Fail)
Fail
#### Post-conditions
All database entries in test.db are cleared after testing
<br><br>
## User Acceptance Test Cases
### Navigate to Setup Page
1. From the main menu, select the Setup page
2. Follow the form inputs to add a baby
3. Navigate to the Bathroom menu to ensure your baby is avaialble to select

Step 1 Fails - Main menu is not yet implemented
Steps 2 and 3 pass

### Log a bathroom event
1. From the main menu, select the bathroom page
2. The last baby with an entry should be the default baby selected. Use the drop down to select a different baby if needed.
3. Select the type of bathroom event
4. The current time will be logged by default. Change the time and date if needed using the calendar icon
5. Select Done to log the event and return to the main menu. Select One More to log this event and continue with another event.
6. Check the tabular data page for recent entries
 
Step 1 fail, not implemented - workaround is to use the ribbon
Step 2 fail, not implemented
Step 3 - 5 pass
Step 6 fail, not implemented

### Log a sleep event
1. From the main menu, select the sleep page
2. The last baby with an entry should be the default baby selected. Use the drop down to select a different baby if needed.
3. Select the type of sleep event
4. The current time will be logged by default. Change the time and date if needed using the calendar icon
5. Select Done to log the event and return to the main menu. Select One More to log this event and continue with another event.
6. Check the tabular data page for recent entries
 
Step 1 fail, not implemented - workaround is to use the ribbon
Steps 2 - 6 fail, not implemented

### Log a feed event
1. From the main menu, select the feed/eat page
2. The last baby with an entry should be the default baby selected. Use the drop down to select a different baby if needed.
3. Select the type of feeding that is being done
4. Use the dials to adjust the duration or quantity depending on the event type
5. The current time will be logged by default. Change the time and date if needed using the calendar icon
5. Select Done to log the event and return to the main menu. Select One More to log this event and continue with another event.
7. Check the tabular data page for recent entries
 
Step 1 fail, not implemented - workaround is to use the ribbon
Steps 2 - 7 fail, not implemented
