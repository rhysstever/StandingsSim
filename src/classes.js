import * as main from "./main.js";

const regions = {
  WEU: "Western Europe",
  CN: "China",
  EEU: "Eastern Europe",
  SEA: "Southeast Asia",
  NA: "North America",
  SA: "South America",
  GLOBAL: "Global",
};

class Team {
  constructor(name, abbrev, wins, ties, losses, tieBreakerWins) {
    this.place = 0;
    this.name = name;
    this.abbrev = abbrev;

    // W, T, L, and TB Wins for games that have already been played
    this.wins = wins;
    this.ties = ties;
    this.losses = losses;
    this.tieBreakerWins = tieBreakerWins;

    // W, T, L, and TB Wins for future games that the user has predicted
    this.predictedWins = 0;
    this.predictedTies = 0;
    this.predictedLosses = 0;
    this.predictedTieBreakerWins = 0;

    // W, T, L, and TB Wins totals for both already played games and future, predicted games
    this.totalWins = wins;
    this.totalTies = ties;
    this.totalLosses = losses;
    this.totalTieBreakerWins = tieBreakerWins;

    this.isTied = false; // Tied from already played games
    this.isTiedWithPredictions = false; // Tied from already and predictions
  }

  // Updates the total wins, ties, losses, and tiebreaker wins
  calculateTotals() {
    this.totalWins = this.wins + this.predictedWins;
    this.totalTies = this.ties + this.predictedTies;
    this.totalLosses = this.losses + this.predictedLosses;
    this.totalTieBreakerWins =
      this.tieBreakerWins + this.predictedTieBreakerWins;
  }

  displayScore(isWithPredictions, hasTies) {
    let score = "";
    // Standings with predictions
    if(isWithPredictions) {
      this.calculateTotals();

      if(hasTies)
        score = this.totalWins + "-" + this.totalTies + "-" + this.totalLosses;
      else 
        score = this.totalWins + "-" + this.totalLosses;

      if(this.isTiedWithPredictions)
        score += " (" + this.totalTieBreakerWins + ")";
    }
    // The current standings - predictions are not included 
    else {
      if(hasTies)
        score = this.wins + "-" + this.ties + "-" + this.losses;
      else 
        score = this.wins + "-" + this.losses;

      if(this.isTied)
        score += " (" + this.tieBreakerWins + ")";
    }

    return score;
  }

  // Resets predicted wins, ties, losses, and tiebreaker wins
  resetPredictions() {
    this.predictedWins = 0;
    this.predictedTies = 0;
    this.predictedLosses = 0;
    this.predictedTieBreakerWins = 0;

    // Recalculates totals
    this.calculateTotals();
  }
}

class Series {
  constructor(date, team1, team2, isTieBreaker) {
    this.number = 0;
    this.date = date;
    this.team1 = team1;
    this.team2 = team2;
    this.prediction = -1;
    this.isTieBreaker = isTieBreaker;
  }

