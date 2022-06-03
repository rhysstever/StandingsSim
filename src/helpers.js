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

const convertNumberDateToString = (numberDate) => {
  let monthNumber = numberDate.substring(0, 2);
  let dayNumber = numberDate.substring(3);

  const monthConverter = {
    "01": "January",
    "02": "Febuary",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }

  const dayConverter = {
    "01": "1st",
    "02": "2nd",
    "03": "3rd",
    "04": "4th",
    "05": "5th",
    "06": "6th",
    "07": "7th",
    "08": "8th",
    "09": "9th",
    "10": "10th",
    "11": "11th",
    "12": "12th",
    "13": "13th",
    "14": "14th",
    "15": "15th",
    "16": "16th",
    "17": "17th",
    "18": "18th",
    "19": "19th",
    "20": "20th",
    "21": "21st",
    "22": "22nd",
    "23": "23rd",
    "24": "24th",
    "25": "25th",
    "26": "26th",
    "27": "27th",
    "28": "28th",
    "29": "29th",
    "30": "30th",
    "31": "31st",
  }

  return monthConverter[monthNumber] + " " + dayConverter[dayNumber];
}

export { clearPredictionButtonsClassList, createTournamentDropdown, convertNumberDateToString, convertColorToButtonColor }