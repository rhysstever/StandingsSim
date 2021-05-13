class Team {
     constructor(name, abbrev, score){
          this.place = 0;
          this.name = name;
          this.abbrev = abbrev;
          this.score = score;
     }
}

class Series {
     constructor(date, team1, team2){
          this.date = date;
          this.team1 = team1;
          this.team2 = team2;
     }
}

class Tournament {
     constructor(name, region, division, teams, remainingSeries, link){
          this.name = name;
          this.region = region;
          if(division.toLowerCase() == "upper")
               division = 1;
          else if(division.toLowerCase() == "lower")
               division = 2;
          else 
               division = -1;
          this.teams = teams;
          this.remainingSeries = remainingSeries;
          this.link = link;
     }

     addTeam(team){
          this.teams.push(team);
     }

     addSeries(game){
          this.remainingSeries.push(game);
     }

     displayTournament(){
          // Change header name
          let headerName = document.querySelector("#tournamentName");
          headerName.innerHTML = this.name;
          
          // Change source link
          let sourceText = document.querySelector("#source");
          sourceText.href = this.link;

          // Draw the current standings' table
          let currentStandingsTable = document.querySelector("#currentStandings");
          this.displayTable(currentStandingsTable);
     
          // Create game buttons
          this.setupGameButtons();
          
          // Draw the future standing's table
          let futureStandingsTable = document.querySelector("#futureStandings");
          this.displayTable(futureStandingsTable);
     }

     findTeamByName(teamName){
          for(let i = 0; i < this.teams.length; i++){
               if(this.teams[i].name == teamName
                    || this.teams[i].abbrev == teamName)
                    return this.teams[i];
          }
          return undefined;
     }

     findTeamIndexByName(teamName){
          for(let i = 0; i < this.teams.length; i++){
               if(this.teams[i].name == teamName
                    || this.teams[i].abbrev == teamName)
                    return i;
          }
          return -1; 
     }

     displayTable(table){
          // Clear the table
          table.innerHTML = '';
          for(let i = 0; i < this.teams.length; i++) {
               // Create a new table row for the team
               let tableRow = document.createElement("tr");
               // Get the place the team is in (1-8)
               let place = document.createElement("td");
               let index = this.teams[i].place;
               place.innerHTML = index;
               tableRow.appendChild(place);
               // Get the team's name
               let teamName = document.createElement("td");
               teamName.innerHTML = this.teams[i].name;
               tableRow.appendChild(teamName);
               // Get the team's score
               let teamScore = document.createElement("td");
               teamScore.innerHTML = this.teams[i].score[0] + "-" + this.teams[i].score[1];
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

     setupGameButtons(){
          let gamesList = document.querySelector("#remainingGamesList");
          gamesList.innerHTML = '';
          for(let i = 0; i < this.remainingSeries.length; i++){
               // Create a header for the date if it is different
               if(i == 0 || 
                    this.remainingSeries[i].date != this.remainingSeries[i - 1].date){
                    let date = document.createElement("h4");
                    date.innerHTML = this.remainingSeries[i].date;
                    gamesList.appendChild(date);
               }
               // Create list item element
               let matchup = document.createElement("li");
               matchup.classList.add("matchup");
               // Create a button for team 1
               let seriesNum = i + 1;
               let buttonTeam1 = document.createElement("button");
               buttonTeam1.innerHTML = this.remainingSeries[i].team1.name;
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
               buttonTeam2.innerHTML = this.remainingSeries[i].team2.name;
               buttonTeam2.onclick = teamButtonClicked;
               matchup.appendChild(buttonTeam2);
               // Append the list item to the list
               gamesList.appendChild(matchup);
          }
     }

     sortTeams(){
          let changes = 0;
          do{
               changes = 0;
               for(let i = 0; i < this.teams.length; i++){
                    // If the team is the first team, then return 1 (nothing to compare to)
                    if(i == 0)
                         continue;

                    // If the current team has more wins than the previous team, then they are flipped
                    if(this.teams[i].score[0] > this.teams[i - 1].score[0]){
                         let temp = this.teams[i - 1];
                         this.teams[i - 1] = this.teams[i];
                         this.teams[i] = temp;
                         changes++;
                    }
                    // If the teams have the same wins, then the losses are checked
                    else if(this.teams[i].score[0] == this.teams[i - 1].score[0]){
                         // If the current team has less losses than the previous team, then they are flipped
                         if(this.teams[i].score[1] < this.teams[i - 1].score[1]){
                              let temp = this.teams[i - 1];
                              this.teams[i - 1] = this.teams[i];
                              this.teams[i] = temp;
                              changes++;
                         }
                    }
               }
          } while(changes > 0);
          this.calculateTeamPlaces();
     }

     calculateTeamPlaces(){
          for(let i = 0; i < this.teams.length; i++){
               // If the team is the first team, then return 1 (nothing to compare to)
               if(i == 0){
                    this.teams[i].place = i + 1;
                    continue;
               }
               // If the currnet team has less wins than the previous team
               if(this.teams[i].score[0] < this.teams[i - 1].score[0]){
                    let duplicates = 1;
                    for(let j = i - 1; j >= 0; j--){
                         if(this.teams[j].name != this.teams[i - 1].name
                              && this.teams[j].place == this.teams[i - 1].place)
                                   duplicates++;
                    }
                    if(duplicates > 1)
                         this.teams[i].place = this.teams[i - 1].place + duplicates;
                    else
                         this.teams[i].place = this.teams[i - 1].place + 1;
                    continue;
               }
               // If the teams have the same wins, then the losses are checked
               else if(this.teams[i].score[0] == this.teams[i - 1].score[0]){
                    // If the current team has more losses, it is placed beneath the previous team
                    if(this.teams[i].score[1] > this.teams[i - 1].score[1]){
                         let duplicates = 1;
                         for(let j = i - 1; j >= 0; j--){
                              if(this.teams[j].name != this.teams[i - 1].name
                                  && this.teams[j].place == this.teams[i - 1].place)
                                   duplicates++;
                         }
                         if(duplicates > 1)
                              this.teams[i].place = this.teams[i - 1].place + duplicates;
                         else
                              this.teams[i].place = this.teams[i - 1].place + 1;
                         continue;
                    }
                    // If the losses are the same
                    else if (this.teams[i].score[1] == this.teams[i - 1].score[1]){
                         this.teams[i].place = this.teams[i - 1].place;
                         continue;
                    }
               }
          }
     }
}