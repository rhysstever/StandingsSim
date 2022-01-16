import * as main from "./main.js"
import * as tournament from "./tournament.js"

window.onload = () => {
	let currentTournamentID = sessionStorage.getItem("currentTournamentID");
  if(currentTournamentID != 0) {
		console.log(currentTournamentID);
		tournament.loadAPIData(currentTournamentID, true, null);
	}
	else 
		console.log("No Tournament to load: " + currentTournamentID);

	main.init();
};