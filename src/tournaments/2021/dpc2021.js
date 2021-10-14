import * as classes from "../../classes.js"
import * as main from "../../main.js"

// Seasons
import * as season2 from "./dpc2021Season2.js"

let YEAR_NUM = 2021;

const createYear = () => {
  // Create year
  let year = new classes.Year(YEAR_NUM);
  main.years[YEAR_NUM] = year;

  // Create Seasons
  season2.createTournaments();

  // Create TI and add matches to it
  createTI();
  addMatches();
}

const createTI = () => {
	// Create TI group stage groups 
  // Group A
	let tiGroupStageA = new classes.Tournament(
		"The International 10: Group A", "Group A", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, true);

	// Add teams
  tiGroupStageA.addTeam(new classes.Team("Alliance", "[A]", 1, 2, 5, 0));
  tiGroupStageA.addTeam(new classes.Team("Evil Geniuses", "EG", 3, 3, 2, 0));
  tiGroupStageA.addTeam(new classes.Team("Invictus Gaming", "iG", 6, 2, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("OG", "OG", 3, 4, 1, 0));
  tiGroupStageA.addTeam(new classes.Team("T1", "T1", 5, 0, 3, 0));
  tiGroupStageA.addTeam(new classes.Team("Team Aster", "Aster", 2, 1, 5, 0));
  tiGroupStageA.addTeam(new classes.Team("Undying", "UND", 1, 2, 5, 0));
  tiGroupStageA.addTeam(new classes.Team("Thunder Predator", "TP", 0, 0, 8, 0));
  tiGroupStageA.addTeam(new classes.Team("Virtus.pro", "VP", 5, 1, 2, 0));
  
  // Group B
  let tiGroupStageB = new classes.Tournament(
    "The International 10: Group B", "Group B", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, true);
    
  // Add teams
  tiGroupStageB.addTeam(new classes.Team("Elephant", "Elephant", 2, 2, 4, 0));
  tiGroupStageB.addTeam(new classes.Team("Quincy Crew", "QC", 2, 2, 4, 0));
  tiGroupStageB.addTeam(new classes.Team("Team Spirit", "TSpirit", 5, 0, 3, 0));
  tiGroupStageB.addTeam(new classes.Team("Team Secret", "Secret", 4, 2, 2, 0));
  tiGroupStageB.addTeam(new classes.Team("SG e-sports", "SG", 1, 0, 7, 0));
  tiGroupStageB.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 7, 1, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Vici Gaming", "Vici", 4, 2, 2, 0));
  tiGroupStageB.addTeam(new classes.Team("beastcoast", "bc", 2, 3, 3, 0));
  tiGroupStageB.addTeam(new classes.Team("Fnatic", "Fnatic", 1, 4, 3, 0));

	// Add TI groups to the year
  main.years[YEAR_NUM].tiA = tiGroupStageA;
  main.years[YEAR_NUM].tiB = tiGroupStageB;
}

const addMatches = () => {
  const groupA = main.years[YEAR_NUM].tiA;
  const groupB = main.years[YEAR_NUM].tiB;

  // Example
  // groupA.addSeries(new classes.Series("October 7th", groupA.findTeamByName("EG"), groupA.findTeamByName("Aster"), false));
}

export { createYear, createTI }