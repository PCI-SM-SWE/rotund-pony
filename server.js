var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
			200,
			{"content-type": mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

function serveStatic(response, cache, absPath)
{
	if (cache[absPath])
	{
		sendFile(response, absPath, cache[absPath]);
	} 
	else
	{
		fs.exists(absPath, function(exists)
		{
			if (exists)
			{
				fs.readFile(absPath, function(err, data)
				{
					if (err) 
						send404(response);
					else 
					{
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} 
			else
				send404(response);
		});
	}
}

var server = http.createServer(function(request, response)
{
	var filePath = false;
	
	if (request.url == '/')
		filePath = 'public/index.html';
	else 
		filePath = 'public' + request.url;

	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

function getFile(path, callback) {
	fs.readFile(path,'utf-8', function (err, data) {
		  if (err) throw err;
		  if (typeof callback === "function") {
			  callback(data);
		  }
		});
}

server.listen(4000, function()
{
	console.log("Server listening on port 4000.");
});

// Socket IO begins
var io = require('socket.io')(server);

//function handler(req, res) {
//	fs.readFile(__dirname + '/index.html', function(err, data) {
//		if(err) {
//			res.writeHead(500);
//			return res.end('Error loading index.html');
//		}
//		res.writeHead(200);
//		res.end(data);
//	});
//}

io.on('connection', function(socket)
{
	socket.on('sample1 requested', function(response)
	{
		console.log("Sample 1 requested");
		getFile('./public/sample_data/Charm_City_Circulator_Ridership.csv', function(data)
		{
			socket.emit('sample1 data', data);
		});
	});
	
	socket.on('sample1 received', function(response)
	{
		console.log("Sample 1 sent succesfully");
	});

	socket.on('sample2 requested', function(response)
	{
		console.log("Sample 2 requested");
		getFile('./public/sample_data/pie_chart_sample_data.csv', function(data)
		{
			socket.emit('sample2 data', data);
		});
	});
	
	socket.on('sample2 received', function(response)
	{
		console.log("Sample 2 sent succesfully");
	});

	socket.on('sample3 requested', function(response)
	{
		console.log("Sample 3 requested");
		getFile('./public/sample_data/choropleth_map_sample_data.csv', function(data)
		{
			socket.emit('sample3 data', data);
		});
	});
	
	socket.on('sample3received', function(response)
	{
		console.log("Sample 3 sent succesfully");
	});
//	socket.emit('news', {hello: 'world'});
//	socket.on('my other event', function(data) {
//		console.log(data);
//	});
});

//var chatServer = require('./public/javascripts/server_handler.js');
//chatServer.listen(server);