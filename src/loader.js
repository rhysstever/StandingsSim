import * as tournaments from "./tournaments.js";
import * as main from "./main.js";

// runs init only after the page is done loaded
window.onload = () => {
  tournaments.createTournaments();
  main.init();
};