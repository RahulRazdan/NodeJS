const server = require('http');
const http = server.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Welcome to test NODE application.');
        res.end();
    }

    if(req.url === '/api/customers'){
        res.write(JSON.stringify([{ id:1},{id:2},{id:3}]));
        res.end();
    }
});

http.on ('connection' , (socket) => {
    console.log('New Connection....');
})

http.listen(3000);

console.log('Listening on port 3000....')