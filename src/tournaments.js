import * as classes from "./classes.js";
import * as main from "./main.js";

function createTournaments(){
     // Create tournament
     let dpcWestEUS2UppDiv = new classes.Division(
          "DPC Season 2 Western Europe Upper Division",  
          "WEU Upper Div", classes.regions.WEU, "Upper",
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division", true);
     // Add teams to tournament
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Alliance", "[A]", 6, 1, 0));           
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Liquid", "TL", 5, 2, 0));         
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Nigma", "Nigma", 4, 3, 0));       
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Team Secret", "Secret", 4, 3, 0));
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Tundra Esports", "Tundra", 3, 4, 2));
     dpcWestEUS2UppDiv.addTeam(new classes.Team("OG", "OG", 3, 4, 1));                  
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Brame", "Brame", 3, 4, 0));            
     dpcWestEUS2UppDiv.addTeam(new classes.Team("Hellbear Smashers", "SMASH", 0, 7, 0));
     // Calculate team place values
     dpcWestEUS2UppDiv.sortTeams();
     // Add remaining games
     // No games left
     // Add tournament to tournament list
     main.tournamentsList.push(dpcWestEUS2UppDiv);

     // Create tournament
     let dpcNAS2UppDiv = new classes.Division(
          "DPC Season 2 North America Upper Division", 
          "NA Upper Div", classes.regions.NA, "Upper",
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division", true);
     // Add teams to tournament
     dpcNAS2UppDiv.addTeam(new classes.Team("Quincy Crew", "QC", 7, 0, 0));                  
     dpcNAS2UppDiv.addTeam(new classes.Team("Evil Geniuses", "EG", 6, 1, 0));         
     dpcNAS2UppDiv.addTeam(new classes.Team("Undying", "UND", 5, 2, 0));           
     dpcNAS2UppDiv.addTeam(new classes.Team("4 Zoomers", "4Z", 4, 3, 0));
     dpcNAS2UppDiv.addTeam(new classes.Team("simply TOOBASED", "sT", 3, 4, 0));       
     dpcNAS2UppDiv.addTeam(new classes.Team("Black N Yellow", "BNY", 2, 5, 0));            
     dpcNAS2UppDiv.addTeam(new classes.Team("S A D B O Y S", "S A D", 1, 6, 0));
     dpcNAS2UppDiv.addTeam(new classes.Team("The Cut", "Cut", 0, 7, 0));
     // Calculate team place values
     dpcNAS2UppDiv.sortTeams();
     // Add remaining games
     // No games left
     // Add tournament to tournament list
     main.tournamentsList.push(dpcNAS2UppDiv);

     // ===== WePlay AniMajor =====
     
     // Create Major
     let animajor = new classes.Major("WePlay AniMajor", "AniMajor",
          "https://liquipedia.net/dota2/WePlay/AniMajor/2021");
     
     // Create tournament
     let animajorWildCard = new classes.WildCard(animajor,  false);
     animajor.wildCard = animajorWildCard;
     // Add teams to tournament
     animajorWildCard.addTeam(new classes.Team("Vici Gaming", "Vici", 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("Invictus Gaming", "iG", 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("Execration", "Execration", 0, 0, 0));
     animajorWildCard.addTeam(new classes.Team("AS Monaco Gambit", "Gambit", 0, 0, 0));
     // Add remaining games
     // animajorWildCard.addSeries(new Series("June 2nd", 
     //      animajorWildCard.findTeamByName("Team1"), 
     //      animajorWildCard.findTeamByName("Team2"), false));

     // Create tournament
     let animajorGroupStage = new classes.GroupStage(animajor, false);
     animajor.groupStage = animajorGroupStage;
     // Add teams to tournament         
     animajorGroupStage.addTeam(new classes.Team("PSG.LGD", "PSG.LGD", 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("TNC Predator", "TNC", 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("Team Spirit", "Team Spirit", 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("beastcoast", "beastcoast", 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("WildCard_1", "TBD", 0, 0, 0));
     animajorGroupStage.addTeam(new classes.Team("WildCard_2", "TBD", 0, 0, 0));
     // Add remaining games
     // animajorGroupStage.addSeries(new Series("June 4th", 
     //      animajorGroupStage.findTeamByName("Team1"), 
     //      animajorGroupStage.findTeamByName("Team2"), false));
     // Add tournament to tournament list
     
     // Add qualifying tournaments to major
     animajor.addQualifier(classes.regions.WEU, dpcWestEUS2UppDiv);
     animajor.addQualifier(classes.regions.NA, dpcNAS2UppDiv);
     // Add teams to major based on qualifying tournaments
     animajor.addQualifiedTeams();
     
     // (Before schedule released) Loops through and 
     // creates a match between each team
     for(let i = 0; i < animajorWildCard.teams.length - 1; i++){
          for(let j = i + 1; j < animajorWildCard.teams.length; j++){
               animajorWildCard.addSeries(new classes.Series("Looped while waiting for schedule to release:", 
                    animajorWildCard.teams[i], 
                    animajorWildCard.teams[j], false));
          }
     }

     // Sort both wild card and group stage
     animajor.wildCard.sortTeams();
     animajor.groupStage.sortTeams();
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