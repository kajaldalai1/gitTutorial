const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // Read the contents of message.txt and display them
        fs.readFile('message.txt', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('An error occurred while reading the message file.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html>');
                res.write('<head><title>Enter Message</title></head>');
                res.write(`<body>${data || 'No messages yet'}</body>`); // Display the contents of message.txt
                res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>');
                res.write('</html>');
                res.end();
            }
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody>>>>>', parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('An error occurred while saving the message.');
                } else {
                    console.log('inside fs.writeFile');
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(3003, () => {
    console.log('Server is running on port 3003');
});
