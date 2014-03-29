define(["/socket.io/socket.io.js", "models/game", "models/map", "models/player", "models/enemy", "models/shot"], function(socketio, game, map, player, enemy, shot){
  socket = socketio.connect('http://localhost:8080');

  socket.on('initialSnapshot', function(data){
    for (i=0; i<data.players.length; i++){
      if (data.players[i].id != socket.id){
        game.players.push(enemy.create(data.players[i]));
      }
    }
  });

  socket.on('mapData', function(data){
    game.map = map.create(data);
    game.player = player.create();
    socket.emit('newPlayer', game.player.serialize());
    game.player.init(game.map);
  });

  socket.on('snapshot', function(data){
    for (i=0; i<data.players.length; i++){
      for (x=0; x<game.players.length; x++){
        if (data.players[i].id == game.players[x].id()){
          game.players[x].setCoords(data.players[i].coords);
          game.players[x].setOrientation(data.players[i].orientation);
          game.players[x].setHealth(data.players[i].health);
        }
      }
    }
  });

  socket.on('newPlayer', function(data){
    game.players.push(enemy.create(data));
  });

  socket.on('playerLeft', function(id){
    for (i=0; i<game.players.length; i++){
      if (game.players[i].id() && game.players[i].id() == id){
        game.players.splice(i, 1);
      }
    }
  });

  socket.on('newShot', function(data){
    game.shots.push(shot.create(data));
  });

  return {
    startTick: function(){
      setInterval(function(){
        socket.emit('playerUpdate', game.player.serialize());
        socket.emit('getSnapshot');
      }, 30);
    }
  };
});
