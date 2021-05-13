let teams = [];
let remainingSeries = [];

function init(){
     createTeams();
     gamesToPlay();

     // Draw the current standings' table
     let currentStandingsTable = document.querySelector("#currentStandings");
     displayStandingsInTable(currentStandingsTable);
     setupGameButtons();
     
     // Draw the future standing's table
     let futureStandingsTable = document.querySelector("#futureStandings");
     displayStandingsInTable(futureStandingsTable);
}

function createTeams(){
     // Create each Team object and add it to the array
     teams.push(new Team("Alliance", "[A]", [5, 1]));
     teams.push(new Team("Team Liquid", "TL", [4, 2]));
     teams.push(new Team("OG", "OG", [3, 2]));
     teams.push(new Team("Team Nigma", "Nigma", [3, 2]));
     teams.push(new Team("Brame", "Brame", [3, 3]));
     teams.push(new Team("Team Secret", "Secret", [3, 3]));
     teams.push(new Team("Tundra Esports", "Tundra", [2, 4]));
     teams.push(new Team("Hellbear Smashers", "SMASH", [0, 6]));

     // Figure out the place for each team
     calculateTeamPlaces();
}

function calculateTeamPlaces(){
     for(let i = 0; i < teams.length; i++){
          // If the team is the first team, then return 1 (nothing to compare to)
          if(i == 0){
               teams[i].place = i + 1;
               continue;
          }
          // If the currnet team has less wins than the previous team
          if(teams[i].score[0] < teams[i - 1].score[0]){
               let duplicates = 1;
               for(let j = i - 1; j >= 0; j--){
                    if(teams[j].name != teams[i - 1].name
                         && teams[j].place == teams[i - 1].place)
                              duplicates++;
               }
               if(duplicates > 1)
                    teams[i].place = teams[i - 1].place + duplicates;
               else
                    teams[i].place = teams[i - 1].place + 1;
               continue;
          }
          // If the teams have the same wins, then the losses are checked
          else if(teams[i].score[0] == teams[i - 1].score[0]){
               // If the current team has more losses, it is placed beneath the previous team
               if(teams[i].score[1] > teams[i - 1].score[1]){
                    let duplicates = 1;
                    for(let j = i - 1; j >= 0; j--){
                         if(teams[j].name != teams[i - 1].name
                             && teams[j].place == teams[i - 1].place)
                              duplicates++;
                    }
                    if(duplicates > 1)
                         teams[i].place = teams[i - 1].place + duplicates;
                    else
                         teams[i].place = teams[i - 1].place + 1;
                    continue;
               }
               // If the losses are the same
               else if (teams[i].score[1] == teams[i - 1].score[1]){
                    teams[i].place = teams[i - 1].place;
                    continue;
               }
          }
     }
}

function sortTeams(){
     let changes = 0;
     do{
          changes = 0;
          for(let i = 0; i < teams.length; i++){
               // If the team is the first team, then return 1 (nothing to compare to)
               if(i == 0)
                    continue;

               // If the current team has more wins than the previous team, then they are flipped
               if(teams[i].score[0] > teams[i - 1].score[0]){
                    let temp = teams[i - 1];
                    teams[i - 1] = teams[i];
                    teams[i] = temp;
                    changes++;
               }
               // If the teams have the same wins, then the losses are checked
               else if(teams[i].score[0] == teams[i - 1].score[0]){
                    // If the current team has less losses than the previous team, then they are flipped
                    if(teams[i].score[1] < teams[i - 1].score[1]){
                         let temp = teams[i - 1];
                         teams[i - 1] = teams[i];
                         teams[i] = temp;
                         changes++;
                    }
               }
          }
     } while(changes > 0);
}

function gamesToPlay(){
     remainingSeries.push(new Series("May 15th", teams[findTeamIndex("Alliance")], teams[findTeamIndex("Hellbear Smashers")]));
     remainingSeries.push(new Series("May 15th", teams[findTeamIndex("OG")], teams[findTeamIndex("Nigma")]));
     remainingSeries.push(new Series("May 18th", teams[findTeamIndex("Secret")], teams[findTeamIndex("Brame")]));
     remainingSeries.push(new Series("May 18th", teams[findTeamIndex("Nigma")], teams[findTeamIndex("Tundra")]));
     remainingSeries.push(new Series("May 19th", teams[findTeamIndex("Team Liquid")], teams[findTeamIndex("OG")]));
}

function findTeamIndex(teamName){
     for(let i = 0; i < teams.length; i++){
          if(teams[i].name == teamName
               || teams[i].abbrev == teamName)
               return i;
     }
     return -1;
}

