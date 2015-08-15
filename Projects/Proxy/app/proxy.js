var http = require('http');
var request = require('request');
var proxyResponse = require('./lib/proxyResponse.js');
var config = require('./config/config.js');
var cache = require('./lib/Cache.js').cacheObject('redis');
var utils = require('./lib/utils.js');
var port = process.env.port || 1337;
/*
console.log(cache);
cache.setValue('1','2');
cache.getValue('1',function(error,result){
  console.log(result);
});
cache.getValue('2',function(error,result){
  console.log(result);
});
*/
http.createServer(function (req, res) {
  /*
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('str1' + req.url);
  */
  console.log(req.url);
  if (req.method == 'GET')
  {
    var reqUrlLower = req.url.toLowerCase();
    cache.getValue(reqUrlLower,function(error,result){
      // console.log(result);
      if (result != null) {
        var ctype = utils.getContenttype(result);
        console.log(ctype);
        
        var data = utils.getData(result);
        if (ctype.indexOf('charset=utf-8') > -1){
          res.writeHead(200,{'content-type': ctype});
          res.end(new Buffer(data, 'base64').toString());  
        } else {
          var img = new Buffer(data, 'base64');
          res.writeHead(200, { 'Content-Type': 'image/jpeg',
                              'Content-Length': img.length });
          res.end(img);
        }
          
      } else {
        var destUrl = config.destinationUrl + req.url;
        proxyResponse.CacheDestRes(req,res,destUrl,cache);
        // proxyResponse.redirectToDestination(req,res,destUrl);
      }
      
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Only GET method is supported');
  }
}).listen(port);
console.log('listening to ' + port.toString());
