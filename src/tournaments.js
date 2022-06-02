import * as main from "./main.js"
import * as helpers from "./tournaments/tournamentHelpers.js"

// Demos 
import * as demos from "./tournaments/demos/demos.js"

// Years
import * as dpc2021 from "./tournaments/2021/dpc2021.js"

const createTournaments = () => {
  // ===== Create Years ===== 
  dpc2021.createYear();
  // ===== End of Create Years section =====

  // Create Demo Tournaments
  demos.createDemoTournaments();

  let dropdownParent = document.querySelector("#tournamentDropdown");
  let demoDropdownParent = document.querySelector("#demoDropdown");
  
  // === Populate the tournament dropdown ===
  // Loop through each year
  for(var year in main.years) {
    // Add a year header for each year
    let yearHeader = document.createElement("li");
    let yearHeaderText = document.createElement("h5");
    yearHeaderText.innerHTML = year;
    yearHeaderText.classList.add("yearHeader");
    yearHeader.appendChild(yearHeaderText);
    dropdownParent.appendChild(yearHeader);  

    // Add a dropdown option for each season
    for(let s = 0; s < main.years[year].seasons.length; s++) {
      if(s > 0) {
        // Create a divider between seasons
        helpers.createDivider(dropdownParent);
      }

      helpers.addSeasonToDropdown(main.years[year].seasons[s], dropdownParent);
    }

    // Add a header for the year's TI
    let tiHeader = document.createElement("li");
    let tiHeaderText = document.createElement("h5");
    let tiNum = year - 2011;
    tiHeaderText.innerHTML = "TI " + tiNum;
    tiHeaderText.classList.add("seasonHeader");
    tiHeader.appendChild(tiHeaderText);
    dropdownParent.appendChild(tiHeader);  
    
    // Add both TI groups' tournaments
    let tiAID = year + "TIGroupA";
    let tiA = helpers.createTournamentDropdown(tiAID, main.years[year].tiA.tabName, main.years[year].tiA.isComplete);
    dropdownParent.appendChild(tiA);

    let tiBID = year + "TIGroupB";
    let tiB = helpers.createTournamentDropdown(tiBID, main.years[year].tiB.tabName, main.years[year].tiB.isComplete);
    dropdownParent.appendChild(tiB);
  }

  // === Populate the demo dropdown ===
  for(var demoIndex in main.demos) {
    let id = "DEMO" + demoIndex;
    let demoTournament = main.demos[demoIndex];
    let demoTournamentListItem = helpers.createTournamentDropdown(id, demoTournament.tabName, false);
    demoDropdownParent.appendChild(demoTournamentListItem);
  }
}

export { createTournaments }