function displayStandingsInTable(table){
     // Clear the table
     table.innerHTML = '';
     for(let i = 0; i < teams.length; i++) {
          // Create a new table row for the team
          let tableRow = document.createElement("tr");
          // Get the place the team is in (1-8)
          let place = document.createElement("td");
          let index = teams[i].place;
          place.innerHTML = index;
          tableRow.appendChild(place);
          // Get the team's name
          let teamName = document.createElement("td");
          teamName.innerHTML = teams[i].name;
          tableRow.appendChild(teamName);
          // Get the team's score
          let teamScore = document.createElement("td");
          teamScore.innerHTML = teams[i].score[0] + "-" + teams[i].score[1];
          tableRow.appendChild(teamScore);
          // Color the row depending on the place
          let teamPlace = i + 1;
          if(teamPlace == 1)
               place.classList.add("table-primary");
          else if(teamPlace == 2)
               place.classList.add("table-info");
          else if(teamPlace == 3 || 
               teamPlace == 4)
               place.classList.add("table-success");
          else if(teamPlace == 5 || 
               teamPlace == 6)
               place.classList.add("table-warning");
          else
               place.classList.add("table-danger");
          // Add the table row to the table
          table.appendChild(tableRow);
     }
}

function setupGameButtons(){
     let gamesList = document.querySelector("#remainingGamesList");
     for(let i = 0; i < remainingSeries.length; i++){
          // Create a header for the date if it is different
          if(i == 0 || 
               remainingSeries[i].date != remainingSeries[i - 1].date){
                    let date = document.createElement("h4");
                    date.innerHTML = remainingSeries[i].date;
                    gamesList.appendChild(date);
          }
          // Create list item element
          let matchup = document.createElement("li");
          matchup.classList.add("matchup");
          // Create a button for team 1
          let seriesNum = i + 1;
          let buttonTeam1 = document.createElement("button");
          buttonTeam1.innerHTML = remainingSeries[i].team1.name;
          buttonTeam1.classList.add("btn");
          buttonTeam1.classList.add("btn-primary");
          buttonTeam1.id = "series" + seriesNum + "team1";
          buttonTeam1.onclick = teamButtonClicked;
          matchup.appendChild(buttonTeam1);
          // "vs" in between text
          let versusText = document.createElement("p");
          versusText.innerHTML = "vs";
          matchup.appendChild(versusText);
          // Create a button for team 2
          let buttonTeam2 = document.createElement("button");
          buttonTeam2.classList.add("btn");
          buttonTeam2.classList.add("btn-primary");
          buttonTeam2.id = "series" + seriesNum + "team2";
          buttonTeam2.innerHTML = remainingSeries[i].team2.name;
          buttonTeam2.onclick = teamButtonClicked;
          matchup.appendChild(buttonTeam2);
          // Append the list item to the list
          gamesList.appendChild(matchup);
     }
}

function teamButtonClicked(e){
     // Get predicted winning team
     let winningTeam = teams[findTeamIndex(e.target.innerHTML)];
     
     // Get predicted losing team
     let teamNum = e.target.id.substring(11, 12);
     let id = e.target.id.substring(0, 11) + (3 - teamNum);
     let otherButton = document.querySelector("#" + id);
     let losingTeam = teams[findTeamIndex(otherButton.innerHTML)];

     // If the team was already predicted to win,
     // the team is deselected and the win is removed
     if(e.target.classList.contains("btn-success")){
          winningTeam.score[0]--;
          losingTeam.score[1]--;
          e.target.classList.remove("btn-success");
          otherButton.classList.remove("btn-danger");
          e.target.classList.add("btn-primary");
          otherButton.classList.add("btn-primary");
     }
     // If the other team was predicted (changed prediction)
     else if(e.target.classList.contains("btn-danger")){
          e.target.classList.remove("btn-danger");
          otherButton.classList.remove("btn-success");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
          // Remove the loss from the now predicted team
          // and remove the other team's win
          winningTeam.score[1]--;
          losingTeam.score[0]--;
          // Give the predicted team a win
          // and the other team a loss
          winningTeam.score[0]++;
          losingTeam.score[1]++;
     }
     // First prediction
     else {
          e.target.classList.remove("btn-primary");
          otherButton.classList.remove("btn-primary");
          e.target.classList.add("btn-success");
          otherButton.classList.add("btn-danger");
          // Give the predicted team a win
          // and the other team a loss
          winningTeam.score[0]++;
          losingTeam.score[1]++;
     }
     
     sortTeams();
     calculateTeamPlaces();
     // Redraw the future standings' table
     let futureStandingsTable = document.querySelector("#futureStandings");
     displayStandingsInTable(futureStandingsTable);
}

// runs init only after the page is done loaded
window.onload = () => {
	init();
}