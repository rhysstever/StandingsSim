import * as classes from "./classes.js"
import * as tournament from "./tournament.js"

let fps = 20;
let prevLarge = true;

const init = () => {
  setupOnclicks();
  // resetAllPredictions();
  // loop();
}

const setupOnclicks = () => {
  // Loop through each dropdown button in the document and add the onclick to toggle the icon
  let dropdownButtons = document.getElementsByClassName("dropdownBtn");
  for (let i = 0; i < dropdownButtons.length; i++) {
    dropdownButtons[i].onclick = changeDropdownIcon;
  }

  document.querySelector("#resetPredictionsButton").onclick = resetAllPredictions;
}

const loop = () => {
  let currentTournament = JSON.parse(sessionStorage.getItem("currentTournament"));

  // If the window was large and is now 425px or smaller
  if (prevLarge && window.innerWidth <= 425) {
    prevLarge = false;
    // Redisplays the tournament with the abbreviations of each team
    currentTournament.displayTournament();
  } else if (!prevLarge && window.innerWidth > 425) {
    prevLarge = true;
    // Redisplays the tournament with the full name of each team
    currentTournament.displayTournament();
  }

  // Call loop() again
  requestAnimationFrame(loop, 1000, fps);
}

const gameButtonClicked = (e) => {
  let newGame = e.target.id;
  sessionStorage.setItem('currentGame', newGame);
}

const tournamentButtonClicked = (e) => {
  let newID = parseInt(e.target.id);
  sessionStorage.setItem('currentTournamentID', newID);
}

const predictionButtonClicked = (e) => {
  // Get the winning team's number (1 or 2)
  let winnerTeamNum = e.target.id.substring(4, 5);

  // Find series from getting the series number from the button
  let seriesNum = e.target.id.substring(11) - 1;
  let series = currentTournament.remainingSeries[seriesNum];

  // If the teams have tied
  if (winnerTeamNum === 0) {
    // Get both team buttons
    let team1Button = document.querySelector("#team1series" + series.number);
    let team2Button = document.querySelector("#team2series" + series.number);

    // First prediction (selection)
    if (series.prediction === -1) {
      team1Button.classList.remove("btn-primary");
      team2Button.classList.remove("btn-primary");
      team1Button.classList.add("btn-warning");
      team2Button.classList.add("btn-warning");
    }
    // Remove tie prediction (deselection)
    else if (series.prediction === winnerTeamNum) {
      team1Button.classList.remove("btn-warning");
      team2Button.classList.remove("btn-warning");
      team1Button.classList.add("btn-primary");
      team2Button.classList.add("btn-primary");
    }
    // Change prediction
    else {
      if (team1Button.classList.contains("btn-success")) {
        team1Button.classList.remove("btn-success");
        team2Button.classList.remove("btn-danger");
      } else {
        team1Button.classList.remove("btn-danger");
        team2Button.classList.remove("btn-success");
      }

      team1Button.classList.add("btn-warning");
      team2Button.classList.add("btn-warning");
    }
  } else {
    // Find the loser's button based on the winning team's number
    let loserId =
      e.target.id.substring(0, 4) +
      (3 - winnerTeamNum) +
      e.target.id.substring(5);
    let otherButton = document.querySelector("#" + loserId);

    // Change buttons' colors
    // First prediction (selection)
    if (series.prediction === -1) {
      e.target.classList.remove("btn-primary");
      otherButton.classList.remove("btn-primary");
      e.target.classList.add("btn-success");
      otherButton.classList.add("btn-danger");
    }
    // Remove prediction (deselection)
    else if (series.prediction === winnerTeamNum) {
      e.target.classList.remove("btn-success");
      otherButton.classList.remove("btn-danger");
      e.target.classList.add("btn-primary");
      otherButton.classList.add("btn-primary");
    }
    // Change prediction (flip)
    else {
      // If the series prediction WAS a tie
      if (series.prediction === 0) {
        e.target.classList.remove("btn-warning");
        otherButton.classList.remove("btn-warning");
      } else {
        e.target.classList.remove("btn-danger");
        otherButton.classList.remove("btn-success");
      }

      e.target.classList.add("btn-success");
      otherButton.classList.add("btn-danger");
    }
  }

  series.adjustScores(winnerTeamNum);

  currentTournament.sortTeams(true);
  // Redraw the future standings' table
  let futureStandingsTable = document.querySelector("#futureStandings");
  currentTournament.displayTable(futureStandingsTable);
}

const changeDropdownIcon = (e) => {
  // Checks if the selected item was the button or the button's text
  let dropdownButton = e.target;
  if (!dropdownButton.classList.contains("btn"))
    dropdownButton = dropdownButton.parentNode;

  // Remove the current innerHTML and add the correct chevron icon
  dropdownButton.innerHTML = "";
  // If the games are collapsed, show chevron-down
  if (dropdownButton.classList.contains("collapsed")) {
    dropdownButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  // If the games are shown, show chevron-up
  } else {
    dropdownButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
  }
}

const resetAllPredictions = () => {
  let currentTournament = getCurrentTournament();

  // Reset each team's predictions and sort them
  currentTournament.resetTeamPredictions();
  currentTournament.sortTeams(true);
  // Redraw the future standings' table
  let futureStandingsTable = document.querySelector("#futureStandings");
  currentTournament.displayTable(futureStandingsTable);
}

// A helper method that parses the stored current tournament and "rebuilds" it to be a tournament object
const getCurrentTournament = () => {
  let currentTournamentObj = JSON.parse(sessionStorage.getItem("currentTournament"));
  return new classes.Tournament(
    currentTournamentObj.name, currentTournamentObj.tabName, currentTournamentObj.link, currentTournamentObj.hasTieMatches, currentTournamentObj.isComplete, currentTournamentObj.colorScheme);
};

export { 
  init, 
  gameButtonClicked,
  tournamentButtonClicked
};
