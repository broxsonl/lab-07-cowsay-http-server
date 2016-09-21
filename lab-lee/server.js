'use strict';

// node modules
const http = require('http');
const url = require('url');
const queryString = require('querystring');

// npm modules
const cowsay = require('cowsay');

// app modules
const parseBody = require('./lib/parse-body.js');

// module constants
const PORT = process.env.PORT || 3000;

// module logic
const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);
  console.log('req.url.query', req.url.query);

  if (req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay'){
    if (!req.url.query.text) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      return res.end();
    }

    res.writeHead(200, {
      'Content-Type': 'text/plain'});
    res.write(cowsay.say(req.url.query));
    res.end();
    return;
  }
  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    if (req.url.query.text || req.url.query) {
      parseBody(req, function(err, body){
        if (err) return console.error(err);
        res.write(cowsay.say(body));
        res.end();
      });
      return;
    }
    else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
      return;
    }
  }
  res.statusCode = 404;
  res.write('too bad');
  res.end();
});

server.listen(PORT, function(){
  console.log('server MOO-ving at ', PORT);
});
