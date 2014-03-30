define(["models/game"], function(game){

  function update(modifier) {
    if (38 in keysDown) { // Player holding up
      if (game.player.coords()[1] > 0 && !game.player.isDead()){
        game.player.moveUp(modifier);    }
    }
    if (40 in keysDown) { // Player holding down
      if (game.player.coords()[1] + 50 < game.canvas.height && !game.player.isDead()){
        game.player.moveDown(modifier);
      }
    }
    if (37 in keysDown) { // Player holding left
      if (game.player.coords()[0] > 0 && !game.player.isDead()){
        game.player.moveLeft(modifier);
      }
    }
    if (39 in keysDown) { // Player holding right
      if (game.player.coords()[0] + 50 < game.canvas.width && !game.player.isDead()){
        game.player.moveRight(modifier);
      }
    }

    var activeShots = [];

    for (i=0;i<game.shots.length;i++){
      if (game.shots[i].status() == "disabled"){
        // delete game.shots[i].explosion();
        delete game.shots[i]
      } else {
        activeShots.push(game.shots[i])
      }
    }

    game.shots = activeShots;

    if (game.map){
      for (i=0;i<game.map.cells().length;i++){
        if (game.map.cells()[i].type() == "e"){
          if (checkCollision(game.map.cells()[i], game.player) && !game.player.isDead()){
            game.player.takeDamage(1)
            game.player.die()
          }
        }
      }
    }
  }

  function draw(){
    // clear screen
    game.context.clearRect(0,0, game.canvas.width, game.canvas.height);
    // draw background
    game.map.draw(game.context);
    // draw enemies
    for (i=0; i<game.players.length; i++){
      if (!game.players[i].isDead()){
        game.players[i].draw(game.context);
      } 
    }
    // draw player
    if (!game.player.isDead()){
      game.player.draw(game.context);
    }
    // draw explosives
    for (i=0; i<game.shots.length; i++){
      game.shots[i].draw(game.context);
    }
    // draw explosions
    // draw HUD (health and powers)
    game.context.fillStyle = "blue";
    game.context.font = "bold 16px Arial";
    game.context.fillText("Health:" + game.player.health().toString(), game.canvas.width-100, 20);
  }

  function mainLoop() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    draw();

    then = now;
  }

  return {
    mainLoop: mainLoop
  };
});
