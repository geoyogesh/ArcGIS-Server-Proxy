var cache = require('ioredis').createClient(6379,'127.0.0.1');
module.exports = {
    cache: function () {
        console.log('created...');
    },
    setValue: function (key, value, callback) {
        cache.set(key, value);
    },
    getValue: function (key, callback) {
        cache.get(key,function (err, result) {
  callback(null,result);
});
    },
};