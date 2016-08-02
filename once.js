function once(func) {
	var run = false;
	return function() {
		if (run) return;
		run = true;
		func();
	}
}
