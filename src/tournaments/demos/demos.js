import * as classes from "../../classes.js"
import * as main from "../../main.js"

const createDemoTournaments = () => {
	// Basic tournament, with no tieable matches
	createDemoTournamentBasic();
	// Basic tournament, with tieable matches
	createDemoTournamentWithTies();
	// End of tournament, tiebreakers
	createTiebreakerTournament();
}

const createDemoTournamentBasic = () => {
	// Create tournament object
	let basicTourney = new classes.Tournament(
		"Demo Tournament", "Demo Tournament", null, "Demo", null, null, false, false);

	// Create and add teams to the tournament
	basicTourney.addTeam(new classes.Team("Team Alligator", "Team A", 0, 0, 0, 0));
	basicTourney.addTeam(new classes.Team("Team Bear", "Team B", 0, 0, 0, 0));
	basicTourney.addTeam(new classes.Team("Team Cow", "Team C", 0, 0, 0, 0));
	basicTourney.addTeam(new classes.Team("Team Dog", "Team D", 0, 0, 0, 0));

	// Create and add games to the tournament
	basicTourney.addSeries(
		new classes.Series("January 13th", basicTourney.findTeamByName("Team A"), basicTourney.findTeamByName("Team B"), false));

	basicTourney.addSeries(
		new classes.Series("January 13th", basicTourney.findTeamByName("Team C"), basicTourney.findTeamByName("Team D"), false));

	basicTourney.addSeries(
		new classes.Series("January 14th", basicTourney.findTeamByName("Team A"), basicTourney.findTeamByName("Team C"), false));

	basicTourney.addSeries(
		new classes.Series("January 14th", basicTourney.findTeamByName("Team B"), basicTourney.findTeamByName("Team D"), false));
	
	basicTourney.addSeries(
		new classes.Series("January 15th", basicTourney.findTeamByName("Team A"), basicTourney.findTeamByName("Team D"), false));

	basicTourney.addSeries(
		new classes.Series("January 15th", basicTourney.findTeamByName("Team B"), basicTourney.findTeamByName("Team C"), false));

	// Add demo tournament to demo object
	main.demos[0] = basicTourney;
}

const createDemoTournamentWithTies = () => {
	// Create tournament object
	let tieableTourney = new classes.Tournament(
		"Demo Tieable Tournament", "Demo Tieable Tournament", null, "Demo", null, null, true, false);

	// Create and add teams to the tournament
	tieableTourney.addTeam(new classes.Team("Team Alligator", "Team A", 0, 0, 0, 0));
	tieableTourney.addTeam(new classes.Team("Team Bear", "Team B", 0, 0, 0, 0));
	tieableTourney.addTeam(new classes.Team("Team Cow", "Team C", 0, 0, 0, 0));
	tieableTourney.addTeam(new classes.Team("Team Dog", "Team D", 0, 0, 0, 0));

	// Create and add games to the tournament
	tieableTourney.addSeries(
		new classes.Series("January 13th", tieableTourney.findTeamByName("Team A"), tieableTourney.findTeamByName("Team B"), false));

	tieableTourney.addSeries(
		new classes.Series("January 13th", tieableTourney.findTeamByName("Team C"), tieableTourney.findTeamByName("Team D"), false));

	tieableTourney.addSeries(
		new classes.Series("January 14th", tieableTourney.findTeamByName("Team A"), tieableTourney.findTeamByName("Team C"), false));

	tieableTourney.addSeries(
		new classes.Series("January 14th", tieableTourney.findTeamByName("Team B"), tieableTourney.findTeamByName("Team D"), false));
	
	tieableTourney.addSeries(
		new classes.Series("January 15th", tieableTourney.findTeamByName("Team A"), tieableTourney.findTeamByName("Team D"), false));

	tieableTourney.addSeries(
		new classes.Series("January 15th", tieableTourney.findTeamByName("Team B"), tieableTourney.findTeamByName("Team C"), false));

	// Add demo tournament to demo object
	main.demos[1] = tieableTourney;
}

const createTiebreakerTournament = () => {
	// Create tournament object
	let tiebreakerTourney = new classes.Tournament(
		"Demo Tiebreaker Tournament", "Demo TB Tournament", null, "Demo", null, null, false, false);

	// Create and add teams to the tournament
	tiebreakerTourney.addTeam(new classes.Team("Team Alligator", "Team A", 3, 0, 0, 0));
	tiebreakerTourney.addTeam(new classes.Team("Team Bear", "Team B", 1, 0, 2, 0));
	tiebreakerTourney.addTeam(new classes.Team("Team Cow", "Team C", 1, 0, 2, 0));
	tiebreakerTourney.addTeam(new classes.Team("Team Dog", "Team D", 1, 0, 2, 0));

	// Create and add games to the tournament
	tiebreakerTourney.addSeries(
		new classes.Series("January 16th", tiebreakerTourney.findTeamByName("Team B"), tiebreakerTourney.findTeamByName("Team C"), true));

	tiebreakerTourney.addSeries(
		new classes.Series("January 16th", tiebreakerTourney.findTeamByName("Team C"), tiebreakerTourney.findTeamByName("Team D"), true));

	tiebreakerTourney.addSeries(
		new classes.Series("January 16th", tiebreakerTourney.findTeamByName("Team D"), tiebreakerTourney.findTeamByName("Team B"), true));

	// Add demo tournament to demo object
	main.demos[2] = tiebreakerTourney;
}

export { createDemoTournaments }