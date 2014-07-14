var Handler = function(socket)
{
	this.socket = socket;
}

// Handler.prototype.sampleDataRequest = function(num, callback)
// {
// 	socket.emit('sample' + num + ' requested');
	
// 	var response = socket.on('sample' + num + ' data', function(data)
// 	{
// 		socket.emit('sample' + num + ' received');
// 	//	console.log(data);
// 		callback(data);
// 	});
// }

Handler.prototype.fileUploadRequest = function(callback)
{
	var response = socket.on('file data', function(data)
	{
		callback(data);
	});
}

Handler.prototype.storedDataRequest = function(name, callback)
{
	socket.emit('stored data requested', name);
	console.log(name);
	
	socket.on(name + ' data', function(data)
	{
		socket.emit(name + ' received');
		callback(data);
	});
}

Handler.prototype.filesList = function(callback)
{
	var response = socket.on('files', function(filesObject)
	{
		callback(filesObject);
	});
}