var v = [], // raw image data
	idealV2, // calibrated exactly
	v2, // calibrated, rounded and clamped to legal range
	v3;

var cellsPerPixelColour = 10;

function startData(multiplier) {
	if (!multiplier)
		multiplier = 1;

	// read the image
	var canvas = document.getElementById('cropped-image'),
		ctx = canvas.getContext('2d'),
		imageData = ctx.getImageData(0, 0, width, height);
	var i = 0;
	for (var x = 0; x < width; ++x)
		for (var y = 0; y < height; ++y) {
			var pixel = [
					imageData.data[i++],
					imageData.data[i++],
					imageData.data[i++]
				];
			i++; // skip alpha
			v.push(pixel.map(v => Math.pow(v / 255, gamma)));
		}

	// generate the data for display
	idealV2 = mmult(v, calibration);
	v2 = idealV2.map(function (p) {
			return p.map(function (v) { return v * multiplier; })
				.map(function (v) {
					return Math.round(v * cellsPerPixelColour);
				})
				.map(function (v) {
					return (v < cellsPerPixelColour)
						? (v > 0) ? v : 0
						: cellsPerPixelColour;
				});
		});
	v3 = mmult(v2.map(function (p) {
			return p
				.map(function (v) { return v / cellsPerPixelColour;});
		}), pens);

	// write the pixel data to the table
	var excel = document.getElementById('numbers');
	i = 0;
	for (var y = 0; y < height; ++y) {
		var rows = [];
		for (var c = 0; c < 3; ++c) {
			var row = document.createElement('tr');
			excel.appendChild(row);
			rows.push(row);
		}
		for (var x = 0; x < width; ++x) {
			var pixel = v2[i++];
			for (var c = 0; c < 3; ++c) {
				var cell = document.createElement('td');
				cell.innerHTML = Math.round(pixel[c]);
				rows[c].appendChild(cell);
			}
		}
	}

	// style the table rows
	// this is a bit quick and dirty but should work well enough
	try {
		var sheet = document.styleSheets[0];
		for (var i = 0; i < 3; ++i) {
			var rule = 'table.pixels tr:nth-child(3n + ' + (i + 1) + ') {' +
					'background: rgba(' + pens[i]
						.map(function(v) { return Math.round(v * 255); })
						.map(function(v) { return (v < 255) ? (v > 0) ? v : 0 : 255; })
						.join(', ') +
					', 0.2) !important;' +
				'}';
			if (sheet.insertRule) sheet.insertRule(rule, sheet.cssRules.length);
			// nonstandard fallback:
			else sheet.addRule(rule, (sheet.cssRules || sheet.rules).length);
		}
		// for (var j = 0; j < document.styleSheets.length; ++j) {
		// 	var rules = document.styleSheets[0].cssRules,
		// 		matcher = /^.*\s+tr:nth-child\(3n\s*\+\s*(\d)\)$/;
		// 	for (var i = 0; i < rules.length; ++i) {
		// 		var rule = rules[i],
		// 			n = rule.selectorText.replace(matcher, '$1');
		// 		if (n == rule.selectorText)
		// 			continue;
		// 		n = parseInt(n, 10) - 1;
		// 		rule.style['background-color'] =
		// 			'rgba(' + pens[n].join(', ') + ', 0.2)';
		// 	}
		// }
	} catch(e) { console.log(e); }

	// show the preview image
	showPreview();
}