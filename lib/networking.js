exports.init = function(io, map, creature) {
  var players = [],
  serializedCreatures = [],
  creatures = [],
  idCounter = 0;

  for (y=0;y<map.length;y++){
    for (x=0;x<map[y].length;x++){
      if (map[y][x] == "c"){
        map[y][x] = "a";
        newCreature = creature({
          coords: [x, y],
          map: map,
          id: idCounter
        });
        idCounter++;
        newCreature.init();
        creatures.push(newCreature);
        serializedCreatures.push(newCreature.serialize());
      }
    }
  }

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

    // Receive map updates from client

    socket.on('mapUpdate', function(data){
      map[data.coords[1]][data.coords[0]] = data.type;
    });

    socket.on('pickupPowerup', function(data){
      map[data[1]][data[0]] = 'a';
      socket.broadcast.emit('pickupPowerup', data);
    });

    socket.emit('initialSnapshot', {players: players});

    socket.emit('creatures', {creatures: serializedCreatures});

    setInterval(function(){
      serializedCreatures = [];

      for (var i=0;i<creatures.length;i++){
        serializedCreatures.push(creatures[i].serialize());
      }

      socket.emit('creaturesUpdate', {creatures: serializedCreatures});
    },1000);

    socket.on('creatureDeath', function(data){
      for (var i=0;i<creatures.length;i++){
        if (data.id == creatures[i].getId()){
          creatures[i].die();
        }
      }
    });

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
          players[i].isDead = data.isDead;
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
