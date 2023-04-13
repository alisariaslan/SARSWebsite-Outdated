//ARGV-ARGC
const myArgs = process.argv.slice(2);
if (myArgs.length != 3)
  return console.log("Yetersiz argüman! (IP,PORT,TYPE)")
const listen_ip = myArgs[0];
const listen_port = myArgs[1];
const selection = myArgs[2];

//MODULES
var http = require('http');
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
function start_https() {
  const server = https.createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    address: listen_ip,
    port: listen_port
  }, app);
  server.listen(443);
  console.log('Web sunucusu şu adreste çalışmaya başladı -> https://%s:%s', listen_ip, listen_port);
}

function start_http()
{
  var server = app.listen(listen_port, listen_ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
  });
}

if(selection.includes('https'))
  start_https();
else
  start_http();

