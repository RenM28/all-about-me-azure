const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

var express = require('express');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// reads files
function serveStaticFile(res, path, contentType, responseCode = 200) {
	// asynchronous method for reading files
	fs.readFile(__dirname + path, (err, data) => {
		if(err) { // server error
			res.writeHead(500, { 'Content-Type': 'text/plain' })
			return res.end('500 - Internal Error') 
		}
		// file sent to client w/ response code
		res.writeHead(responseCode, { 'Content-Type': contentType })
		res.end(data)
	})
}

const server = http.createServer((req,res) => {
	// normalize url
	const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
	switch(path) {
		case '':
			serveStaticFile(res, '/public/all-about-me.html', 'text/html')
			break
		case '/formatting':
			serveStaticFile(res, '/public/formatting.css', 'text/css')
			break
		case '/Me.JPG':
			serveStaticFile(res, '/public/Me.JPG', 'image/JPG')
			break
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404)
			break
	}
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
'press Ctrl-C to terminate....'))
			