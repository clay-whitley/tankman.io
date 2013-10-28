
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

// all environments
app.set('port', process.env.PORT || 3000);
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

var players = [];

io.sockets.on('connection', function(socket){

  socket.on('identify', function(identity){
    socket.set('identity', identity, function(){
      socket.emit('identified');
    });
  });

  socket.on('message', function(data){
    socket.get('identity', function(err, name){
      socket.broadcast.emit('sentMessage', {
        sender: name,
        message: data
      });
    });
  });

  socket.emit('initialSnapshot', {players: players});

  socket.on('newPlayer', function(data){
    data.id = socket.id;
    players.push(data);
    socket.broadcast.emit('newPlayer', data);
  });

  socket.on('getSnapshot', function(){
    socket.emit('snapshot', {players: players});
  });

  socket.on('playerUpdate', function(data){
    for (i=0; i<players.length; i++){
      if (players[i] && players[i].id == socket.id){
        players[i].coords = data.coords;
      }
    }
  });

  socket.on('disconnect', function(){
    var disconnected;
    for (i=0; i<players.length; i++){
      if (players[i].id == socket.id){
        socket.broadcast.emit('playerLeft', socket.id);
        players.splice(i, 1);
      }
    }
  });
});
