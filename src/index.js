let tournaments = [];
let currentTourney = 0;

function init(){
     // Get tournaments
     createTournaments();
     // The tournament is only drawn if it exists
     if(tournaments[currentTourney] == null)
          return;
     else
          tournaments[currentTourney].displayTournament();
}

function teamButtonClicked(e){
     // Get predicted losing team
     let teamNum = e.target.id.substring(11, 12);
     let id = e.target.id.substring(0, 11) + (3 - teamNum);
     let otherButton = document.querySelector("#" + id);
     
     // Find series from getting the series number from the button
     let seriesNum = e.target.id.substring(6, 7) - 1;
     let series = tournaments[currentTourney].remainingSeries[seriesNum];
     let changeType = null;
     // If the team was already predicted to win,
     // the team is deselected and the win is removed
     if(e.target.classList.contains("btn-success")){
          e.target.classList.remove("btn-success");
          otherButton.classList.remove("btn-danger");
          e.target.classList.add("btn-primary");
          otherButton.classList.add("btn-primary");
          changeType = "deselection";
     }
     // If the other team was predicted (changed prediction)
     else if(e.target.classList.contains("btn-danger")){
          e.target.classList.remove("btn-danger");
          otherButton.classList.remove("btn-success");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
          changeType = "flip";
     }
     // First prediction
     else {
          e.target.classList.remove("btn-primary");
          otherButton.classList.remove("btn-primary");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
          changeType = "selection";
     }

     series.adjustScores(teamNum, changeType);

     tournaments[currentTourney].sortTeams();
     // Redraw the future standings' table
     let futureStandingsTable = document.querySelector("#futureStandings");
     tournaments[currentTourney].displayTable(futureStandingsTable);
}

function tournamentButtonClicked(e){
     // If the tournament clicked is the same tournament, 
     // then nothing happens
     if(currentTourney == e.target.id)
          return;

     // Loads the new tournament
     currentTourney = e.target.id;
     tournaments[currentTourney].displayTournament();
}

// runs init only after the page is done loaded
window.onload = () => {
	init();
}