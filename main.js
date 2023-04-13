//ARGV-ARGC
const myArgs = process.argv.slice(2);
if (myArgs.length != 2) 
  return console.log("Yetersiz argüman! (IP,PORT)")
const listen_ip = myArgs[0];
const listen_port = myArgs[1];

//MODULES
var https = require('https');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router/router');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(routes);

//HANDLEBAR
const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//HTTPS SERVER
const server = https.createServer({
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
  address: listen_ip,
  port: listen_port
}, app);

server.listen(443);