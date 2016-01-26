var view = require('../index');


var http = require("http");
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var test = view.render({
		"head":{
			"meta":[
			{
				"charset":"utf-8"
			}
			],
			"title": "Teste",
			"link":[
			{"href":"teste.css"}
			]
		},
		"body":[
		{
			"div":
			{
				"class":"classe",
				"content":"Texto",
			}
		}
		]
	});
	response.write(test);
	response.end();
})

server.listen(80);
console.log("Server is listening");

