import * as classes from "./classes.js";
import * as main from "./main.js";

function createTournaments() {
  // Create tournament
  let dpcChinaS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 China Upper Division", "CN Upper Div", classes.regions.CN, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/China/Upper_Division", false, true);

  // Add teams to tournament
  dpcChinaS2UppDiv.addTeam(new classes.Team("Team Aster", "Aster", 6, 0, 1, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 5, 0, 2, 1));
  dpcChinaS2UppDiv.addTeam(new classes.Team("Vici Gaming", "Vici", 5, 0, 2, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("Invictus Gaming", "iG", 4, 0, 3, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("Elephant", "Elephant", 3, 0, 4, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("EHOME", "EHOME", 3, 0, 4, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("Royal Never Give Up", "RNG", 2, 0, 5, 0));
  dpcChinaS2UppDiv.addTeam(new classes.Team("Sparking Arrow Gaming", "SAG", 0, 0, 7, 0));

  // Create tournament
  let dpcWestEUS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 Western Europe Upper Division", "WEU Upper Div", classes.regions.WEU, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division", false, true);

  // Add teams to tournament
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Alliance", "[A]", 6, 0, 1, 0));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Liquid", "TL", 5, 0, 2, 0));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Nigma", "Nigma", 4, 0, 3, 0));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Secret", "Secret", 4, 0, 3, 0));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Tundra Esports", "Tundra", 3, 0, 4, 2));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("OG", "OG", 3, 0, 4, 1));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Brame", "Brame", 3, 0, 4, 0));
  dpcWestEUS2UppDiv.addTeam(new classes.Team("Hellbear Smashers", "SMASH", 0, 0, 7, 0));
  
  // Create tournament
  let dpcEEUS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 Eastern Europe Upper Division", "EEU Upper Div", classes.regions.EEU, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/CIS/Upper_Division", false, true);

  // Add teams to tournament
  dpcEEUS2UppDiv.addTeam(new classes.Team("Virtus.pro", "VP", 7, 0, 0, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("Team Spirit", "TSpirit", 6, 0, 1, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("AS Monaco Gambit", "Gambit", 4, 0, 3, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("Team Unique", "Unique", 3, 0, 4, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("PuckChamp", "PC", 3, 0, 4, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("Natus Vincere", "Na`Vi", 3, 0, 4, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("Winstrike Team", "Winstrike", 2, 0, 5, 0));
  dpcEEUS2UppDiv.addTeam(new classes.Team("EXTREMUM", "EXTR", 0, 0, 7, 0));
  
  // Create tournament
  let dpcSEAS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 Southeast Asia Upper Division", "SEA Upper Div", classes.regions.SEA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Southeast_Asia/Upper_Division", false, true);

  // Add teams to tournament
  dpcSEAS2UppDiv.addTeam(new classes.Team("T1", "T1", 5, 0, 2, 1));
  dpcSEAS2UppDiv.addTeam(new classes.Team("TNC Predator", "TNC", 5, 0, 2, 0));
  dpcSEAS2UppDiv.addTeam(new classes.Team("Execration", "XctN", 4, 0, 3, 1));
  dpcSEAS2UppDiv.addTeam(new classes.Team("Fnatic", "Fnatic", 4, 0, 3, 0));
  dpcSEAS2UppDiv.addTeam(new classes.Team("OB Esports x Neon", "OB.Neon", 3, 0, 4, 2));
  dpcSEAS2UppDiv.addTeam(new classes.Team("Omega Esports", "Omega", 3, 0, 4, 2));
  dpcSEAS2UppDiv.addTeam(new classes.Team("BOOM Esports", "BOOM", 3, 0, 4, 1));
  dpcSEAS2UppDiv.addTeam(new classes.Team("Lilgun", "Lilgun", 1, 0, 6, 0));

  // Create tournament
  let dpcNAS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 North America Upper Division", "NA Upper Div", classes.regions.NA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division", false, true);

  // Add teams to tournament
  dpcNAS2UppDiv.addTeam(new classes.Team("Quincy Crew", "QC", 7, 0, 0, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("Evil Geniuses", "EG", 6, 0, 1, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("Undying", "UND", 5, 0, 2, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("4 Zoomers", "4Z", 4, 0, 3, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("simply TOOBASED", "sT", 3, 0, 4, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("Black N Yellow", "BNY", 2, 0, 5, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("S A D B O Y S", "S A D", 1, 0, 6, 0));
  dpcNAS2UppDiv.addTeam(new classes.Team("The Cut", "Cut", 0, 0, 7, 0));

  // Create tournament
  let dpcSAS2UppDiv = new classes.Division(
    "DPC 2021 Season 2 South America Upper Division", "SA Upper Div", classes.regions.SA, "Upper",
    "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/South_America/Upper_Division", false, true);

  // Add teams to tournament
  dpcSAS2UppDiv.addTeam(new classes.Team("NoPing e-sports", "NoPing", 6, 0, 1, 1));
  dpcSAS2UppDiv.addTeam(new classes.Team("beastcoast", "bc", 6, 0, 1, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("Thunder Predator", "TP", 5, 0, 2, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("Infamous", "INF", 4, 0, 3, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("Hokori", "HKR", 3, 0, 4, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("SG e-sports", "SG", 2, 0, 5, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("Team Unknown", "UNK", 1, 0, 6, 0));
  dpcSAS2UppDiv.addTeam(new classes.Team("Infinity Esports", "Infinity", 1, 0, 6, 0));

  // ===== WePlay AniMajor =====

  // Create Major
  let animajor = new classes.Major(
    "WePlay AniMajor", "AniMajor", "https://liquipedia.net/dota2/WePlay/AniMajor/2021");

  // Create Wildcard and add it to the major as its wildcard
  let animajorWildCard = new classes.WildCard(animajor, 
    "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card", true, true);
  animajor.wildCard = animajorWildCard;

  // Create Groupstage and add it to the major as its groupstage
  let animajorGroupStage = new classes.GroupStage(animajor,
    "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage", true, true);
  animajor.groupStage = animajorGroupStage;

  // Add qualifying tournaments to major
  animajor.addQualifier(classes.regions.CN, dpcChinaS2UppDiv);
  animajor.addQualifier(classes.regions.WEU, dpcWestEUS2UppDiv);
  animajor.addQualifier(classes.regions.EEU, dpcEEUS2UppDiv);
  animajor.addQualifier(classes.regions.SEA, dpcSEAS2UppDiv);
  animajor.addQualifier(classes.regions.NA, dpcNAS2UppDiv);
  animajor.addQualifier(classes.regions.SA, dpcSAS2UppDiv);

  // Add teams to major based on qualifying tournaments
  animajor.addQualifiedTeams();

  // Fill in scores of wild card teams
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("Vici"), 2, 3, 0, 0);
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("Nigma"), 2, 2, 1, 1);
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("iG"), 2, 2, 1, 0);
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("Secret"), 0, 4, 1, 0);
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("XctN"), 0, 4, 1, 0);
  animajor.wildCard.addScoreToTeam(animajor.wildCard.findTeamByName("Gambit"), 0, 3, 2, 0);

  // Add wild card teams that qualified to the group stage
  animajor.addWildCardWinnersToGroupStage();

  // Fill in scores of group stage teams
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("bc"), 0, 3, 4, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("EG"), 1, 5, 1, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("Nigma"), 4, 2, 1, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("PSG.LGD"), 4, 3, 0, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("TL"), 1, 3, 3, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("TNC"), 2, 3, 2, 0);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("TSpirit"), 0, 5, 2, 1);
  animajor.groupStage.addScoreToTeam(animajor.groupStage.findTeamByName("Vici"), 2, 4, 1, 0);

  // ===== End of AniMajor code =====

  main.seasons.push(new classes.Season("2021", 2, animajor));

  // Add a dropdown option for each season
  for(let i = 0; i < main.seasons.length; i++)
    addSeasonToDropdown(main.seasons[i]);
}

function addSeasonToDropdown(season) {
  let dropdownParent = document.querySelector("#tournamentDropDown");

  // Add regional qualifiers
  for(let key in season.major.qualifiers) {
    let qualifier = season.major.qualifiers[key];
    let id = season.year + "S" + season.number + qualifier.region;
    let qualifierItem = createTournamentDropdown(id, qualifier.tabName, qualifier.isComplete)
    dropdownParent.appendChild(qualifierItem);
  }

  // Create a divider between the regional qualifiers and the major
  let dividerContainer = document.createElement("li");
  let divider = document.createElement("hr");
  divider.classList.add("dropdown-divider");
  dividerContainer.appendChild(divider);
  dropdownParent.appendChild(dividerContainer);

  // Add major group stage and wild card tournaments
  let wildCardID = season.year + "S" + season.number + "WildCard";
  let wildCard = createTournamentDropdown(wildCardID, season.major.wildCard.tabName, season.major.wildCard.isComplete);
  dropdownParent.appendChild(wildCard);

  let groupStageID = season.year + "S" + season.number + "GroupStage";
  let groupStage = createTournamentDropdown(groupStageID, season.major.groupStage.tabName, season.major.groupStage.isComplete);
  dropdownParent.appendChild(groupStage);
}

function createTournamentDropdown(id, tabName, isComplete) {
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

export { createTournaments };