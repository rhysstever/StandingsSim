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

  // Create TI and add matches to it
  createTI();
  addMatches();
}

function createTI() {
	// Create TI group stage groups 
  // Group A
	let tiGroupStageA = new classes.Tournament(
		"The International 10: Group A", "Group A", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, false);

	// Add teams
  tiGroupStageA.addTeam(new classes.Team("Alliance", "[A]", 1, 0, 2, 0));
  tiGroupStageA.addTeam(new classes.Team("Evil Geniuses", "EG", 2, 0, 1, 0));
  tiGroupStageA.addTeam(new classes.Team("Invictus Gaming", "iG", 2, 1, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("OG", "OG", 2, 1, 0, 0));
  tiGroupStageA.addTeam(new classes.Team("T1", "T1", 0, 0, 2, 0));
  tiGroupStageA.addTeam(new classes.Team("Team Aster", "Aster", 0, 0, 2, 0));
  tiGroupStageA.addTeam(new classes.Team("Undying", "UND", 1, 1, 1, 0));
  tiGroupStageA.addTeam(new classes.Team("Thunder Predator", "TP", 0, 0, 2, 0));
  tiGroupStageA.addTeam(new classes.Team("Virtus.pro", "VP", 2, 1, 0, 0));
  
  // Group B
  let tiGroupStageB = new classes.Tournament(
    "The International 10: Group B", "Group B", classes.regions.GLOBAL, "TI", "None", 
		"https://liquipedia.net/dota2/The_International/2021", true, false);
    
  // Add teams
  tiGroupStageB.addTeam(new classes.Team("Elephant", "Elephant", 1, 1, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Quincy Crew", "QC", 0, 0, 1, 0));
  tiGroupStageB.addTeam(new classes.Team("Team Spirit", "TSpirit", 0, 0, 2, 0));
  tiGroupStageB.addTeam(new classes.Team("Team Secret", "Secret", 1, 0, 1, 0));
  tiGroupStageB.addTeam(new classes.Team("SG e-sports", "SG", 0, 0, 1, 0));
  tiGroupStageB.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 2, 0, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("Vici Gaming", "Vici", 1, 1, 0, 0));
  tiGroupStageB.addTeam(new classes.Team("beastcoast", "bc", 1, 0, 1, 0));
  tiGroupStageB.addTeam(new classes.Team("Fnatic", "Fnatic", 0, 2, 0, 0));

	// Add TI groups to the year
  main.years[YEAR_NUM].tiA = tiGroupStageA;
  main.years[YEAR_NUM].tiB = tiGroupStageB;
}

function addMatches() {
  const groupA = main.years[YEAR_NUM].tiA;
  const groupB = main.years[YEAR_NUM].tiB;

  // Series of October 8th
  // Series B3
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("Secret"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Elephant"), groupB.findTeamByName("Vici"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("QC"), groupB.findTeamByName("bc"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Fnatic"), groupB.findTeamByName("SG"), false));

  // Series A4
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("OG"), groupA.findTeamByName("Aster"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("VP"), groupA.findTeamByName("T1"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("EG"), groupA.findTeamByName("Alliance"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("iG"), groupA.findTeamByName("TP"), false));

  // Series B4
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Elephant"), groupB.findTeamByName("TSpirit"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("Fnatic"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Vici"), groupB.findTeamByName("QC"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Secret"), groupB.findTeamByName("SG"), false));

  // Series A5
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("iG"), groupA.findTeamByName("VP"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("Aster"), groupA.findTeamByName("Alliance"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("UND"), groupA.findTeamByName("TP"), false));
  groupA.addSeries(new classes.Series("October 8th", groupA.findTeamByName("OG"), groupA.findTeamByName("T1"), false));

  // Series B5
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Secret"), groupB.findTeamByName("Elephant"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("Vici"), groupB.findTeamByName("TSpirit"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("bc"), groupB.findTeamByName("SG"), false));
  groupB.addSeries(new classes.Series("October 8th", groupB.findTeamByName("QC"), groupB.findTeamByName("Fnatic"), false));

  // Series of October 9th
  // Series A6
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("EG"), groupA.findTeamByName("OG"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("Aster"), groupA.findTeamByName("T1"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("UND"), groupA.findTeamByName("Alliance"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("VP"), groupA.findTeamByName("TP"), false));

  // Series B6
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("Vici"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("QC"), groupB.findTeamByName("TSpirit"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("bc"), groupB.findTeamByName("Fnatic"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("Elephant"), groupB.findTeamByName("SG"), false));

  // Series A7
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("OG"), groupA.findTeamByName("UND"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("iG"), groupA.findTeamByName("Aster"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("T1"), groupA.findTeamByName("Alliance"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("EG"), groupA.findTeamByName("TP"), false));

  // Series B7
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("Vici"), groupB.findTeamByName("bc"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("TSpirit"), groupB.findTeamByName("Fnatic"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("Secret"), groupB.findTeamByName("QC"), false));
  groupB.addSeries(new classes.Series("October 9th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("SG"), false));

  // Series A8
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("EG"), groupA.findTeamByName("VP"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("iG"), groupA.findTeamByName("Alliance"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("T1"), groupA.findTeamByName("Undying"), false));
  groupA.addSeries(new classes.Series("October 9th", groupA.findTeamByName("Aster"), groupA.findTeamByName("TP"), false));

  // Series of October 10th
  // Series B8
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("Elephant"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("QC"), groupB.findTeamByName("SG"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("TSpirit"), groupB.findTeamByName("bc"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("Secret"), groupB.findTeamByName("Fnatic"), false));

  // Series A9
  groupA.addSeries(new classes.Series("October 10th", groupA.findTeamByName("iG"), groupA.findTeamByName("OG"), false));
  groupA.addSeries(new classes.Series("October 10th", groupA.findTeamByName("EG"), groupA.findTeamByName("UND"), false));
  groupA.addSeries(new classes.Series("October 10th", groupA.findTeamByName("VP"), groupA.findTeamByName("Aster"), false));
  groupA.addSeries(new classes.Series("October 10th", groupA.findTeamByName("T1"), groupA.findTeamByName("TP"), false));

  // Series B9
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("Secret"), groupB.findTeamByName("Vici"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("PSG.LGD"), groupB.findTeamByName("bc"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("Elephant"), groupB.findTeamByName("QC"), false));
  groupB.addSeries(new classes.Series("October 10th", groupB.findTeamByName("TSpirit"), groupB.findTeamByName("SG"), false));
}

export { createYear, createTI }