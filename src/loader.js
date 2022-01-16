import * as main from "./main.js";

window.onload = () => {
	// Assign all tournament buttons an onclick event
  let tournamentButtons = document.getElementsByClassName("tournamentButton");
	for(let i = 0; i < tournamentButtons.length; i++) {
		tournamentButtons[i].onclick = main.tournamentButtonClicked;
	}
};