  adjustScores(winnerNum) {
    // Assigns the winning and losing team of the series
    // based on the passed in winning number
    let winningTeam = null;
    let losingTeam = null;
    if (winnerNum == 1) {
      winningTeam = this.team1;
      losingTeam = this.team2;
    } else if (winnerNum == 2) {
      winningTeam = this.team2;
      losingTeam = this.team1;
    }

    // First prediction (selection)
    if (this.prediction == -1) {
      // If TB, gives the winning team a tiebreaker win
      if (this.isTieBreaker) winningTeam.predictedTieBreakerWins++;
      else {
        // If the prediction is a tie, then gives both teams a tie
        if (winnerNum == 0) {
          this.team1.predictedTies++;
          this.team2.predictedTies++;
        } else {
          // Give the predicted team a win, and the other a loss
          winningTeam.predictedWins++;
          losingTeam.predictedLosses++;
        }
      }
      this.prediction = winnerNum;
    }
    // Remove prediction (deselection)
    else if (this.prediction == winnerNum) {
      // If TB, removes a tiebreaker win from the winning team
      if (this.isTieBreaker) winningTeam.predictedTieBreakerWins--;
      else {
        // If the prediction WAS a tie
        if (this.prediction == 0) {
          // Ties removed from both teams
          this.team1.predictedTies--;
          this.team2.predictedTies--;
        } else {
          // Removes the win and loss from the previously
          // predicted winner and loser, respectively
          winningTeam.predictedWins--;
          losingTeam.predictedLosses--;
        }
      }
      this.prediction = -1;
    }
    // Change prediction (flip)
    else {
      if (this.isTieBreaker) {
        // Switches the tiebreaker win from the previously predicted team
        // to the newly predicted team
        winningTeam.predictedTieBreakerWins++;
        losingTeam.predictedTieBreakerWins--;
      } else {
        // If the prediction WAS a tie
        if (this.prediction == 0) {
          this.team1.predictedTies--;
          this.team2.predictedTies--;

          // Give the predicted team a win
          // and the other team a loss
          winningTeam.predictedWins++;
          losingTeam.predictedLosses++;
        }
        // If the prediction IS NOW a tie
        else if (winnerNum == 0) {
          if (this.prediction == 1) {
            this.team1.predictedWins--;
            this.team2.predictedLosses--;
          } else {
            this.team1.predictedLosses--;
            this.team2.predictedWins--;
          }

          this.team1.predictedTies++;
          this.team2.predictedTies++;
        } else {
          // Remove the loss from the now predicted team
          // and remove the other team's win
          winningTeam.predictedLosses--;
          losingTeam.predictedWins--;

          // Give the predicted team a win
          // and the other team a loss
          winningTeam.predictedWins++;
          losingTeam.predictedLosses++;
        }
      }
      this.prediction = winnerNum;
    }

    // Recalculate totals for both teams
    this.team1.calculateTotals();
    this.team2.calculateTotals();
  }
}

class Tournament {
  constructor(
    name,
    tabName,
    region,
    type,
    subType,
    link,
    hasTieMatches,
    isComplete
  ) {
    this.name = name;
    this.tabName = tabName;
    this.region = region;

    if (type.toLowerCase() == "division" || type.toLowerCase() == "div")
      this.type = "Division";
    else if (type.toLowerCase() == "major") this.type = "Major";
    else this.type = "None";

    switch (this.type) {
      case "Division":
        if (subType.toLowerCase() == "upper") this.subType = "Upper";
        else if (subType.toLowerCase() == "lower") this.subType = "Lower";
        break;
      case "Major":
        if (
          subType.toLowerCase() == "wild card" ||
          subType.toLowerCase() == "wildcard" ||
          subType.toLowerCase() == "wc"
        )
          this.subType = "Wild Card";
        else if (
          subType.toLowerCase() == "group stage" ||
          subType.toLowerCase() == "groupstage" ||
          subType.toLowerCase() == "GS"
        )
          this.subType = "Group Stage";
        break;
      default:
        this.subType = "None";
        break;
    }

    this.hasTieMatches = hasTieMatches;
    this.link = link;
    this.isComplete = isComplete;

    this.teams = [];
    this.remainingSeries = [];
  }

  addTeam(team) {
    this.teams.push(team);
  }

  addSeries(game) {
    this.remainingSeries.push(game);
  }

  resetTeamPredictions() {
    // Reset each team's predictions
    for (let i = 0; i < this.teams.length; i++) {
      this.teams[i].resetPredictions();
    }

    // Reset each match's prediction
    for(let i = 0; i < this.remainingSeries.length; i++) {
      this.remainingSeries[i].prediction = -1;
    }
    this.setupGameButtons(true);
  }

