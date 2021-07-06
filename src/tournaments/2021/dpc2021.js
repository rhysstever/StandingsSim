import * as classes from "../../classes.js"
import * as main from "../../main.js"

// Seasons
import * as season2 from "./dpc2021Season2.js"

let YEAR_NUM = 2021;

function createYear() {
  // Create year
  let year = new classes.Year(YEAR_NUM);
  main.years[YEAR_NUM] = year;

  // Create Seasons
  season2.createTournaments();

  // Create TI
  createTI();
}

function createTI() {
	// Create TI group stage groups 
  // Group A
	let tiGroupStageA = new classes.Tournament(
		"The International 10: Group A", "Group A", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, false);

	// Add teams
  tiGroupStageA.addTeam(new classes.Team("Evil Geniuses", "EG", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Quincy Crew", "QC", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Invictus Gaming", "iG", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Team Secret", "Secret", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Team Aster", "Aster", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Alliance", "[A]", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("SG e-sports", "SG", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("Team Spirit", "TSpirit", 0, 0, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("CN_Qualifier", "CN_Q", 0, 0, 0, 0));

  // Group B
  let tiGroupStageB = new classes.Tournament(
		"The International 10: Group B", "Group B", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, false);
  
  // Add teams
	tiGroupStageB.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Virtus.pro", "VP", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("T1", "T1", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Vici Gaming", "Vici", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("beastcoast", "bc", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Thunder Predator", "TP", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Undying", "UND", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("WEU_Qualifier", "WEU_Q", 0, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Fnatic", "Fnatic", 0, 0, 0, 0));

	// Add TI groups to the year
  main.years[YEAR_NUM].tiA = tiGroupStageA;
  main.years[YEAR_NUM].tiB = tiGroupStageB;
}

export { createYear, createTI }