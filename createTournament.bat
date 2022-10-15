@echo off 

set /p fileName= "Enter the name of the file for the tournament (no spaces) :"
set /p name= "Enter the tournament name :"
set /p tabName= "Enter the tournament's tab name :"
set /p link= "Enter the tournament link :"

set /p teamName= "Enter in the team name :" 
set /p teamTag= "Enter in the team tag :" 

> %fileName%.json echo { "name": %teamName%, "abbrev": %teamTag%, "wins": 0, "losses": 0, "draws": 0, "tiebreakerWins": 0 }

echo "Team %teamName% created"