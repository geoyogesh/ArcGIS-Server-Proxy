var request = require('request').defaults({ encoding: null });
module.exports = {
        redirectToDestination: function (req,res, destUrl) {
                var options = {
                        headers: req.headers,
                        url: destUrl
                };
                req.pipe(request(options)).pipe(res);
        },
        CacheDestRes: function (req,res, destUrl,cache){
                
                var options = {
                        /*headers: req.headers,*/
                        url: destUrl
                };
                console.log(destUrl);
                //console.log('no clue');
                
                request(options,function(error, response, body){
                        if (!error && response.statusCode == 200) {
                                cache.setValue(req.url, response.headers['content-type'] +'|'+ new Buffer(body).toString('base64'));
                                console.log('cached') 
                                res.writeHead(200);
                                res.end(body);
                        }
                        else{
                                res.writeHead(405, { 'Content-Type': 'text/plain' });
                                res.end('unknoen error');
                        }
                }) //.pipe(res)
        }
};