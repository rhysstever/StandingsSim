import * as main from "./main.js";
import * as tournamentsList from "./tournamentsList.js";

// runs init only after the page is done loaded
window.onload = () => {
	tournamentsList.loadTournaments();
	tournamentsList.loadDemos();
  main.init();
};