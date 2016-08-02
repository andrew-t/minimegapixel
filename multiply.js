function mmult(m1, m2) {
	var out = [];
	// go through m1 by row...
	for (var y1 = 0; y1 < m1.length; ++y1) {
		// go through m2 by column...
		out[y1] = [];
		for (var x2 = 0; x2 < m2[0].length; ++x2) {
			// go through the cells of each
			out[y1][x2] = 0;
			for (var i = 0; i < m1[0].length; ++i) {
				out[y1][x2] += m1[y1][i] * m2[i][x2];
			}
		}
	}
	return out;
}