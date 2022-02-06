# Infant Tracking App
## Team members
Connor Tree, Julia Scott, Michael Lamelza, Steven Putt  

## Vision statement
To create a web-based infant tracking application which allows parents to easily and quickly log daily events such as sleep patterns and eating, enabling them to provide better care by tracking those patterns over time.

## Motivation
Multiple parents in the group, keeping tabs on baby trends is important but tedious to keep up with. The hospital gives you a sheet of paper, spreadsheets are better but not easy to manage when your hands are full. Can't there be an easier way?...

## Risks To Project Completion
1. Working with minimal UI real estate (e.g a watch design)
2. Many languages and frameworks, team has none or some experience in the various areas, i.e. Python, Javascript, HTML5, CSS, Hosting site
3. Multiple team members working on different sections of the code/project

## Mitigation Strategy
1. UI mockups to prototype options for small screens
2. Meetings to discuss skillsets, division of labor, etc.
3. Version control via GIT 

## Development Method
Scrum (weekly meetings for planning and progress) and Kanban (ADO boards to plan user stories, assign work evenly, and stay on track). 

## Project Tracking Software
Azure DevOps (ADO)

## Development Environment - Initial Configuration
1. Create a folder for our project on your computer
2. Open a Git Bash console at that folder location. Verify it's correct at your Git Bash prompt
3. Git Clone repository to that folder
4. Open Visual Studio Code and select that project folder. Verify files load
5. Open terminal ( Ctrl + Shift + ` ) and create a virtual environment for Python --> "python -m venv .venv"
6. Press Ctrl + Shift + P, and enter "Python: Select Iterpreter" - Select the new ".venv" virtual environment
7. Open terminal again ( Ctrl + Shift + ` ) and make sure the new ".venv" shows up in your prompt
8. Note: I included a "requirements.txt" document that lists the needed Python packages. Only Flask is listed at the moment.
9. Open terminal and install the Python packages from the "requirements.txt" doc --> "pip install -r requirements.txt"
10. Try it out. Select the "runserver.py" file, then press the play button in the upper right corner of the screen. Terminal will show server launch
11. Open a browser and navigate to http://localhost:5555/
12. Did it work?
13. Let Michael know if you have issues
