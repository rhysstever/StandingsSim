# Standings Simulator
A simulator to see the standings for tournaments after predicting remaining games' outcomes.

## Current Tournaments
- [DPC S2 WEU Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division)
- [WePlay AniMajor Wild Card](https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card)*
- [WePlay AniMajor Group Stage](https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage)*

*placeholders for right now, since not all teams have been determined

## Previous Tournaments
- [DPC S2 NA Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division)

## Demos
Predicting a match result and displaying ties:<br/>
<br/>
<img src="media/tying.gif" width="80%" height="80%"><br/>
<br/>
Predicting tiebreaker results:<br/>
<br/>
<img src="media/tiebreakers.gif" width="80%" height="80%">

## To Do
- Add more tournaments
- Implement Liquipedia's parent API 
  - Creating tournaments/finding teams/getting remaining games can be created and updated automatically
- Color table rows based on each team's current score and how many games are left to be played
- Cleanup table display to only show tiebreaker scores if the teams will/are play(ing) tiebreaking matches
- For DPC Tournaments, display an overall DPC standings based on points
- Optimize sorting (currently uses bubble sort because the number of teams has been 8)
