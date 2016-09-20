'use strict';

// node modules
const fs = require('fs');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

// npm modules
const cowsay = require('cowsay');

// app modules
const parseBody = require('./lib/parse-body.js');

// module constants
const PORT = process.env.PORT || 3000;
