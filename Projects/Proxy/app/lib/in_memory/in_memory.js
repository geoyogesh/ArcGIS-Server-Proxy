var cache = require('memory-cache');
module.exports = {
    cache: function () {
        console.log('created...');
    },
    setValue: function (key, value, callback) {
        cache.put(key, value);
    },
    getValue: function (key, callback) {
        callback(null, cache.get(key));
    },
};