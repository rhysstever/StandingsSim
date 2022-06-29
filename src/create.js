const init = () => {
	document.querySelectorAll('.form-outline').forEach((formOutline) => {
		new mdb.Input(formOutline).init();
	});
}

export { 
  init
};