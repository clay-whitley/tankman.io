exports.init = function(io, map) {
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

    // Send map data to the JS client

    socket.emit('mapData', map);

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
          players[i].orientation = data.orientation;
          players[i].health = data.health;
        }
      }
    });

    socket.on('newShot', function(data){
      socket.broadcast.emit('newShot', data);
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
};