module.exports = {
	HeaderToString: function (header) {
		var headerstr = '';
		for (var key in header) {
			headerstr = headerstr + key + ':' + header[key] + ';';
		}
		headerstr = headerstr.length.toString() + ';' + headerstr;
		console.log(headerstr);
		return headerstr;
	},
	getContenttype: function (data) {
		var i = data.indexOf('|');
		return data.substring(0, i);
	},
	getData: function (data) {
		var i = data.indexOf('|');
		return data.substring(i + 1, data.length);
	}
};