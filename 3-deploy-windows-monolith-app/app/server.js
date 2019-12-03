var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/division/:number1/:number2", function(req,res) {
  var number1 = parseInt(req.params.number1);
  var number2 = parseInt(req.params.number2);
  var total = number1 / number2;

var body = {
  "first-number": number1,
  "second-number": number2,
  "operation": "division",
  "total": total
}

return res.status(200).end(JSON.stringify(body));

});

app.get("/multiplication/:number1/:number2", function(req,res) {
  var number1 = parseInt(req.params.number1);
  var number2 = parseInt(req.params.number2);
  var total = number1 * number2;

var body = {
  "first-number": number1,
  "second-number": number2,
  "operation": "multiplication",
  "total": total
}

return res.status(200).end(JSON.stringify(body));

});

app.get("/subtraction/:number1/:number2", function(req,res) {
  var number1 = parseInt(req.params.number1);
  var number2 = parseInt(req.params.number2);
  var total = number1 - number2;

var body = {
  "first-number": number1,
  "second-number": number2,
  "operation": "subtraction",
  "total": total
}

return res.status(200).end(JSON.stringify(body));

});

app.get("/sum/:number1/:number2", function(req,res) {
  var number1 = parseInt(req.params.number1);
  var number2 = parseInt(req.params.number2);
  var total = number1 + number2;

var body = {
  "first-number": number1,
  "second-number": number2,
  "operation": "sum",
  "total": total
}

return res.status(200).end(JSON.stringify(body));
  
});

exports.stop = function(){
    server.close();
}

var server = app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
