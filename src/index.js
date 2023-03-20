const http = require('http');
const { request } = require('https');
const getUsers = require('./modules/users');

const hostname  = '127.0.0.1';
const port = 3000;


const server = http.createServer(function(request, response) {
    const url = new URL(request.url, 'http://127.0.0.1');
    const params = url.searchParams;
    const name = params.get("hello");
    
    if(name) {
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.setHeader("Content-Type", "text/html; charset=utf8");
        response.write(`<h1>Hello, ${name}</h1>`);
        response.end();

        return
    }
    else if(!name & params.has('hello')) {
    response.statusCode = 400;
    response.statusMessage = 'Bad Request';
    response.setHeader("Content-Type", "text/html; charset=utf8");
    response.write("<h1>Enter a name</h1>");
    response.end();

    return
    }
    else if( params.has('users')) {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.header = "application/json";
    response.write(getUsers());
    response.end();

    return
    }

    else if(![...params].length) {
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.setHeader("Content-Type", "text/html; charset=utf8");
        response.write("<h1>Hello, world!</h1>");
        response.end();
    
        return
    }

    else {
        response.statusCode = 500;
        response.statusMessage = 'Internal Server Error';
        response.setHeader("Content-Type", "text/html; charset=utf8");
        response.write(``);
        response.end();
    }
    
})

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`)
});