  displayTournament() {
    // Change tournament header and link href
    document.querySelector("title").innerHTML = this.name;
    document.querySelector("#tournamentName").innerHTML = this.name;
    document.querySelector("#source").href = this.link;

    // Sort teams without predictions
    this.sortTeams(false);
    // Draw the current standings' table
    let currentStandingsTable = document.querySelector("#currentStandings");
    this.displayTable(currentStandingsTable);

    if(this.isComplete) {
      // Changes text of currnt standings table and
      // hides the games list and prediction table
      document.querySelector("#currentStandingsHeader").innerHTML = "Final Standings";
      document.querySelector("#predictionTable").style.display = "none";
      document.querySelector("#remainingGamesSection").style.display = "none";
    } else {
      // Create game buttons
      this.setupGameButtons();
      
      // Resets current standings table header and
      // makes sure the games and prediction table section are displayed
      document.querySelector("#currentStandingsHeader").innerHTML = "Current Standings";
      document.querySelector("#remainingGamesSection").style.display = "block";
      document.querySelector("#predictionTable").style.display = "table";
  
      // Sort teams with predictions factored in
      this.sortTeams(true);
      // Draw the future standing's table
      let futureStandingsTable = document.querySelector("#futureStandings");
      this.displayTable(futureStandingsTable);
    }
  }

