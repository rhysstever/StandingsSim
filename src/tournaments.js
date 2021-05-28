import * as classes from "./classes.js";
import * as main from "./main.js";

function createTournaments(){
     // Create tournament
     let dpcWestEUS2UppDiv = new classes.Division(
          "DPC Season 2 Western Europe Upper Division",  
          "WEU Upper Div", classes.regions.WEU, "Upper",
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
     // Calculate team place values
     dpcWestEUS2UppDiv.sortTeams(false);
     // Add tournament to tournament list
     main.tournamentsList.push(dpcWestEUS2UppDiv);

     // Create tournament
     let dpcNAS2UppDiv = new classes.Division(
          "DPC Season 2 North America Upper Division", 
          "NA Upper Div", classes.regions.NA, "Upper",
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
     // Calculate team place values
     dpcNAS2UppDiv.sortTeams(false);
     // Add tournament to tournament list
     main.tournamentsList.push(dpcNAS2UppDiv);

     // ===== WePlay AniMajor =====
     
     // Create Major
     let animajor = new classes.Major("WePlay AniMajor", "AniMajor",
          "https://liquipedia.net/dota2/WePlay/AniMajor/2021");
     
     // Create tournament
     let animajorWildCard = new classes.WildCard(animajor, "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card", true, false);
     animajor.wildCard = animajorWildCard;
     // Add teams to tournament
     animajorWildCard.addTeam(new classes.Team("Vici Gaming", "Vici", 0, 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("Invictus Gaming", "iG", 0, 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("Execration", "XctN", 0, 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("AS Monaco Gambit", "Gambit", 0, 0, 0, 0));

     // Create tournament
     let animajorGroupStage = new classes.GroupStage(animajor, "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage", true, false);
     animajor.groupStage = animajorGroupStage;
     // Add teams to tournament         
     animajorGroupStage.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 0, 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("TNC Predator", "TNC", 0, 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("Team Spirit", "Team Spirit", 0, 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("beastcoast", "beastcoast", 0, 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("WildCard_1", "TBD", 0, 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("WildCard_2", "TBD", 0, 0, 0, 0));

     // Add qualifying tournaments to major
     animajor.addQualifier(classes.regions.WEU, dpcWestEUS2UppDiv);
     animajor.addQualifier(classes.regions.NA, dpcNAS2UppDiv);
     // Add teams to major based on qualifying tournaments
     animajor.addQualifiedTeams();
     
     // Add Wild Card matches
     animajor.wildCard.addSeries(new classes.Series("June 2nd-A", 
          animajor.wildCard.findTeamByName("Secret"), 
          animajor.wildCard.findTeamByName("Gambit"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-A", 
          animajor.wildCard.findTeamByName("XctN"), 
          animajor.wildCard.findTeamByName("iG"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-A", 
          animajor.wildCard.findTeamByName("Vici"), 
          animajor.wildCard.findTeamByName("Secret"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-A", 
          animajor.wildCard.findTeamByName("Nigma"), 
          animajor.wildCard.findTeamByName("iG"), false));

     animajor.wildCard.addSeries(new classes.Series("June 2nd-B", 
          animajor.wildCard.findTeamByName("Vici"), 
          animajor.wildCard.findTeamByName("Nigma"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-B", 
          animajor.wildCard.findTeamByName("Nigma"), 
          animajor.wildCard.findTeamByName("Gambit"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-B", 
          animajor.wildCard.findTeamByName("Gambit"), 
          animajor.wildCard.findTeamByName("XctN"), false));
     animajor.wildCard.addSeries(new classes.Series("June 2nd-B", 
          animajor.wildCard.findTeamByName("XctN"), 
          animajor.wildCard.findTeamByName("Vici"), false));

     animajor.wildCard.addSeries(new classes.Series("June 3rd-A", 
          animajor.wildCard.findTeamByName("Vici"), 
          animajor.wildCard.findTeamByName("Gambit"), false));
     animajor.wildCard.addSeries(new classes.Series("June 3rd-A", 
          animajor.wildCard.findTeamByName("XctN"), 
          animajor.wildCard.findTeamByName("Nigma"), false));
     animajor.wildCard.addSeries(new classes.Series("June 3rd-A", 
          animajor.wildCard.findTeamByName("Nigma"), 
          animajor.wildCard.findTeamByName("Secret"), false));
     animajor.wildCard.addSeries(new classes.Series("June 3rd-A", 
          animajor.wildCard.findTeamByName("iG"), 
          animajor.wildCard.findTeamByName("Secret"), false));

     animajor.wildCard.addSeries(new classes.Series("June 3rd-B", 
          animajor.wildCard.findTeamByName("XctN"), 
          animajor.wildCard.findTeamByName("Secret"), false));
     animajor.wildCard.addSeries(new classes.Series("June 3rd-B", 
          animajor.wildCard.findTeamByName("iG"), 
          animajor.wildCard.findTeamByName("Vici"), false));
     animajor.wildCard.addSeries(new classes.Series("June 3rd-B", 
          animajor.wildCard.findTeamByName("iG"), 
          animajor.wildCard.findTeamByName("Gambit"), false));

     // Sort both wild card and group stage
     animajor.wildCard.sortTeams(true);
     animajor.groupStage.sortTeams(true);
     main.tournamentsList.push(animajor);

     // ===== End of major =====

     // Add each tournament to the dropdown
     addTournamentOptions();
}

function addTournamentOptions(){
     let dropDownParent = document.querySelector("#tournamentDropDown");
     for(let i = 0; i < main.tournamentsList.length; i++){
          if(main.tournamentsList[i].type == "Major") {
               let tournamentOptionGS = createTournamentDropdown(
                    i + "majorwc", main.tournamentsList[i].wildCard.tabName, main.tournamentsList[i].wildCard.isComplete);
               dropDownParent.appendChild(tournamentOptionGS);
               let tournamentOptionWC = createTournamentDropdown(
                    i + "majorgs", main.tournamentsList[i].groupStage.tabName, main.tournamentsList[i].groupStage.isComplete);
               dropDownParent.appendChild(tournamentOptionWC);
          }
          else {
               let tournamentOption = createTournamentDropdown(i, main.tournamentsList[i].tabName, main.tournamentsList[i].isComplete);
               dropDownParent.appendChild(tournamentOption);
          }
     }
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
     if(isComplete)
          tourneyButton.innerHTML += " (C)";
     // Append the button to the listItem and return the list item
     listItem.appendChild(tourneyButton);
     return listItem;
}

export {createTournaments};