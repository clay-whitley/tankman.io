
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var networking = require('./lib/networking');
var engine = require('./lib/engine');
var map = require('./lib/maps/sandbox_map.json');
var creature = require('./lib/models/creature');

console.log(map)

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 2);
server.listen(8080);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

networking.init(io, map, creature);
