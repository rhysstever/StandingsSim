function createTournaments(){
     // Create tournament
     let dpcWestEUS2UppDiv = new Division(
          "DPC Season 2 Western Europe Upper Division",  
          "WEU Upper Div", regions.WEU, "Upper",
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division", true);
     // Add teams to tournament
     dpcWestEUS2UppDiv.addTeam(new Team("Alliance", "[A]", 6, 1, 0));           
     dpcWestEUS2UppDiv.addTeam(new Team("Team Liquid", "TL", 5, 2, 0));         
     dpcWestEUS2UppDiv.addTeam(new Team("Team Nigma", "Nigma", 4, 3, 0));       
     dpcWestEUS2UppDiv.addTeam(new Team("Team Secret", "Secret", 4, 3, 0));
     dpcWestEUS2UppDiv.addTeam(new Team("Tundra Esports", "Tundra", 3, 4, 2));
     dpcWestEUS2UppDiv.addTeam(new Team("OG", "OG", 3, 4, 1));                  
     dpcWestEUS2UppDiv.addTeam(new Team("Brame", "Brame", 3, 4, 0));            
     dpcWestEUS2UppDiv.addTeam(new Team("Hellbear Smashers", "SMASH", 0, 7, 0));
     // Calculate team place values
     dpcWestEUS2UppDiv.sortTeams();
     // Add remaining games
     // No games left
     // Add tournament to tournament list
     tournaments.push(dpcWestEUS2UppDiv);

     // Create tournament
     let dpcNAS2UppDiv = new Division(
          "DPC Season 2 North America Upper Division", 
          "NA Upper Div", regions.NA, "Upper",
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division", true);
     // Add teams to tournament
     dpcNAS2UppDiv.addTeam(new Team("Quincy Crew", "QC", 7, 0, 0));                  
     dpcNAS2UppDiv.addTeam(new Team("Evil Geniuses", "EG", 6, 1, 0));         
     dpcNAS2UppDiv.addTeam(new Team("Undying", "UND", 5, 2, 0));           
     dpcNAS2UppDiv.addTeam(new Team("4 Zoomers", "4Z", 4, 3, 0));
     dpcNAS2UppDiv.addTeam(new Team("simply TOOBASED", "sT", 3, 4, 0));       
     dpcNAS2UppDiv.addTeam(new Team("Black N Yellow", "BNY", 2, 5, 0));            
     dpcNAS2UppDiv.addTeam(new Team("S A D B O Y S", "S A D", 1, 6, 0));
     dpcNAS2UppDiv.addTeam(new Team("The Cut", "Cut", 0, 7, 0));
     // Calculate team place values
     dpcNAS2UppDiv.sortTeams();
     // Add remaining games
     // No games left
     // Add tournament to tournament list
     tournaments.push(dpcNAS2UppDiv);

     // ===== WePlay AniMajor =====
     
     // Create Major
     let animajor = new Major("WePlay AniMajor", "AniMajor",
          "https://liquipedia.net/dota2/WePlay/AniMajor/2021");
     
     // Create tournament
     let animajorWildCard = new WildCard(animajor,  false);
     animajor.wildCard = animajorWildCard;
     // Add teams to tournament
     animajorWildCard.addTeam(new Team("Vici Gaming", "Vici", 0, 0, 0));
     animajorWildCard.addTeam(new Team("Invictus Gaming", "iG", 0, 0, 0));
     animajorWildCard.addTeam(new Team("Execration", "Execration", 0, 0, 0));
     animajorWildCard.addTeam(new Team("AS Monaco Gambit", "Gambit", 0, 0, 0));
     // Add remaining games
     // animajorWildCard.addSeries(new Series("June 2nd", 
     //      animajorWildCard.findTeamByName("Team1"), 
     //      animajorWildCard.findTeamByName("Team2"), false));

     // Create tournament
     let animajorGroupStage = new GroupStage(animajor, false);
     animajor.groupStage = animajorGroupStage;
     // Add teams to tournament         
     animajorGroupStage.addTeam(new Team("PSG.LGD", "PSG.LGD", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("TNC Predator", "TNC", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("Team Spirit", "Team Spirit", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("beastcoast", "beastcoast", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("WildCard_1", "TBD", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("WildCard_2", "TBD", 0, 0, 0));
     // Add remaining games
     // animajorGroupStage.addSeries(new Series("June 4th", 
     //      animajorGroupStage.findTeamByName("Team1"), 
     //      animajorGroupStage.findTeamByName("Team2"), false));
     // Add tournament to tournament list
     
     // Add qualifying tournaments to major
     animajor.addQualifier(regions.WEU, dpcWestEUS2UppDiv);
     animajor.addQualifier(regions.NA, dpcNAS2UppDiv);
     // Add teams to major based on qualifying tournaments
     animajor.addQualifiedTeams();
     
     // (Before schedule released) Loops through and 
     // creates a match between each team
     for(let i = 0; i < animajorWildCard.teams.length - 1; i++){
          for(let j = i + 1; j < animajorWildCard.teams.length; j++){
               animajorWildCard.addSeries(new Series("Looped while waiting for schedule to release:", 
                    animajorWildCard.teams[i], 
                    animajorWildCard.teams[j], false));
          }
     }

     // Sort both wild card and group stage
     animajor.wildCard.sortTeams();
     animajor.groupStage.sortTeams();
     tournaments.push(animajor);

     // ===== End of major =====

     // Add each tournament to the dropdown
     addTournamentOptions();
}

function addTournamentOptions(){
     let dropDownParent = document.querySelector("#tournamentDropDown");
     for(let i = 0; i < tournaments.length; i++){
          if(tournaments[i].type == "Major") {
               let tournamentOptionGS = CreateTournamentDropdown(
                    tournaments[i].wildCard.tabName, i + "majorwc");
               dropDownParent.appendChild(tournamentOptionGS);
               let tournamentOptionWC = CreateTournamentDropdown(
                    tournaments[i].groupStage.tabName, i + "majorgs");
               dropDownParent.appendChild(tournamentOptionWC);
          }
          else {
               let tournamentOption = CreateTournamentDropdown(tournaments[i].tabName, i);
               dropDownParent.appendChild(tournamentOption);
          }
     }
}

function CreateTournamentDropdown(tabName, id) {
     // Creates the list item and button
     let listItem = document.createElement("li");
     let tourneyButton = document.createElement("button");
     // Set attributes of button
     tourneyButton.id = id;
     tourneyButton.classList.add("dropdown-item");
     tourneyButton.type = "button";
     tourneyButton.onclick = tournamentButtonClicked;
     tourneyButton.innerHTML = tabName;
     // Append the button to the listItem and return the list item
     listItem.appendChild(tourneyButton);
     return listItem;
}