  findTeamByName(teamName) {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == teamName || this.teams[i].abbrev == teamName)
        return this.teams[i];
    }
    return undefined;
  }

  findTeamIndexByName(teamName) {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == teamName || this.teams[i].abbrev == teamName)
        return i;
    }
    return -1;
  }

  displayTable(table) {    
    // Clear the table
    table.innerHTML = "";
    // Loops through each team and displays their score
    for (let i = 0; i < this.teams.length; i++) {
      // Create a new table row for the team
      let tableRow = document.createElement("tr");

      // Get the place the team is in (1-#, # = num of teams)
      let place = document.createElement("td");
      let boldElement = document.createElement("strong");
      place.classList.add("text-light");
      let index = this.teams[i].place;
      boldElement.innerHTML = index;
      place.appendChild(boldElement);
      tableRow.appendChild(place);

      // Get the team's name
      let teamName = document.createElement("td");
      if (window.innerWidth > 425) teamName.innerHTML = this.teams[i].name;
      else teamName.innerHTML = this.teams[i].abbrev;
      tableRow.appendChild(teamName);

      // Get the team's score
      let teamScore = document.createElement("td");

      let includesPredictions = table.id == "futureStandings";
      teamScore.innerHTML = this.teams[i].displayScore(includesPredictions, this.hasTieMatches);

      // Color table element
      this.colorRow(i, place);

      // Add the score to the table row
      // and the table row to the table
      tableRow.appendChild(teamScore);
      table.appendChild(tableRow);
    }
  }

  colorRow(index, place) {
    // Color the row depending on the place
    let teamPlace = index + 1;

    switch (this.type) {
      case "Division":
        // Upper Division
        if (this.subType == "Upper") {
          // #1 blue
          if (teamPlace == 1) place.classList.add("bg-primary");
          // #2 light blue
          else if (teamPlace == 2) place.classList.add("bg-info");
          // Bottom 2 red,
          else if (
            teamPlace == this.teams.length ||
            teamPlace == this.teams.length - 1
          )
            place.classList.add("bg-danger");
          // Rest dependent on region
          else {
            // Both EUs, China, and SEA's 3rd place are green
            if (
              teamPlace == 3 &&
              (this.region == regions.WEU ||
                this.region == regions.CN ||
                this.region == regions.EEU ||
                this.region == regions.SEA)
            )
              place.classList.add("bg-success");
            // WEU & China's 4th place are green
            else if (
              teamPlace == 4 &&
              (this.region == regions.WEU || this.region == regions.CN)
            )
              place.classList.add("bg-success");
            // Rest are yellow
            else place.classList.add("bg-warning");
          }
        }
        // Lower Division
        else if (this.subType == "Lower") {
          this.top2Bottom2(teamPlace, place);
        }
        break;
      case "Major":
        // Major Wild Card
        if (this.subType == "Wild Card") {
          // Top 2 green
          if (teamPlace == 1 || teamPlace == 2)
            place.classList.add("bg-success");
          // Rest red
          else place.classList.add("bg-danger");
        }
        // Major Group Stage
        else if (this.subType == "Group Stage") {
          this.top2Bottom2(teamPlace, place);
        }
        break;
      default:
        break;
    }
  }

  // A helper function for colorRow()
  // that colors the top 2 green, bottom 2 red, and rest yellow
  top2Bottom2(teamPlace, place) {
    // Top 2 green
    if (teamPlace == 1 || teamPlace == 2) place.classList.add("bg-success");
    // Bottom 2 red
    else if (
      teamPlace == this.teams.length ||
      teamPlace == this.teams.length - 1
    )
      place.classList.add("bg-danger");
    // Rest yellow
    else place.classList.add("bg-warning");
  }

  setupGameButtons() {
    let gamesList = document.querySelector("#remainingGamesList");
    gamesList.innerHTML = "";
    for (let i = 0; i < this.remainingSeries.length; i++) {
      // Create a header for the date if it is different
      if (
        i == 0 ||
        this.remainingSeries[i].date != this.remainingSeries[i - 1].date
      ) {
        let date = document.createElement("h4");
        date.innerHTML = this.remainingSeries[i].date;
        gamesList.appendChild(date);
      }
      // Create list item element
      let matchup = document.createElement("div");
      matchup.classList.add("matchup");
      // Calculate and update the series number
      let seriesNum = i + 1;
      this.remainingSeries[i].number = seriesNum;
      // Create a button for team 1
      let buttonTeam1 = this.createTeamButton(this.remainingSeries[i].team1);
      buttonTeam1.classList.add("team1");
      buttonTeam1.id = "team1series" + seriesNum;
      matchup.appendChild(buttonTeam1);

      // If the match can be tied, a middle "tie" button is created
      // otherwise, plain "vs" text is shown in between team buttons
      if (this.hasTieMatches) {
        let tieButton = document.createElement("button");
        tieButton.innerHTML = "tie";
        tieButton.classList.add("btn");
        tieButton.classList.add("team0");
        tieButton.classList.add("btn-primary");
        tieButton.id = "team0series" + seriesNum;
        tieButton.onclick = main.predictionButtonClicked;
        matchup.appendChild(tieButton);
      } else {
        let versusText = document.createElement("p");
        versusText.innerHTML = "vs";
        matchup.appendChild(versusText);
      }

      // Create a button for team 2
      let buttonTeam2 = this.createTeamButton(this.remainingSeries[i].team2);
      buttonTeam2.classList.add("team2");
      buttonTeam2.id = "team2series" + seriesNum;
      matchup.appendChild(buttonTeam2);

      // If the series has been predicted already, color the buttons accordingly
      if(this.remainingSeries[i].prediction == 0) {
        buttonTeam1.classList.add("btn-warning");
        buttonTeam2.classList.add("btn-warning");
      } else if(this.remainingSeries[i].prediction == 1) {
        buttonTeam1.classList.add("btn-success");
        buttonTeam2.classList.add("btn-danger");
      } else if(this.remainingSeries[i].prediction == 2) {
        buttonTeam1.classList.add("btn-danger");
        buttonTeam2.classList.add("btn-success");
      } else {
        buttonTeam1.classList.add("btn-primary");
        buttonTeam2.classList.add("btn-primary");
      }

      // Add "TB" next to the series if it is a tiebreaker
      if (this.remainingSeries[i].isTieBreaker) {
        let tbText = document.createElement("p");
        tbText.innerHTML = "(TB)";
        matchup.appendChild(tbText);
      }
      // Append the list item to the list
      gamesList.appendChild(matchup);
    }
    // Displays a message if there are no remaining games
    if (gamesList.childElementCount == 0) {
      let message = document.createElement("p");
      message.innerHTML = "No games to display.";
      gamesList.appendChild(message);
    }
  }

  // A helper function for setupGameButtons()
  // sets common attributes for the team buttons
  createTeamButton(team) {
    let button = document.createElement("button");

    if (window.innerWidth > 425) button.innerHTML = team.name;
    else button.innerHTML = team.abbrev;

    button.classList.add("btn");
    button.onclick = main.predictionButtonClicked;
    return button;
  }

  sortTeams(withPredictions) {
    let changes = 0;
    do {
      changes = 0;
      for (let i = 0; i < this.teams.length; i++) {
        // If the team is the first team, then continue (nothing to compare to)
        if (i == 0) continue;

        // Get current and previous team scores, depending on if predictions are included
        let currentTeamScores = [];
        let previousTeamScores = [];
        if(withPredictions) {
          this.teams[i].isTiedWithPredictions = false;
          currentTeamScores = [this.teams[i].totalWins, this.teams[i].totalTies, this.teams[i].totalLosses, this.teams[i].totalTieBreakerWins];
          previousTeamScores = [this.teams[i - 1].totalWins, this.teams[i - 1].totalTies, this.teams[i - 1].totalLosses, this.teams[i - 1].totalTieBreakerWins];
        }
        else {
          this.teams[i].isTied = false;
          currentTeamScores = [this.teams[i].wins, this.teams[i].ties, this.teams[i].losses, this.teams[i].tieBreakerWins];
          previousTeamScores = [this.teams[i - 1].wins, this.teams[i - 1].ties, this.teams[i - 1].losses, this.teams[i - 1].tieBreakerWins];
        }

        // If the current team has more wins than the previous team, then they are flipped
        if (currentTeamScores[0] > previousTeamScores[0]) {
          let temp = this.teams[i - 1];
          this.teams[i - 1] = this.teams[i];
          this.teams[i] = temp;
          changes++;
        }
        // If the teams have the same wins, then the ties are checked
        else if (currentTeamScores[0] == previousTeamScores[0]) {
          // If the current team has more ties than the previous team, then they are flipped
          if (currentTeamScores[1] > previousTeamScores[1]) {
            let temp = this.teams[i - 1];
            this.teams[i - 1] = this.teams[i];
            this.teams[i] = temp;
            changes++;
            // If the teams have the same ties, then the losses are checked
          } else if (currentTeamScores[1] == previousTeamScores[1]) {
            // If the current team has less losses than the previous team, then they are flipped
            if (currentTeamScores[2] < previousTeamScores[2]) {
              let temp = this.teams[i - 1];
              this.teams[i - 1] = this.teams[i];
              this.teams[i] = temp;
              changes++;
            }
            // If the teams have the same losses, then the tiebreaker wins are checked
            else if (currentTeamScores[2] == previousTeamScores[2]) {
              // If the current team has more tiebreaker wins than the previous team, then they are flipped
              if (currentTeamScores[3] > previousTeamScores[3]) {
                let temp = this.teams[i - 1];
                this.teams[i - 1] = this.teams[i];
                this.teams[i] = temp;
                changes++;
              } else {
                // If the wins, ties, losses, and tiebreaker wins are the same,
                // then both the current team and the previous team
                // are set to be tied
                if(withPredictions) {
                  this.teams[i].isTiedWithPredictions = true;
                  this.teams[i - 1].isTiedWithPredictions = true;
                } else {
                  this.teams[i].isTied = true;
                  this.teams[i - 1].isTied = true;
                }
              }
            }
          }
        }
      }
    } while (changes > 0);
    this.calculateTeamPlaces(withPredictions);
  }

  // Calculates the place # for each team
  // called at the end of sortTeams()
  calculateTeamPlaces(withPredictions) {
    for (let i = 0; i < this.teams.length; i++) {
      // If the team is the first team, then its place is 1
      if (i == 0) {
        this.teams[i].place = 1;
        continue;
      }

      // Get current and previous team scores, depending on if predictions are included
      let currentTeamScores = [];
      let previousTeamScores = [];
      if(withPredictions) {
        currentTeamScores = [this.teams[i].totalWins, this.teams[i].totalTies, this.teams[i].totalLosses, this.teams[i].totalTieBreakerWins];
        previousTeamScores = [this.teams[i - 1].totalWins, this.teams[i - 1].totalTies, this.teams[i - 1].totalLosses, this.teams[i - 1].totalTieBreakerWins];
      } else {
        currentTeamScores = [this.teams[i].wins, this.teams[i].ties, this.teams[i].losses, this.teams[i].tieBreakerWins];
        previousTeamScores = [this.teams[i - 1].wins, this.teams[i - 1].ties, this.teams[i - 1].losses, this.teams[i - 1].tieBreakerWins];
      }

      // Loops through both arrays of scores, counting if any differences
      let isSame = true;
      for(let i = 0; i < currentTeamScores.length; i++) {
        if(currentTeamScores[i] != previousTeamScores[i]) {
          isSame = false;
          break;
        }        
      }
      // If both team scores are the same
      if(isSame) {
        this.teams[i].place = this.teams[i - 1].place;
        continue;
      } else {
        // Otherwise, calculate the team's place with any possible duplicates before it
        this.calcPlaceWithDups(i);
      }
    }
  }

  // Helper func for calculateTeamPlaces()
  calcPlaceWithDups(index) {
    let duplicates = 1;
    // Loops "up" the table, if the team directly above the current team is tied 
    // with any teams above them, the "duplicate" is counted
    for (let j = index - 1; j >= 0; j--) {
      if (
        this.teams[j].name != this.teams[index - 1].name &&
        this.teams[j].place == this.teams[index - 1].place
      )
        duplicates++;
    }
    this.teams[index].place = this.teams[index - 1].place + duplicates;
  }

  addScoreToTeam(team, wins, ties, losses, tieBreakerWins) {
    for(let i = 0; i < this.teams.length; i++) {
      if(this.teams[i] == team) {
        this.teams[i].wins += wins;
        this.teams[i].ties += ties;
        this.teams[i].losses += losses;
        this.teams[i].tieBreakerWins += tieBreakerWins;
      }
    }
  }
}

