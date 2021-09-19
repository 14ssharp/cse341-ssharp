const fs = require('fs');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {     
        res.setHeader('Conetent-Type', 'text/html');
        res.write("<html>");
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method="POST"><input type="text" name = "message"><button type="submit">send</button></form></body>')
        res.write("</html>");
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err != null) { console.log("Impressive") }            
            });
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }     

    res.setHeader('Conetent-Type', 'text/html');
    res.write("<html>");
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>Hello from my Node.js Server!</body>')
    res.write("</html>");
    return res.end();
    }

    module.exports = requestHandler;