function startWindow() {
	document.getElementById('window-form')
		.addEventListener('submit', function(e) {
			// this is the global JS window, not the user's actual physical pane of glass.
			window.width = parseInt(document.getElementById('width').value, 10);
			window.height = parseInt(document.getElementById('height').value, 10);
			e.preventDefault();
			nextStep();
		});
}