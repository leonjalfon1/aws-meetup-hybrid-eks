var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs');

app.use(express.static("."));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	fs.readFile('index.html', function(err, data) {
    res.write(data);
    res.end();
  });
})

exports.stop = function(){
    server.close();
}
var server = app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
