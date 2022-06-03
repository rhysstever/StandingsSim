import * as tournamentsList from "./tournamentsList.js"

let currentTournament = null;

let fps = 20;
let prevLarge = true;

const init = () => {
  // Load and display tournaments
	tournamentsList.loadTournaments();
	tournamentsList.loadDemos();
  displayNextTournament();
  // inital setups
  setupOnclicks();
  resetAllPredictions();
  // Start looping
  loop();
}

const loop = () => {
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
  requestAnimationFrame(loop, 1000 / fps);
}

//  Displays the next incomplete tournament
//  if all tournaments are complete, it displays the first demo
const displayNextTournament = () => {
  // Loop through every tournament, and set the first 
  // incomplete one to be the current tournament
  for(let i = 0; i < tournamentsList.tournaments.length; i++)
    if(!tournamentsList.tournaments[i].isComplete) {
      currentTournament = tournamentsList.tournaments[i];
      break;
    }
  // If the current tournament is still null, set it to be the demo
  if(currentTournament == null)
    currentTournament = tournamentsList.demos[0];

  // display the current tournament
  currentTournament.displayTournament();
}

const predictionButtonClicked = (e) => {
  // Get the winning team's number (1 or 2)
  let winnerTeamNum = e.target.id.substring(4, 5);

  // Find series from getting the series number from the button
  let seriesNum = e.target.id.substring(11) - 1;
  let series = currentTournament.remainingSeries[seriesNum];

  // If the teams have tied
  if (winnerTeamNum == 0) {
    // Get both team buttons
    let team1Button = document.querySelector("#team1series" + series.number);
    let team2Button = document.querySelector("#team2series" + series.number);

    clearPredictionButtonsClassList(team1Button, team2Button);

    // First prediction (selection)
    if (series.prediction == -1) {
      team1Button.classList.add("btn-warning");
      team2Button.classList.add("btn-warning");
    }
    // Remove tie prediction (deselection)
    else if (series.prediction == winnerTeamNum) {
      team1Button.classList.add("btn-primary");
      team2Button.classList.add("btn-primary");
    }
    // Change prediction
    else {
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

    clearPredictionButtonsClassList(e.target, otherButton);

    // Change buttons' colors
    // First prediction (selection)
    if (series.prediction == -1) {
      e.target.classList.add("btn-success");
      otherButton.classList.add("btn-danger");
    }
    // Remove prediction (deselection)
    else if (series.prediction == winnerTeamNum) {
      e.target.classList.add("btn-primary");
      otherButton.classList.add("btn-primary");
    }
    // Change prediction (flip)
    else {
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

const setupOnclicks = () => {
  // Loop through each dropdown button in the document and add the onclick to toggle the icon
  let dropdownButtons = document.getElementsByClassName("dropdownBtn");
  for (let i = 0; i < dropdownButtons.length; i++) {
    dropdownButtons[i].onclick = changeDropdownIcon;
  }

  document.querySelector("#resetPredictionsButton").onclick = resetAllPredictions;
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
    dropdownButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
    // If the games are shown, show chevron-up
  } else {
    dropdownButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  }
}

const resetAllPredictions = () => {
  // Reset each team's predictions and sort them
  currentTournament.resetTeamPredictions();
  currentTournament.sortTeams(true);
  // Redraw the future standings' table
  let futureStandingsTable = document.querySelector("#futureStandings");
  currentTournament.displayTable(futureStandingsTable);
}

const clearPredictionButtonsClassList = (button1, button2) => {
  button1.classList = 'btn team1 ripple-surface';
  button2.classList = 'btn team1 ripple-surface';
}

export { 
  currentTournament,
  init, 
  predictionButtonClicked
};
