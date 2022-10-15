import * as classes from "./classes.js"
import * as main from "./main.js"

// Demos 
import demoStandard from '../data/tournaments/demos/demoStandard.json' assert {type: 'json'}; 
import demoTieable from '../data/tournaments/demos/demoTieable.json' assert {type: 'json'}; 
import demoTiebreakers from '../data/tournaments/demos/demoTiebreakers.json' assert {type: 'json'}; 

// Dota 2 Tournaments
import dpcDiv1CN from '../data/tournaments/dota2/dpcDiv1CN.json' assert {type: 'json'}; 
import dpcDiv1EEU from '../data/tournaments/dota2/dpcDiv1EEU.json' assert {type: 'json'}; 
import dpcDiv1NA from '../data/tournaments/dota2/dpcDiv1NA.json' assert {type: 'json'}; 
import dpcDiv1SA from '../data/tournaments/dota2/dpcDiv1SA.json' assert {type: 'json'}; 
import dpcDiv1SEA from '../data/tournaments/dota2/dpcDiv1SEA.json' assert {type: 'json'}; 
import dpcDiv1WEU from '../data/tournaments/dota2/dpcDivWEU.json' assert {type: 'json'}; 
import arlingtonMajorGroupStageA from '../data/tournaments/dota2/arlingtonGroupStageA.json' assert {type: 'json'}; 
import arlingtonMajorGroupStageB from '../data/tournaments/dota2/arlingtonGroupStageB.json' assert {type: 'json'}; 
import tiGroupStageA from '../data/tournaments/dota2/ti2022GroupStageA.json' assert {type: 'json'};
import tiGroupStageB from '../data/tournaments/dota2/ti2022GroupStageB.json' assert {type: 'json'};

// Color Schemes
import colorSchemeTeams4Top2Bottom2 from '../data/colorSchemes/colorScheme4teamTop2Bottom2.json' assert {type: 'json'}; 
import colorSchemeTeams6Top2Bottom2 from '../data/colorSchemes/colorScheme6teamTop2Bottom2.json' assert {type: 'json'}; 
import colorSchemeTeams8Top2Bottom2 from '../data/colorSchemes/colorScheme8teamTop2Bottom2.json' assert {type: 'json'}; 
import colorSchemeTeams8Top3Bottom2 from '../data/colorSchemes/colorScheme8teamTop3Bottom2.json' assert {type: 'json'}; 
import colorSchemeTeams8Top4Bottom2 from '../data/colorSchemes/colorScheme8teamTop4Bottom2.json' assert {type: 'json'}; 
import colorSchemeTeams9Top4Bottom3 from '../data/colorSchemes/colorScheme9teamTop4Bottom3.json' assert {type: 'json'}; 
import colorSchemeTeams10Top4Bottom2 from '../data/colorSchemes/colorScheme10teamTop4Bottom2.json' assert {type: 'json'}; 

let demos = [];
let tournaments = [];

const loadTournaments = () => {
	// === Create each tournament ===

	// Regional Seasons
	// tournaments.push(createTournament(dpcDiv1CN, colorSchemeTeams8Top4Bottom2));
	// tournaments.push(createTournament(dpcDiv1EEU, colorSchemeTeams8Top3Bottom2));
	// tournaments.push(createTournament(dpcDiv1NA, colorSchemeTeams8Top2Bottom2));
	// tournaments.push(createTournament(dpcDiv1SA, colorSchemeTeams8Top2Bottom2));
	// tournaments.push(createTournament(dpcDiv1SEA, colorSchemeTeams8Top3Bottom2));
	// tournaments.push(createTournament(dpcDiv1WEU, colorSchemeTeams8Top4Bottom2));

	// Major GS
	// tournaments.push(createTournament(arlingtonMajorGroupStageA, colorSchemeTeams9Top4Bottom3));
	// tournaments.push(createTournament(arlingtonMajorGroupStageB, colorSchemeTeams9Top4Bottom3));
	
	// TI Group Stages
	tournaments.push(createTournament(tiGroupStageA, colorSchemeTeams10Top4Bottom2));
	tournaments.push(createTournament(tiGroupStageB, colorSchemeTeams10Top4Bottom2));

	// Create the tournament dropdown
	let tournamentDropdownParent = document.querySelector("#tournamentDropdown");
	for(let i = 0; i < tournaments.length; i++) {
		let id = "TOURNAMENT" + i;
		let tournamentListItem = createTournamentDropdown(id, tournaments[i].tabName, false);
    tournamentDropdownParent.appendChild(tournamentListItem);
	}
}

const loadDemos = () => {
	// load demo tournaments
	demos.push(createTournament(demoStandard, colorSchemeTeams4Top2Bottom2));
	demos.push(createTournament(demoTieable, colorSchemeTeams4Top2Bottom2));
	demos.push(createTournament(demoTiebreakers, colorSchemeTeams4Top2Bottom2));

	// Create demo dropdown
	let demoDropdownParent = document.querySelector("#demoDropdown");
	for(let i = 0; i < demos.length; i++) {
		let id = "DEMO" + i;
		let demoTournamentListItem = createTournamentDropdown(id, demos[i].tabName, false);
    demoDropdownParent.appendChild(demoTournamentListItem);
	}
}

const createTournament = (tournamentJSONData, colorSchemeJSONData) => {
	const newTournamentJSON = tournamentJSONData;

	// Create the tournament
	let newTournament = new classes.Tournament(
		newTournamentJSON.name, 
		newTournamentJSON.tabName,
		newTournamentJSON.source,
		newTournamentJSON.hasTieMatches,
		newTournamentJSON.isComplete,
		colorSchemeJSONData
	);

	// Add the teams
	for(let i = 0; i < newTournamentJSON.teams.length; i++) {
		let newTeam = new classes.Team(
			newTournamentJSON.teams[i].name,
			newTournamentJSON.teams[i].abbrev,
			newTournamentJSON.teams[i].wins,
			newTournamentJSON.teams[i].draws,
			newTournamentJSON.teams[i].losses,
			newTournamentJSON.teams[i].tiebreakerWins);
		newTournament.addTeam(newTeam);
	}

	// Add matches
	for(let i = 0; i < newTournamentJSON.matches.length; i++) {
		// Get the actual team objects 
		let team1 = newTournament.findTeamByName(newTournamentJSON.matches[i].team1);
		let team2 = newTournament.findTeamByName(newTournamentJSON.matches[i].team2);
		// Create the series
		let newSeries = new classes.Series(
			newTournamentJSON.matches[i].date,
			team1,
			team2,
			newTournamentJSON.matches[i].isTiebreaker);
		newTournament.addSeries(newSeries);
	}

	return newTournament;
}

const createTournamentDropdown = (id, tabName, isComplete) => {
  // Creates the list item and button
  let listItem = document.createElement("li");
  let tourneyButton = document.createElement("button");
  // Set attributes of button
  tourneyButton.id = id;
  tourneyButton.classList.add("dropdown-item");
  tourneyButton.type = "button";
  tourneyButton.onclick = main.tournamentButtonClicked;
  tourneyButton.innerHTML = tabName;
  if (isComplete) tourneyButton.innerHTML += " (C)";
  // Append the button to the listItem and return the list item
  listItem.appendChild(tourneyButton);
  return listItem;
}

export { demos, tournaments, loadDemos, loadTournaments }