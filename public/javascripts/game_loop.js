// Game loop functions

function update(modifier) {
  if (38 in keysDown) { // Player holding up
    if (game.player.coords[1] > 0){
      game.player.coords[1] -= game.player.speed * modifier;
      game.player.orientation = 'up';
    }
  }
  if (40 in keysDown) { // Player holding down
    if (game.player.coords[1] + 50 < game.canvas.height){
      game.player.coords[1] += game.player.speed * modifier;
      game.player.orientation = 'down';
    }
  }
  if (37 in keysDown) { // Player holding left
    if (game.player.coords[0] > 0){
      game.player.coords[0] -= game.player.speed * modifier;
      game.player.orientation = 'left';
    }
  }
  if (39 in keysDown) { // Player holding right
    if (game.player.coords[0] + 50 < game.canvas.width){
      game.player.coords[0] += game.player.speed * modifier;
      game.player.orientation = 'right';
    }
  }
}

function draw(){
  // clear screen
  game.context.clearRect(0,0, game.canvas.width, game.canvas.height);
  // draw background
  // draw enemies
  for (i=0; i<game.players.length; i++){
    game.players[i].draw(game.context);
  }
  // draw player
  game.player.draw(game.context);
  // draw explosives
  // draw explosions
}

function mainLoop() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  draw();

  then = now;
}