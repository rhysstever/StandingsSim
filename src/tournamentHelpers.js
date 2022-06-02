import * as main from "./main.js"

const clearPredictionButtonsClassList = (button1, button2) => {
  button1.classList = 'btn team1 ripple-surface';
  button2.classList = 'btn team1 ripple-surface';
}

const createTournamentDropdown = (id, tabName, isComplete) => {
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

const convertColorToButtonColor = (color) => {
  const colorConverter = {
    "blue": "primary",
    "purple": "secondary",
    "green": "success",
    "red": "danger",
    "yellow": "warning",
    "lightBlue": "info",
    "white": "light",
    "black": "dark"
  }

  return "bg-" + colorConverter[color];
}

export { clearPredictionButtonsClassList, createTournamentDropdown, convertColorToButtonColor }