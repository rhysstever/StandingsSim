import * as main from "./main.js";
import * as helpers from "./tournamentHelpers.js"

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
  calculateTotals = () => {
    this.totalWins = this.wins + this.predictedWins;
    this.totalTies = this.ties + this.predictedTies;
    this.totalLosses = this.losses + this.predictedLosses;
    this.totalTieBreakerWins = 
      this.tieBreakerWins + this.predictedTieBreakerWins;
  }

  getStat = (stat, withPreditions, hasTies) => {
    if(stat.toLowerCase() != "score")
      hasTies = false;

    // Update total values
    if(withPreditions)
      this.calculateTotals();

    switch(stat.toLowerCase()) {
      case "score":
        if(hasTies)
          return (this.getStat("wins", withPreditions, false) * 2) + this.getStat("ties", withPreditions, false);
        else
          return this.getStat("wins", withPreditions, false);
      case "wins":
        if(withPreditions)
          return this.totalWins;
        else
          return this.wins;
      case "ties":
        if(withPreditions)
          return this.totalTies;
        else
          return this.ties;
      case "losses":
        if(withPreditions)
          return this.totalLosses;
        else
          return this.losses;
      case "tiebreakerwins":
      case "tbwins":
        if(withPreditions)
          return this.totalTieBreakerWins;
        else
          return this.tieBreakerWins;
    }
  }

  displayScore = (isWithPredictions, hasTies) => {
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
  resetPredictions = () => {
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

  adjustScores = (winnerNum) => {
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
  constructor(name, tabName, link, hasTieMatches, isComplete, colorScheme) {
    this.name = name;
    this.tabName = tabName;
    this.hasTieMatches = hasTieMatches;
    this.link = link;
    this.isComplete = isComplete;
    this.colorScheme = colorScheme;

    this.teams = [];
    this.remainingSeries = [];
  }

  addTeam = (team) => {
    this.teams.push(team);
  }

  addSeries = (game) => {
    this.remainingSeries.push(game);
  }

  resetTeamPredictions = () => {
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

  displayTournament = () => {
    // Change tournament header and link href
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

  findTeamByName = (teamName) => {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == teamName || this.teams[i].abbrev == teamName)
        return this.teams[i];
    }
    return undefined;
  }

  findTeamIndexByName = (teamName) => {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == teamName || this.teams[i].abbrev == teamName)
        return i;
    }
    return -1;
  }

  displayTable = (table) => {    
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

      // Display the team's name
      let teamName = document.createElement("td");
      if (window.innerWidth > 425) teamName.innerHTML = this.teams[i].name;
      else teamName.innerHTML = this.teams[i].abbrev;
      tableRow.appendChild(teamName);

      // Display the team's score
      let teamScore = document.createElement("td");
      let includesPredictions = (table.id == "futureStandings");
      teamScore.innerHTML = this.teams[i].displayScore(includesPredictions, this.hasTieMatches);

      // Color table element
      let colorValue = this.colorRow(i);
      place.classList.add(colorValue);

      // Add the score to the table row
      // and the table row to the table
      tableRow.appendChild(teamScore);
      table.appendChild(tableRow);
    }
  }

  colorRow = (index) => {
    let rank = index + 1;
    
    if(rank in this.colorScheme.extras)
      return helpers.convertColorToButtonColor(this.colorScheme.extras[rank]);
    else
      return helpers.convertColorToButtonColor(this.colorScheme.base);
  }

  setupGameButtons = () => {
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
  createTeamButton = (team) => {
    let button = document.createElement("button");

    if (window.innerWidth > 425) button.innerHTML = team.name;
    else button.innerHTML = team.abbrev;

    button.classList.add("btn");
    button.onclick = main.predictionButtonClicked;
    return button;
  }

  sortTeams = (withPredictions) => {
    let sortedTeams = [];
    do {
      let highestTeamIndex = -1;
      for (let i = 0; i < this.teams.length; i++) {
        // If the current team has already been selected, it is skipped
        if(sortedTeams.includes(this.teams[i]))
          continue;

        // If a highest team has not been assigned, make it be the current team
        if(highestTeamIndex == -1){
          highestTeamIndex = i;
          continue;
        } else {
          // Compares the current team's score with the (so far) highest score
          if(this.teams[i].getStat("score", withPredictions, this.hasTieMatches) 
            > this.teams[highestTeamIndex].getStat("score", withPredictions, this.hasTieMatches)) {
              // Reassigns highest team if the current team's score is higher
              highestTeamIndex = i;
              continue;
          // If the scores are equal
          } else if(this.teams[i].getStat("score", withPredictions, this.hasTieMatches) 
                == this.teams[highestTeamIndex].getStat("score", withPredictions, this.hasTieMatches)) {
            // If the scores are the same, these 2 teams are set to tied
            if(withPredictions){
              this.teams[i].isTiedWithPredictions = true;
              this.teams[highestTeamIndex].isTiedWithPredictions = true;
            } else {
              this.teams[i].isTied = true;
              this.teams[highestTeamIndex].isTied = true;
            }

            // Compares tieBreaker wins
            if(this.teams[i].getStat("TBWins", withPredictions, false) 
            > this.teams[highestTeamIndex].getStat("TBWins", withPredictions, false)) {
              // Reassigns highest team if the current team has more tieBreaer wins
              highestTeamIndex = i;
              continue;
            }
          }
        }
      }
      // Adds the highest team to the sorted teams array
      sortedTeams.push(this.teams[highestTeamIndex]);
      // Loops until the sorted teams array is populated with every team in the tournament
    } while (sortedTeams.length != this.teams.length);

    // Sets the tournament's teams array to be the sorted array of teams
    this.teams = sortedTeams;
    this.calculateTeamPlaces(withPredictions);
  }

  // Calculates the place # for each team
  // called at the end of sortTeams()
  calculateTeamPlaces = (withPredictions) => {
    document.querySelector("#info").innerHTML = "";
    for (let i = 0; i < this.teams.length; i++) {

      // If the team is the first team, then its place is 1
      if (i == 0) {
        this.teams[i].place = 1;
        continue;
      }

      // Get the current and previous teams' score
      let currentTeamScore = this.teams[i].getStat("score", withPredictions, this.hasTieMatches);
      let prevTeamScore = this.teams[i - 1].getStat("score", withPredictions, this.hasTieMatches);
      let currentTeamTBWins = this.teams[i].getStat("TBWins", withPredictions, this.hasTieMatches);
      let prevTeamTBWins = this.teams[i - 1].getStat("TBWins", withPredictions, this.hasTieMatches);

      // If the teams' scores are tied 
      if(currentTeamScore == prevTeamScore) {
        // If the current team has the same number of tie breaker wins, 
        // both teams are tied and have the same place value
        if(currentTeamTBWins == prevTeamTBWins)
          this.teams[i].place = this.teams[i - 1].place;
        // Otherwise, calculate the current team's place with any possible duplicates before it
        else 
          this.calcPlaceWithDups(i);
        continue;
      } 
      // Otherwise, calculate the current team's place with any possible duplicates before it
      else {
        this.calcPlaceWithDups(i);
      }
    }
  }

  // Helper func for calculateTeamPlaces()
  calcPlaceWithDups = (index) => {
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

  addScoreToTeam = (team, wins, ties, losses, tieBreakerWins) => {
    for(let i = 0; i < this.teams.length; i++) {
      if(this.teams[i] == team) {
        this.teams[i].wins += wins;
        this.teams[i].ties += ties;
        this.teams[i].losses += losses;
        this.teams[i].tieBreakerWins += tieBreakerWins;
        this.teams[i].calculateTotals();
      }
    }
  }
}

export { 
  Team, 
  Series, 
  Tournament
};
