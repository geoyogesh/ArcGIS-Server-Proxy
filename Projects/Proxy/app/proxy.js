
var http = require('http');
var request = require('request');
var config = require('./config/config.js');

console.log(config.managerUrl);

var port = process.env.port || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('str1' + req.url);
}).listen(port);
console.log('listening to ' + port.toString());
