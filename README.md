# Standings Simulator
A simulator to see the standings for tournaments after predicting remaining games' outcomes.

## Current Tournaments
- [DPC S2 WEU Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division)
- [DPC S2 China Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/China/Upper_Division)
- [DPC S2 EEU Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/CIS/Upper_Division)
- [DPC S2 SEA Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Southeast_Asia/Upper_Division)
- [DPC S2 NA Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division)
- [DPC S2 SA Upper Division](https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/South_America/Upper_Division)
- [WePlay AniMajor Wild Card](https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card)
- [WePlay AniMajor Group Stage](https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage)

## Demos
Predicting a match result and displaying ties:<br/>
<br/>
<img src="media/tying.gif" width="80%" height="80%"><br/>
<br/>
Predicting tiebreaker results:<br/>
<br/>
<img src="media/tiebreakers.gif" width="80%" height="80%">

## To Do
- Implement Liquipedia's parent API 
  - Creating tournaments/finding teams/getting remaining games can be created and updated automatically
- Color table rows based on each team's current score and how many games are left to be played
- For DPC Tournaments, display an overall DPC standings based on points
- Optimize sorting (currently uses bubble sort because the number of teams has been low)
