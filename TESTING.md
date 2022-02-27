# Infant Tracking App
## Team members
Connor Tree, Julia Scott, Michael Lamelza, Steven Putt

## Automated Tests - draft
Explain how to run automated tests
List of automated tests:
- Baby creation - good data
- Baby creation - bad data
- Bathroom Event - good data for event
- Bathroom Event - bad data for event

## User Acceptance Test Cases

### Setting Up the Infant Tracker
Easy set up instructions for running local server infant tracker. Use README.md as draft

### Test 1 - draft
The user wants to use our infant tracker to add a baby to be tracked. They first navigate to the Setup page by clicking on "Setup" from the black menu bar of the infant tracker.  The url should now be http://localhost:5555/setup

Two text fields
Birthdate calendar selector like on bathroom page but without the time

_______
_______
Insert what the setup steps/entry boxes look like.


### Test 2 - draft
The user wants to log a bathroom item for their baby.  They navigate to Bathroom menu by clicking on "Bathroom" in the black navigation menu.  The url displayed should now be http://localhost:5555/bathroom 

The user sees a number of different entry fields, each with a white title inside a grey divider.  Under "Select baby area" they must choose which baby they need to log a bathroom event for.  The most recent baby used is displayed first in the dropdown list under "Select".  
After picking their baby, they can choose what type of diaper their baby had under the section "Bathroom Type area".  The buttons display 3 options: "Liquid", "Solid", and "Both".  Only one button may be selected.
The "Time area" defaults to the current time, but by clicking on any of the fields, the user may select a different month, day, or year from a drop down calendar.  The time in hours, minutes, and seconds may be changed when selected by entering the new two digit value in the user's keyboard.
Before logging, the user may enter a comment if they wish but it is not required.
At the bottom they have the option of recording their log to the database by either clicking "Done" or "One More".
put what happens next

### Test 3 - draft
The user wants to use the infant tracker to log their baby waking up or falling asleep.