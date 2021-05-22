function createTournaments(){
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
     animajorWC.addTeam(new Team("Execration", "Execration", 0, 0, 0));
     animajorWC.addTeam(new Team("AS Monaco Gambit", "Gambit", 0, 0, 0));
     // Calculate team place values
     animajorWC.sortTeams();
     // Add remaining games
     // animajorWC.addSeries(new Series("June 2nd", 
     //      animajorWC.findTeamByName("Team1"), 
     //      animajorWC.findTeamByName("Team2"), false));
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
     animajorGroupStage.addTeam(new Team("TNC Predator", "TNC", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("Team Spirit", "Team Spirit", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("Evil Geniuses", "EG", 0, 0, 0));
     animajorGroupStage.addTeam(new Team("beastcoast", "beastcoast", 0, 0, 0));
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