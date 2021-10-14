import * as classes from "../../classes.js"
import * as main from "../../main.js"

const createTournaments = () => {
  // Create China regional qualifier tournament
  let dpcCNUpperDiv = new classes.Division(
    "DPC 2021 Season 2 China Upper Division", "CN Upper Div", classes.regions.CN, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/China/Upper_Division", false, true);

  // Add teams to tournament
  dpcCNUpperDiv.addTeam(new classes.Team("Team Aster", "Aster", 6, 0, 1, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 5, 0, 2, 1));
  dpcCNUpperDiv.addTeam(new classes.Team("Vici Gaming", "Vici", 5, 0, 2, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("Invictus Gaming", "iG", 4, 0, 3, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("Elephant", "Elephant", 3, 0, 4, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("EHOME", "EHOME", 3, 0, 4, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("Royal Never Give Up", "RNG", 2, 0, 5, 0));
  dpcCNUpperDiv.addTeam(new classes.Team("Sparking Arrow Gaming", "SAG", 0, 0, 7, 0));
  
  // Create Eastern Europe regional qualifier tournament
  let dpcEEUUpperDiv = new classes.Division(
    "DPC 2021 Season 2 Eastern Europe Upper Division", "EEU Upper Div", classes.regions.EEU, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/CIS/Upper_Division", false, true);

  // Add teams to tournament
  dpcEEUUpperDiv.addTeam(new classes.Team("Virtus.pro", "VP", 7, 0, 0, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("Team Spirit", "TSpirit", 6, 0, 1, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("AS Monaco Gambit", "Gambit", 4, 0, 3, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("Team Unique", "Unique", 3, 0, 4, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("PuckChamp", "PC", 3, 0, 4, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("Natus Vincere", "Na`Vi", 3, 0, 4, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("Winstrike Team", "Winstrike", 2, 0, 5, 0));
  dpcEEUUpperDiv.addTeam(new classes.Team("EXTREMUM", "EXTR", 0, 0, 7, 0));

  // Create North America regional qualifier tournament
  let dpcNAUpperDiv = new classes.Division(
    "DPC 2021 Season 2 North America Upper Division", "NA Upper Div", classes.regions.NA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division", false, true);

  // Add teams to tournament
  dpcNAUpperDiv.addTeam(new classes.Team("Quincy Crew", "QC", 7, 0, 0, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("Evil Geniuses", "EG", 6, 0, 1, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("Undying", "UND", 5, 0, 2, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("4 Zoomers", "4Z", 4, 0, 3, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("simply TOOBASED", "sT", 3, 0, 4, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("Black N Yellow", "BNY", 2, 0, 5, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("S A D B O Y S", "S A D", 1, 0, 6, 0));
  dpcNAUpperDiv.addTeam(new classes.Team("The Cut", "Cut", 0, 0, 7, 0));

  // Create South America regional qualifier tournament
  let dpcSAUpperDiv = new classes.Division(
    "DPC 2021 Season 2 South America Upper Division", "SA Upper Div", classes.regions.SA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/South_America/Upper_Division", false, true);

  // Add teams to tournament
  dpcSAUpperDiv.addTeam(new classes.Team("NoPing e-sports", "NoPing", 6, 0, 1, 1));
  dpcSAUpperDiv.addTeam(new classes.Team("beastcoast", "bc", 6, 0, 1, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("Thunder Predator", "TP", 5, 0, 2, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("Infamous", "INF", 4, 0, 3, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("Hokori", "HKR", 3, 0, 4, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("SG e-sports", "SG", 2, 0, 5, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("Team Unknown", "UNK", 1, 0, 6, 0));
  dpcSAUpperDiv.addTeam(new classes.Team("Infinity Esports", "Infinity", 1, 0, 6, 0));
  
  // Create Southeast Asia regional qualifier tournament
  let dpcSEAUpperDiv = new classes.Division(
    "DPC 2021 Season 2 Southeast Asia Upper Division", "SEA Upper Div", classes.regions.SEA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Southeast_Asia/Upper_Division", false, true);

  // Add teams to tournament
  dpcSEAUpperDiv.addTeam(new classes.Team("T1", "T1", 5, 0, 2, 1));
  dpcSEAUpperDiv.addTeam(new classes.Team("TNC Predator", "TNC", 5, 0, 2, 0));
  dpcSEAUpperDiv.addTeam(new classes.Team("Execration", "XctN", 4, 0, 3, 1));
  dpcSEAUpperDiv.addTeam(new classes.Team("Fnatic", "Fnatic", 4, 0, 3, 0));
  dpcSEAUpperDiv.addTeam(new classes.Team("OB Esports x Neon", "OB.Neon", 3, 0, 4, 2));
  dpcSEAUpperDiv.addTeam(new classes.Team("Omega Esports", "Omega", 3, 0, 4, 2));
  dpcSEAUpperDiv.addTeam(new classes.Team("BOOM Esports", "BOOM", 3, 0, 4, 1));
  dpcSEAUpperDiv.addTeam(new classes.Team("Lilgun", "Lilgun", 1, 0, 6, 0));

  // Create Western Europe regional qualifier tournament
  let dpcWEUUpperDiv = new classes.Division(
    "DPC 2021 Season 2 Western Europe Upper Division", "WEU Upper Div", classes.regions.WEU, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division", false, true);

  // Add teams to tournament
  dpcWEUUpperDiv.addTeam(new classes.Team("Alliance", "[A]", 6, 0, 1, 0));
  dpcWEUUpperDiv.addTeam(new classes.Team("Team Liquid", "TL", 5, 0, 2, 0));
  dpcWEUUpperDiv.addTeam(new classes.Team("Team Nigma", "Nigma", 4, 0, 3, 0));
  dpcWEUUpperDiv.addTeam(new classes.Team("Team Secret", "Secret", 4, 0, 3, 0));
  dpcWEUUpperDiv.addTeam(new classes.Team("Tundra Esports", "Tundra", 3, 0, 4, 2));
  dpcWEUUpperDiv.addTeam(new classes.Team("OG", "OG", 3, 0, 4, 1));
  dpcWEUUpperDiv.addTeam(new classes.Team("Brame", "Brame", 3, 0, 4, 0));
  dpcWEUUpperDiv.addTeam(new classes.Team("Hellbear Smashers", "SMASH", 0, 0, 7, 0));

  // Create Major
  let major = new classes.Major(
    "WePlay AniMajor", "AniMajor", "https://liquipedia.net/dota2/WePlay/AniMajor/2021");

  // Create Wildcard and add it to the major as its wildcard
  let wildCard = new classes.WildCard(major, 
    "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card", true, true);
	major.wildCard = wildCard;

  // Create Groupstage and add it to the major as its groupstage
  let groupStage = new classes.GroupStage(major,
    "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage", true, true);
	major.groupStage = groupStage;

  // Add qualifying tournaments to major
  major.addQualifier(classes.regions.CN, dpcCNUpperDiv);
  major.addQualifier(classes.regions.WEU, dpcWEUUpperDiv);
  major.addQualifier(classes.regions.EEU, dpcEEUUpperDiv);
  major.addQualifier(classes.regions.SEA, dpcSEAUpperDiv);
  major.addQualifier(classes.regions.NA, dpcNAUpperDiv);
  major.addQualifier(classes.regions.SA, dpcSAUpperDiv);

  // Add teams to major based on qualifying tournaments
  major.addQualifiedTeams();

  // Fill in scores of wild card teams
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("Vici"), 2, 3, 0, 0);
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("Nigma"), 2, 2, 1, 1);
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("iG"), 2, 2, 1, 0);
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("Secret"), 0, 4, 1, 0);
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("XctN"), 0, 4, 1, 0);
  major.wildCard.addScoreToTeam(major.wildCard.findTeamByName("Gambit"), 0, 3, 2, 0);

  // Add wild card teams that qualified to the group stage
  major.addWildCardWinnersToGroupStage();

  // Fill in scores of group stage teams
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("bc"), 0, 3, 4, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("EG"), 1, 5, 1, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("Nigma"), 4, 2, 1, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("PSG.LGD"), 4, 3, 0, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("TL"), 1, 3, 3, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("TNC"), 2, 3, 2, 0);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("TSpirit"), 0, 5, 2, 1);
  major.groupStage.addScoreToTeam(major.groupStage.findTeamByName("Vici"), 2, 4, 1, 0);

  // Add season to list of seasons
  let yearNum = 2021;
  let season = new classes.Season(yearNum, 2, major);
  main.years[yearNum].seasons.push(season);
}

export { createTournaments };