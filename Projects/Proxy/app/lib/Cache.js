module.exports = {
	cacheObject: function (name) {
		if (name == 'in_memory') {
			return require('./in_memory/in_memory.js');
		} else if (name == 'redis') {
			return undefined;
		} else {
			return undefined;
		}
	}
};
