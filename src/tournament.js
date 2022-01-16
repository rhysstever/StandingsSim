import * as classes from "./classes.js"

const loadAPIData = (leagueID, isSpecificLeague, teamData) => {
  const xhr = new XMLHttpRequest();
  let api = "https://datdota.com/api/leagues";
  if(isSpecificLeague)
    api = "https://datdota.com/api/teams/performances?leagues=" + leagueID;

  xhr.onerror = (e) => console.log("error loading data from api");

  xhr.onload = (e) => {
      const jsonString = e.target.response;
      let json = JSON.parse(jsonString);
      
      if(isSpecificLeague)
        createTournament(leagueID, json["data"]);
      else 
        getSpecificLeagueInfo(leagueID, json["data"]);
  };

  xhr.open("GET", api);
  xhr.send();
};

const createTournament = (leagueID, teamDataJSON) => {
  // Get overall league info
  let leagueInfo = getSpecificLeagueInfo(leagueID);

  // Create the tournament object
  let newTournament = new classes.Tournament(
    leagueInfo.name, "#", true, false);
  newTournament.createColorScheme();

  // Create each team
  for (var key of Object.keys(teamDataJSON)) {
    let teamData = teamDataJSON[key];
    let team = new classes.Team(teamData.team.name, teamData.team.tag, teamData.wins, 0, teamData.losses, 0);
    newTournament.addTeam(team);
  }

  // Set the new current tournament and display it
  sessionStorage.setItem("currentTournament", JSON.stringify(newTournament));
  newTournament.displayTournament();
};

const getSpecificLeagueInfo = (leagueID, leagueDataJSON) => {
  console.log(leagueDataJSON);

  for (var key of Object.keys(leagueDataJSON)) {
    if(leagueDataJSON[key].tier.id = 1
      && leagueDataJSON[key].league_id === leagueID)
      return leagueDataJSON[key];
  }
};

export { loadAPIData }