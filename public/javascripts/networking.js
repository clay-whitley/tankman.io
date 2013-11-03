// Networking

socket.on('initialSnapshot', function(data){
  for (i=0; i<data.players.length; i++){
    if (data.players[i].id != socket.id){
      game.players.push(new Enemy(data.players[i]));
    }
  }
});

socket.on('snapshot', function(data){
  for (i=0; i<data.players.length; i++){
    for (x=0; x<game.players.length; x++){
      if (data.players[i].id == game.players[x].id){
        game.players[x].coords = data.players[i].coords;
      }
    }
  }
});

socket.on('newPlayer', function(data){
  game.players.push(new Enemy(data));
});

socket.on('playerLeft', function(id){
  for (i=0; i<game.players.length; i++){
    if (game.players[i].id && game.players[i].id == id){
      game.players.splice(i, 1);
    }
  }
});

setInterval(function(){
  socket.emit('playerUpdate', game.player);
  socket.emit('getSnapshot');
}, 30);