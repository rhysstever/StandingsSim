import * as main from "./main.js"
import * as helpers from "./tournaments/tournamentHelpers.js"

// Seasons
import * as dpc2021Season2 from "./tournaments/2021/dpc2021Season2.js"

function createTournaments() {
  // ===== Season creations =====
  dpc2021Season2.createTournaments();

  // ===== End of season creation =====

  // Add a dropdown option for each season
  for(let i = 0; i < main.seasons.length; i++) {
    let dropdownParent = document.querySelector("#tournamentDropDown");

    if(i > 0) {
      // Create a divider between the regional qualifiers and the major
      let dividerContainer = document.createElement("li");
      let divider = document.createElement("hr");
      divider.classList.add("dropdown-divider");
      dividerContainer.appendChild(divider);
      dropdownParent.appendChild(dividerContainer);
    }

    helpers.addSeasonToDropdown(main.seasons[i], dropdownParent);
  }
}

export { createTournaments };