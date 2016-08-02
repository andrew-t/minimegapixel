function flatten(arr, host) {
	if (!host) host = [];
	arr.forEach(function(el) {
		if (el.forEach)
			flatten(el, host);
		else host.push(el);
	});
	return host;
}

function histogram(data, low, high, step) {
	if (!step) step = 1;
	var bins = [{
			low: -Infinity,
			high: low,
			name: 'n < ' + round(low),
			count: 0
		}];
	for (var n = low; n < high; n += step) {
		console.log(low, n, high)
		bins.push({
			low: n,
			high: n + step,
			name: round(n) + ' ≤ n < ' + round(n + step),
			count: 0
		});
	}
	bins.push({
		low: high,
		high: Infinity,
		name: 'n > ' + round(high),
		count: 0
	});
	data.forEach(function (n) {
		for (var binId in bins) {
			var bin = bins[binId];
			if (n < bin.high) {
				++bin.count;
				break;
			}
		}
	});
	return bins;

	function round(n) {
		return Math.round(n * 1000) / 1000;
	}
}