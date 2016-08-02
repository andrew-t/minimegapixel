// hardcode gamma for now:
var gamma = 2.2,
	rawPens = [],
	pens,
	calibration;

var startPens = once(function startPens() {
	var pack = document.getElementById('pack'),
		colours = {
			red: document.getElementById('red'),
			green: document.getElementById('green'),
			blue: document.getElementById('blue')
		};
	pack.addEventListener('change', choosePens);
	function choosePens(e) {
		if (e) e.preventDefault;
		var i = 0,
			c = pack.value.split(',');
		for (var key in colours) {
			colours[key].disabled = !!pack.value;
			if (pack.value)
				colours[key].value = '#' + c[i++];
		}
	}
	choosePens();

	document.getElementById('pens-form')
		.addEventListener('submit', function(e) {
			e.preventDefault();
			var i = 0;
			for (var pen in colours)
				rawPens[i++] = colours[pen].value;
			pens = rawPens.map(hex2rgb);
			console.log(JSON.stringify(pens, null, 2));
			calibration = matrix_invert(pens);
			console.log(JSON.stringify(calibration, null, 2));
			nextStep();
		});
});

function hex2rgb(hex) {
	if (hex[0] == '#')
		hex = hex.substr(1);
	let row = [];
	for (let i = 0; i < 3; ++i)
		row.push(Math.pow(
			parseInt(hex.substr(i * 2, 2), 16) / 0xff,
			gamma));
	return row;
}