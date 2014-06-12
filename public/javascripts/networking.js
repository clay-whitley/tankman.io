define(["/socket.io/socket.io.js", "models/game", "models/map", "models/player", "models/enemy", "models/shot", "models/creature"], function(socketio, game, map, player, enemy, shot, creature){
  socket = socketio.connect('http://ec2-54-186-174-23.us-west-2.compute.amazonaws.com');

  socket.on('initialSnapshot', function(data){
    for (i=0; i<data.players.length; i++){
      if (data.players[i].id != socket.id){
        game.players.push(enemy.create(data.players[i]));
      }
    }
  });

  socket.on('reset', function(data){
    document.location.href = "/";
  });

  socket.on('mapData', function(data){
    game.map = map.create(data);
    game.player = player.create();
    socket.emit('newPlayer', game.player.serialize());
    game.player.init(game.map);
  });

  socket.on('creatures', function(data){
    for (var i=0;i<data.creatures.length;i++){
      var newCreature = creature.create({coords: data.creatures[i].coords, id: data.creatures[i].id, isDead: data.creatures[i].isDead});
      game.creatures.push(newCreature);
    }
  });

  socket.on('creaturesUpdate', function(data){
    for (var i=0; i<data.creatures.length;i++){
      game.creatures[i].setCoords(data.creatures[i].coords);
      if (data.creatures[i].isDead && !game.creatures[i].isDead() && data.creatures[i].id == game.creatures[i].getId()){
        game.creatures[i].setDead(true);
      }
    }
  });

  socket.on('pickupPowerup', function(data){
    var cell = game.map.cellAtCoords(data[0], data[1]);
    cell.removePowerup();
  });

  socket.on('snapshot', function(data){
    for (i=0; i<data.players.length; i++){
      for (x=0; x<game.players.length; x++){
        if (data.players[i].id == game.players[x].id()){
          game.players[x].setCoords(data.players[i].coords);
          game.players[x].setOrientation(data.players[i].orientation);
          game.players[x].setHealth(data.players[i].health);
          game.players[x].setDead(data.players[i].isDead);
          game.players[x].setPoints(data.players[i].points);
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

  socket.on('pointBroadcast', function(data){
    if (data.id == socket.socket.sessionid){
      game.player.incrementPoints();
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
