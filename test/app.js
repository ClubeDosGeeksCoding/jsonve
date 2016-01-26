var view = require('../index');


var http = require("http");
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var test = view.render({
		"head":[
			{
				"meta":{
					"charset":'utf-8'
				}
			},
			{
				"title":{
					"content":"Teste"
				}
			},
			{
				"link":{
					"href":"test.css"
				}
			}
		],
		"body":[
			{
				"div":
				{
					"class":"classe",
					"style": "background:red",
					"content":"Texto",
				},

			},
			{
				"table":{
					"width":"300",
					"border":"1",
					"content":[
						{
							"tr":{
								content:"<td>1</td><td>12</td>"
							}
						},
						{
							"tr":{
								content:"<td>1</td><td>12</td>"
							}
						}
					]
				}
			}
		]
	});
	response.write(test);
	response.end();
})

server.listen(3000);
console.log("Server is listening");

