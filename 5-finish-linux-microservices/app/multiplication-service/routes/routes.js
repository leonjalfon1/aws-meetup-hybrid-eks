var appRouter = function (app) {

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
	res.status(404).send("Error 404, To use the multiplication service browse to: {server}:{port}/multiplication/{number1}/{number2}");
})
  
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
}

module.exports = appRouter;