class Division extends Tournament {
  constructor(name, tabName, region, subType, link, hasTieMatches, isComplete) {
    super(
      name,
      tabName,
      region,
      "Division",
      subType,
      link,
      hasTieMatches,
      isComplete
    );
  }
}

class Major {
  constructor(name, tabName, link) {
    this.name = name;
    this.tabName = tabName;
    this.link = link;
    this.type = "Major";
    this.qualifiers = {};
    this.wildCard = null;
    this.groupStage = null;
  }

  addQualifier(region, tournament) {
    // Checks if the given region exists, if so, the tournament
    // is added as the value of that region key
    for (let key in regions) {
      if (regions[key] == region) 
        this.qualifiers[key] = tournament;
    }
  }

  addQualifiedTeams() {
    // Loops through each region
    for (let region in regions) {
      // Gets the qualifying tournament of each region
      let qualifierTourney = this.qualifiers[region];
      // If the tournament exists, the qualifying team is found and
      // a copy of it is made and added to the major wild card
      if (qualifierTourney != null) {
        switch (qualifierTourney.region) {
          // The 4th placed teams of the Western Europe and
          // China regions qualify to the major wild card
          case regions.WEU:
          case regions.CN:
            let thirdPlaceTeam = qualifierTourney.teams[3];
            this.wildCard.addTeam(
              new Team(thirdPlaceTeam.name, thirdPlaceTeam.abbrev, 0, 0, 0, 0)
            );
          // The 3rd placed teams of the Western Europe, China,
          // Eastern Europe, and SE Asia regions qualify to the major wild card
          case regions.EEU:
          case regions.SEA:
            let fourthPlaceTeam = qualifierTourney.teams[2];
            this.wildCard.addTeam(
              new Team(fourthPlaceTeam.name, fourthPlaceTeam.abbrev, 0, 0, 0, 0)
            );
          case regions.NA:
          case regions.SA:
            let secondPlaceTeam = qualifierTourney.teams[1];
            this.groupStage.addTeam(
              new Team(secondPlaceTeam.name, secondPlaceTeam.abbrev, 0, 0, 0, 0)
            );
            break;
          default:
            break;
        }
      }
    }
  }
}

class WildCard extends Tournament {
  constructor(major, link, hasTieMatches, isComplete) {
    let name = major.name + ": Wild Card";
    super(
      name,
      "Wild Card",
      regions.GLOBAL,
      "Major",
      "Wild Card",
      link,
      hasTieMatches,
      isComplete
    );
  }
}

class GroupStage extends Tournament {
  constructor(major, link, hasTieMatches, isComplete) {
    let name = major.name + ": Group Stage";
    super(
      name,
      "Group Stage",
      regions.GLOBAL,
      "Major",
      "Group Stage",
      link,
      hasTieMatches,
      isComplete
    );
    this.wildcard = null;
  }
}

export {
  regions,
  Team,
  Series,
  Tournament,
  Division,
  Major,
  WildCard,
  GroupStage,
};
