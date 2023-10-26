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
            }
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');
            res.write(`<h1>${data || 'No messages yet'}</h1>`); // Display the contents of message.txt
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500; // Internal Server Error
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('An error occurred while saving the message.');
                } else {
                    // Redirect to the root URL after submitting the message
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            });
        });
    }
    // This code should apply to all other routes except '/message'
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3002);
