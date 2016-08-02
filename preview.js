'use strict';

var pixWidth = 5,
	pixHeight = 2,
	pixSize = 20,
	xOffset = 2,
	yOffset = 2,
	channelOffset = 6,
	subPixSize = 3,
	pixGap = 0,
	subPixGap = 1,
	black = '#121011',
	frame = '#000000';

function showPreview() {
	var canvas = document.getElementById('preview'),
		ctx = canvas.getContext('2d');
	canvas.width = pixSize * width;
	canvas.height = pixSize * height;
	ctx = canvas.getContext('2d');
	// box(0, 0, canvas.width, canvas.height, frame);
	for (var x = 0; x < width; ++x)
		for (var y = 0; y < height; ++y) {
			var pixel = v2[x + y * width];

			// the real way:
			var grid = pixelizer(pixel);
			box(x * pixSize, y * pixSize, pixSize - pixGap, pixSize - pixGap, frame);
			rawPens.forEach((col, i) => {
				for (var py = 0; py < pixHeight; ++py)
					for (var px = 0; px < pixWidth; ++px)
						box(x * pixSize + xOffset + px * subPixSize,
							y * pixSize + yOffset + py * subPixSize + channelOffset * i,
							subPixSize - subPixGap,
							subPixSize - subPixGap,
							grid[i][py][px] ? col : black);
			});
			// the way that works well for small images
			/*box(x * pixSize, y * pixSize, pixSize - pixGap, pixSize - pixGap, black);
			var done = [];
			for (var i = 0; i < pixSize; ++i) done[i] = [];
			for (var c = 0; c < 3; ++c) {
				for (var val = ~~((pixel[c] / 255) * cellsPerPixelColour);
					val > 0; --val) while (true) {
					var px = ~~(Math.random() * pixSize),
						py = ~~(Math.random() * pixSize);
					if (!done[py][px]) {
						box(x * pixSize + px * subPixSize,
							y * pixSize + py * subPixSize,
							subPixSize - subPixGap,
							subPixSize - subPixGap,
							rawPens[c]);
						done[py][px] = true;
						break;
					}
				}
			}*/
		}

	function box(x, y, w, h, colour) {
		ctx.beginPath();
		ctx.fillStyle = colour;
		ctx.rect(x, y, w, h);
		ctx.fill();
	}
}

function topLeftPixelizer(pixel) {
	return pixel.slice(0, 3)
		.map(c => {
			var arr = [];
			for (var y = 0; y < pixHeight; ++y) {
				var row = [];
				for (var x = 0; x < pixWidth; ++x)
					row.push(c --> 0);
				arr.push(row);
			}
			return arr;
		});
}

function randomPixelizer(pixel) {
	return pixel.slice(0, 3)
		.map(c => {
			var arr = [];
			for (var y = 0; y < pixHeight; ++y) {
				var row = [];
				for (var x = 0; x < pixWidth; ++x)
					row.push(false);
				arr.push(row);
			}
			while (c --> 0) while (true) {
				var x = ~~(Math.random() * pixWidth),
					y = ~~(Math.random() * pixHeight);
				if (!arr[y][x]) {
					arr[y][x] = true;
					break;
				}
			}
			return arr;
		});
}

function pixelizer(pixel) {
	return (Math.random() > 0.5
		? topLeftPixelizer
		: randomPixelizer)
			(pixel);
}