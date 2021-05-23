let tournaments = [];
let currentTourney = null;

function init(){
     // Get tournaments
     createTournaments();
     currentTourney = tournaments[2].wildCard;
     // The tournament is only drawn if it exists
     if(currentTourney == null)
          return;
     else
          currentTourney.displayTournament();
}

function teamButtonClicked(e){
     // Get predicted losing team
     let winnerTeamNum = e.target.id.substring(4, 5);
     let loserId = e.target.id.substring(0, 4) + (3 - winnerTeamNum) + e.target.id.substring(5);
     let otherButton = document.querySelector("#" + loserId);
     
     // Find series from getting the series number from the button
     let seriesNum = e.target.id.substring(11) - 1;
     let series = currentTourney.remainingSeries[seriesNum];

     // Change buttons' colors
     // First prediction (selection)
     if(series.prediction == 0) {
          e.target.classList.remove("btn-primary");
          otherButton.classList.remove("btn-primary");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
     } 
     // Remove prediction (deselection)
     else if(series.prediction == winnerTeamNum) {
          e.target.classList.remove("btn-success");
          otherButton.classList.remove("btn-danger");
          e.target.classList.add("btn-primary");
          otherButton.classList.add("btn-primary");
     } 
     // Change prediction (flip)
     else {
          e.target.classList.remove("btn-danger");
          otherButton.classList.remove("btn-success");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
     }

     series.adjustScores(winnerTeamNum);

     currentTourney.sortTeams();
     // Redraw the future standings' table
     let futureStandingsTable = document.querySelector("#futureStandings");
     currentTourney.displayTable(futureStandingsTable);
}

function tournamentButtonClicked(e){     
     if(e.target.id.substring(1, 6) == "major"){
          // Gets the major
          let major = tournaments[e.target.id.substring(0, 1)];
          // Displays the wild card or group stage 
          let type = e.target.id.substring(6);
          if(type == "wc"){
               if(major.wildCard != null)
                    currentTourney = major.wildCard;
          }
          else if(type = "gs"){
               if(major.groupStage != null)
                    currentTourney = major.groupStage;
          }
     } else {
          // Displays the new tournament via id
          currentTourney = tournaments[e.target.id];
     }

     currentTourney.displayTournament();
}

// runs init only after the page is done loaded
window.onload = () => {
	init();
}