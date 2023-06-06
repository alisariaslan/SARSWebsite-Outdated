//ARGV-ARGC
var myArgs = process.argv.slice(2);
if (myArgs.length < 3)
  console.log('Invalid Args! Example: "node main.js localhost 80 -http');
var listen_ip = myArgs[0];
var listen_port = myArgs[1];
var htt_type = myArgs[2];

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
function start_https() {
  if (myArgs.length < 5) {
    console.log('Invalid Args! Example: "node main.js localhost 80 -https key.ex cert.ex " ')
    return;
  }
  var ssl_key = myArgs[3];
  var ssl_cert = myArgs[4];
  const server = https.createServer({
    key: fs.readFileSync('ssl/' + ssl_key),
    cert: fs.readFileSync('ssl/' + ssl_cert),
    ca: myArgs[5] != null ? fs.readFileSync('ssl/' + myArgs[5]) : null, 
    address: listen_ip,
    port: listen_port
  }, app);
  server.listen(443);
  console.log('Web sunucusu şu adreste çalışmaya başladı -> https://%s:%s', listen_ip, listen_port);
}

function start_http() {
  var server = app.listen(listen_port, listen_ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
  });
}

if (htt_type.includes('-https'))
  start_https();
else if (htt_type.includes('-http'))
  start_http();
else
  console.log('Invalid Args! Example: "node main.js localhost 80 -http / -https');
