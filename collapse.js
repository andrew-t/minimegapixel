document.addEventListener('DOMContentLoaded', function(e) {
	var collapsables = document.getElementsByClassName('collapsable');
	for (var i = 0; i < collapsables.length; ++i) (function(i) {
		var el = collapsables[i],
			header = el.children[0];
		header.addEventListener('click', function(e) {
			el.classList.toggle('collapsed');
			e.preventDefault();
		});
	})(i);
});
