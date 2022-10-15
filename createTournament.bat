@echo off 

set /p dirName= "Enter the folder name of the tournament (no spaces) :"
md C:\Users\Rhys\Desktop\PersonalProjects\StandingsSimulator\data\tournaments\dota2\%dirName%

set /p name= "Enter the tournament name :"
set /p tabName= "Enter the tournament's tab name :"
set /p link= "Enter the tournament link :"
set /p hasTies= "Does the tournament have tieable matches? (true or false) :"

> %dirName%.json echo { "name": "%name%", "tabName": "%tabName%", "source": "%link%", "hasTieMatches": %hasTies%, "isComplete": false }

move %dirName%.json C:\Users\Rhys\Desktop\PersonalProjects\StandingsSimulator\data\tournaments\dota2\%dirName%

echo
echo "Tournament created: %name%"
echo

set teamFileName= "%dirName%teams"

> %teamFileName%.json echo { "teams": [] }

move %teamFileName%.json C:\Users\Rhys\Desktop\PersonalProjects\StandingsSimulator\data\tournaments\dota2\%dirName%

echo
echo "Teams created: %name%"
echo