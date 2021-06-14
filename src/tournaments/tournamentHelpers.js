import * as main from "../main.js"

function addSeasonToDropdown(season, dropdownParent) {
  // Add a header for the season
  let seasonHeader = document.createElement("li");
  let seasonHeaderText = document.createElement("h5");
  seasonHeaderText.innerHTML = season.year + " Season " + season.number;
  seasonHeader.appendChild(seasonHeaderText);
  dropdownParent.appendChild(seasonHeader);

  // Add a header for the season's regional qualifiers
  let qualifiersHeader = document.createElement("li");
  let qualifiersHeaderText = document.createElement("h6");
  qualifiersHeaderText.innerHTML = "Regional Qualifiers";
  qualifiersHeader.appendChild(qualifiersHeaderText);
  dropdownParent.appendChild(qualifiersHeader);  

  // Add regional qualifiers
  for(let key in season.major.qualifiers) {
    let qualifier = season.major.qualifiers[key];
    let id = season.year + "S" + season.number + qualifier.region;
    let qualifierItem = createTournamentDropdown(id, qualifier.tabName, qualifier.isComplete)
    dropdownParent.appendChild(qualifierItem);
  }

  // Add a header for the season's major
  let majorHeader = document.createElement("li");
  let majorHeaderText = document.createElement("h6");
  majorHeaderText.innerHTML = season.major.name;
  majorHeader.appendChild(majorHeaderText);
  dropdownParent.appendChild(majorHeader);  
  
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

export { addSeasonToDropdown }