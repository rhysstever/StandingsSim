function createTournaments(){
     // Create tournament
     dpcWestEUS2UppDiv = new Tournament(
          "DPC Season 2 Western Europe Upper Division", 
          "WEU Upper Div", "WEU", "Division", "Upper",
          "https://liquipedia.net/dota2/Dota_Pro_Circuit/2021/2/Europe/Upper_Division");
     // Add games to tournament
     dpcWestEUS2UppDiv.addTeam(new Team("Alliance", "[A]", 6, 1, 0));           
     dpcWestEUS2UppDiv.addTeam(new Team("Team Liquid", "TL", 5, 2, 0));         
     dpcWestEUS2UppDiv.addTeam(new Team("Team Nigma", "Nigma", 4, 3, 0));       
     dpcWestEUS2UppDiv.addTeam(new Team("Team Secret", "Secret", 4, 3, 0));
     dpcWestEUS2UppDiv.addTeam(new Team("OG", "OG", 3, 4, 0));                  
     dpcWestEUS2UppDiv.addTeam(new Team("Brame", "Brame", 3, 4, 0));            
     dpcWestEUS2UppDiv.addTeam(new Team("Tundra Esports", "Tundra", 3, 4, 0));
     dpcWestEUS2UppDiv.addTeam(new Team("Hellbear Smashers", "SMASH", 0, 7, 0));
     // Calculate team place values
     dpcWestEUS2UppDiv.sortTeams();
     // Add remaining games
     dpcWestEUS2UppDiv.addSeries(new Series("May 22nd", 
          dpcWestEUS2UppDiv.findTeamByName("Brame"), 
          dpcWestEUS2UppDiv.findTeamByName("OG"), true));
     dpcWestEUS2UppDiv.addSeries(new Series("May 22nd", 
          dpcWestEUS2UppDiv.findTeamByName("OG"), 
          dpcWestEUS2UppDiv.findTeamByName("Tundra"), true));
     dpcWestEUS2UppDiv.addSeries(new Series("May 22nd", 
          dpcWestEUS2UppDiv.findTeamByName("Tundra"), 
          dpcWestEUS2UppDiv.findTeamByName("Brame"), true));
     // Add tournament to tournament list
     tournaments.push(dpcWestEUS2UppDiv);
     
     // Create tournament
     animajorWC = new Tournament(
          "WePlay AniMajor: Wild Card", 
          "AniMajor WC", "Global", "Major", "Wild Card",
          "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Wild_Card");
     // Add games to tournament      
     animajorWC.addTeam(new Team("Team Nigma", "Nigma", 0, 0, 0));
     animajorWC.addTeam(new Team("Team Secret", "Secret", 0, 0, 0));
     animajorWC.addTeam(new Team("CHINA_3", "CHINA_3", 0, 0, 0));
     animajorWC.addTeam(new Team("Invictus Gaming", "iG", 0, 0, 0));
     animajorWC.addTeam(new Team("SEA_3", "SEA_3", 0, 0, 0));
     animajorWC.addTeam(new Team("AS Monaco Gambit", "Gambit", 0, 0, 0));
     // Calculate team place values
     animajorWC.sortTeams();
     // Add remaining games
     // Add tournament to tournament list
     tournaments.push(animajorWC);

     // Create tournament
     animajorGroupStage = new Tournament(
          "WePlay AniMajor: Group Stage", 
          "AniMajor GS", "Global", "Major", "Group Stage",
          "https://liquipedia.net/dota2/WePlay/AniMajor/2021#Group_Stage");
     // Add games to tournament         
     animajorGroupStage.addTeam(new Team("Team Liquid", "TL", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("CHINA_2", "CHINA_2", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("SEA_2", "SEA_2", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("Team Spirit", "Team Spirit", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("Evil Geniuses", "EG", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("SA_2", "SA_2", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("WildCard_1", "WildCard_1", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("WildCard_2", "WildCard_2", 0, 0, 0));
     // Calculate team place values
     animajorGroupStage.sortTeams();
     // Add remaining games
     // Add tournament to tournament list
     tournaments.push(animajorGroupStage);

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
          tourneyButton.innerHTML = tournaments[i].tabName;
          // Append the button to the list item and the list item to the parent dropdown
          listItem.appendChild(tourneyButton);
          dropDownParent.appendChild(listItem);
     }
}