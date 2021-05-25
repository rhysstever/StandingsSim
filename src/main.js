import * as tournaments from "./tournaments.js";

let tournamentsList = [];
let currentTournament = null;

const fps = 20;

function init(){
     // Get tournaments
     tournaments.createTournaments();
     displayCurrentTournament();
     setupDropdownOnClicks();
}

function loop(){
     // Update dropdown button chevrons
     let dropdownButtons = document.getElementsByClassName("dropdownBtn");
     for(let i = 0; i < dropdownButtons.length; i++){
          if(dropdownButtons[i].classList.contains("collapsed")){
               let children = dropdownButtons[i].childNodes.length;
               for(let j = 0; j < children.length; j++){
                    if(dropdownButtons[i].childNodes[j].classList.contains("fa-chevron-up")) {
                         dropdownButtons[i].childNodes[j].classList.remove("fa-chevron-up");
                         dropdownButtons[i].childNodes[j].classList.add("fa-chevron-down");
                    }
               }
          } else {
               let children = dropdownButtons[i].childNodes.length;
               for(let j = 0; j < children.length; j++){
                    if(dropdownButtons[i].childNodes[j].classList.contains("fa-chevron-down")) {
                         dropdownButtons[i].childNodes[j].classList.remove("fa-chevron-down");
                         dropdownButtons[i].childNodes[j].classList.add("fa-chevron-up");
                    }
               }
          }
     }

     requestAnimationFrame(loop, 1000/fps);
}

function displayCurrentTournament(){
     // Display the first incomplete tournament
     for(let i = 0; i < tournamentsList.length; i++){
          if(tournamentsList[i].type == "Major"){
               if(!tournamentsList[i].wildCard.isComplete){
                    currentTournament = tournamentsList[i].wildCard;
                    break;
               } else if(!tournamentsList[i].groupStage.isComplete){
                    currentTournament = tournamentsList[i].groupStage;
                    break;
               }
          } else {
               if(!tournamentsList[i].isComplete) {
                    currentTournament = tournamentsList[i];
                    break;
               }
          }
     }

     if(currentTournament == null)
          currentTournament = tournamentsList[0];

     document.querySelector("title").innerHTML = currentTournament.name;
     
     // The tournament is only drawn if it exists
     if(currentTournament == null)
          return;
     else
          currentTournament.displayTournament();
}

function teamButtonClicked(e){
     // Get predicted losing team
     let winnerTeamNum = e.target.id.substring(4, 5);
     let loserId = e.target.id.substring(0, 4) + (3 - winnerTeamNum) + e.target.id.substring(5);
     let otherButton = document.querySelector("#" + loserId);
     
     // Find series from getting the series number from the button
     let seriesNum = e.target.id.substring(11) - 1;
     let series = currentTournament.remainingSeries[seriesNum];

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

     currentTournament.sortTeams();
     // Redraw the future standings' table
     let futureStandingsTable = document.querySelector("#futureStandings");
     currentTournament.displayTable(futureStandingsTable);
}

function tournamentButtonClicked(e){     
     if(e.target.id.substring(1, 6) == "major"){
          // Gets the major
          let major = tournamentsList[e.target.id.substring(0, 1)];
          // Displays the wild card or group stage 
          let type = e.target.id.substring(6);
          if(type == "wc"){
               if(major.wildCard != null)
                    currentTournament = major.wildCard;
          }
          else if(type = "gs"){
               if(major.groupStage != null)
                    currentTournament = major.groupStage;
          }
     } else {
          // Displays the new tournament via id
          currentTournament = tournamentsList[e.target.id];
     }

     currentTournament.displayTournament();
}

function setupDropdownOnClicks(){
     // Loop through each dropdown button in the document and add the onclick to toggle the icon
     let dropdownButtons = document.getElementsByClassName("dropdownBtn");
     for(let i = 0; i < dropdownButtons.length; i++){
          dropdownButtons[i].onclick = changeDropdownIcon;
     }
}

function changeDropdownIcon(e){
     // Remove the current innerHTML and add the correct chevron icon
     // if the games are collapsed, show chevron-down
     // if the games are shown, show chevron-up
     e.target.innerHTML = '';
     if(e.target.classList.contains("collapsed")){
          e.target.innerHTML = '<i class="fas fa-chevron-down"></i>';
     } else {
          e.target.innerHTML = '<i class="fas fa-chevron-up"></i>';
     }
}

export {tournamentsList, currentTournament, init, teamButtonClicked, tournamentButtonClicked};