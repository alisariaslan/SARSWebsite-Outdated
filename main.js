//VARIABLES
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var my_date = require('./my_modules/my_date');
var routes = require('./router/router');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(routes);

//ARGV-ARGC
const myArgs = process.argv.slice(2);
if (myArgs.length != 2) 
  return console.log("Yetersiz argüman! (IP,PORT)")
const listen_ip = myArgs[0];
const listen_port = myArgs[1];

//HANDLEBAR
const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//LISTEN
var server = app.listen(listen_port, listen_ip, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(my_date.getdatelog() + 'Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
});

