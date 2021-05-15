function createTournaments(){
     // Create tournament
     dpcWestEUS2UppDiv = new Tournament(
          "Season 2 Western Europe Upper Division", 
          "WEU", "Upper", [], [], 
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division");
     // Add games to tournament
     dpcWestEUS2UppDiv.addTeam(new Team("Alliance", "[A]", [6, 1]));           
     dpcWestEUS2UppDiv.addTeam(new Team("Team Liquid", "TL", [4, 2]));         
     dpcWestEUS2UppDiv.addTeam(new Team("Team Nigma", "Nigma", [4, 2]));       
     dpcWestEUS2UppDiv.addTeam(new Team("Brame", "Brame", [3, 3]));            
     dpcWestEUS2UppDiv.addTeam(new Team("OG", "OG", [3, 3]));                  
     dpcWestEUS2UppDiv.addTeam(new Team("Team Secret", "Secret", [3, 3]));
     dpcWestEUS2UppDiv.addTeam(new Team("Tundra Esports", "Tundra", [2, 4]));
     dpcWestEUS2UppDiv.addTeam(new Team("Hellbear Smashers", "SMASH", [0, 7]));
     // Calculate team place values
     dpcWestEUS2UppDiv.sortTeams();
     // Add remaining games
     dpcWestEUS2UppDiv.addSeries(new Series("May 18th", 
          dpcWestEUS2UppDiv.findTeamByName("Secret"), 
          dpcWestEUS2UppDiv.findTeamByName("Brame")));
     dpcWestEUS2UppDiv.addSeries(new Series("May 18th", 
          dpcWestEUS2UppDiv.findTeamByName("Nigma"), 
          dpcWestEUS2UppDiv.findTeamByName("Tundra")));
     dpcWestEUS2UppDiv.addSeries(new Series("May 19th", 
          dpcWestEUS2UppDiv.findTeamByName("Team Liquid"), 
          dpcWestEUS2UppDiv.findTeamByName("OG")));
     // Add tournament to tournament list
     tournaments.push(dpcWestEUS2UppDiv);
     
     // Create tournament
     dpcNAS2UppDiv = new Tournament(
          "Season 2 North America Upper Division", 
          "NA", "Upper", [], [], 
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/North_America/Upper_Division");
     // Add games to tournament
     dpcNAS2UppDiv.addTeam(new Team("Evil Geniuses", "EG", [5, 0]));         
     dpcNAS2UppDiv.addTeam(new Team("Quincy Crew", "QC", [5, 0]));                  
     dpcNAS2UppDiv.addTeam(new Team("Undying", "UND", [5, 1]));           
     dpcNAS2UppDiv.addTeam(new Team("simply TOOBASED", "sT", [3, 3]));       
     dpcNAS2UppDiv.addTeam(new Team("Black N Yellow", "BNY", [2, 3]));            
     dpcNAS2UppDiv.addTeam(new Team("4 Zoomers", "4Z", [2, 3]));
     dpcNAS2UppDiv.addTeam(new Team("S A D B O Y S", "S A D", [1, 6]));
     dpcNAS2UppDiv.addTeam(new Team("The Cut", "Cut", [0, 7]));
     // Calculate team place values
     dpcNAS2UppDiv.sortTeams();
     // Add remaining games
     dpcNAS2UppDiv.addSeries(new Series("May 16th", 
          dpcNAS2UppDiv.findTeamByName("sT"), 
          dpcNAS2UppDiv.findTeamByName("4Z")));
     dpcNAS2UppDiv.addSeries(new Series("May 16th", 
          dpcNAS2UppDiv.findTeamByName("EG"), 
          dpcNAS2UppDiv.findTeamByName("QC")));
     dpcNAS2UppDiv.addSeries(new Series("May 18th", 
          dpcNAS2UppDiv.findTeamByName("BNY"), 
          dpcNAS2UppDiv.findTeamByName("4Z")));
     dpcNAS2UppDiv.addSeries(new Series("May 20th", 
          dpcNAS2UppDiv.findTeamByName("EG"), 
          dpcNAS2UppDiv.findTeamByName("BNY")));
     dpcNAS2UppDiv.addSeries(new Series("May 20th", 
          dpcNAS2UppDiv.findTeamByName("QC"), 
          dpcNAS2UppDiv.findTeamByName("Undying")));
     // Add tournament to tournament list
     tournaments.push(dpcNAS2UppDiv);

     // Add each tournament to the dropdown
     addTournamentOptions();
}

function addTournamentOptions(){
     let dropDownParent = document.querySelector("#tournamentDropDown");
     for(let i = 0; i < tournaments.length; i++){
          let listItem = document.createElement("li");
          // Make the button
          let tourneyButton = document.createElement("button");
          tourneyButton.id = i;
          tourneyButton.classList.add("dropdown-item");
          tourneyButton.type = "button";
          tourneyButton.onclick = tournamentButtonClicked;
          tourneyButton.innerHTML = tournaments[i].region + " " + tournaments[i].division + " Div";
          // Append the button to the list item and the list item to the parent dropdown
          listItem.appendChild(tourneyButton);
          dropDownParent.appendChild(listItem);
     }
}