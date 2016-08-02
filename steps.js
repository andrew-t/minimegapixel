
var step = 1;

document.addEventListener('DOMContentLoaded', function(e) {
	var steps = document.getElementsByClassName('step');
	for (var i = 0; i < steps.length; ++i)
		steps[i].id = 'step-' + (i + 1);
	setStep(1);
});

function setStep(n) {
	step = n;
	for (var element, i = 1;
			element = document.getElementById('step-' + i);
			++i)
		if (i != n)
			element.classList.add('hidden');
		else {
			element.classList.remove('hidden');
			var start = element.getAttribute('data-js');
			if (start) window[start]();
		}
}

function nextStep() {
	setStep(step + 1);
}