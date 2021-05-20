# StandingsSim
A simulator to see the standings for tournaments after predicting remaining games' outcomes.

## Current Tournaments
- [DPC S2 WEU Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division)
- [DPC S2 NA Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division)

## To Do
- Add more tournaments
- Implement Liquipedia's parent API 
  - Creating tournaments/finding teams/getting remaining games can be created and updated automatically
- Color table rows based on each team's current score and how many games are left to be played
- Cleanup table display to only show tiebreaker scores if the teams will/are play(ing) tiebreaking matches
- For DPC Tournaments, display an overall DPC standings based on points
- Optimize sorting (currently uses bubble sort because the number of teams has been 8)
