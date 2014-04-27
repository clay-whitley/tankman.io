define(["models/game", "models/shot"], function(game, shot){

  function makePlayer(){
    var coords = [5,5];
    var color = getRandomColor();
    var orientation = 'down';
    // 100 px per second
    var speed = 15;
    var health = 100;
    var isDead = false;
    var pxCoords, newCoords, width, height, shotCount = 0, maxShots = 1, acceptInput = true,
    shotRadius = 2, points = 0;

    return {
      init: function(map){
        width = map.pxWidth() / map.width();
        height = map.pxHeight() / map.height();
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveLeft: function(modifier){
        newCoords = [coords[0] - 1, coords[1]]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable() && acceptInput){
          coords = newCoords;
          acceptInput = false;
          setTimeout(function(){
            acceptInput = true;
          }, 250);
        }
        orientation = 'left';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveRight: function(modifier){
        newCoords = [coords[0] + 1, coords[1]]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable() && acceptInput){
          coords = newCoords;
          acceptInput = false;
          setTimeout(function(){
            acceptInput = true;
          }, 250);
        }
        orientation = 'right';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveDown: function(modifier){
        var newCoords = [coords[0], coords[1] + 1]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable() && acceptInput){
          coords = newCoords;
          acceptInput = false;
          setTimeout(function(){
            acceptInput = true;
          }, 250);
        }
        orientation = 'down';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveUp: function(modifier){
        var newCoords = [coords[0], coords[1] - 1]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable() && acceptInput){
          coords = newCoords;
          acceptInput = false;
          setTimeout(function(){
            acceptInput = true;
          }, 250);
        }
        orientation = 'up';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, shoot: function(){
        if (orientation == 'down'){
          var position = [coords[0], coords[1]+1];
        } else if (orientation == 'up') {
          var position = [coords[0], coords[1]-1];
        } else if (orientation == 'left') {
          var position = [coords[0]-1, coords[1]];
        } else if (orientation == 'right') {
          var position = [coords[0]+1, coords[1]];
        }
        if (game.map.cellAtCoords(position[0], position[1]).movable() && this.canShoot()){
          var newShot = shot.create({coords: position, id: socket.socket.sessionid, direction: orientation, radius: shotRadius});
          game.shots.push(newShot);
          shotCount++;
          socket.emit('newShot', newShot.serialize());
        }
      }, takeDamage: function(amount){
        health -= amount;
      }, draw: function(context){
        context.fillStyle = color;
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
        if (orientation == 'up'){
          context.fillRect(pxCoords[0] + (width/2), pxCoords[1] - 10, 5, 10);
        } else if (orientation == 'down'){
          context.fillRect(pxCoords[0] + (width/2), pxCoords[1] + height, 5, 10);
        } else if (orientation == 'left'){
          context.fillRect(pxCoords[0] - 10, pxCoords[1] + (height/2), 10, 5);
        } else if (orientation == 'right'){
          context.fillRect(pxCoords[0] + width, pxCoords[1] + (height/2), 10, 5);
        }
      }, health: function(){
        return health;
      }, coords: function(){
        return coords;
      }, serialize: function(){
        return {
          coords: coords,
          color: color,
          orientation: orientation,
          speed: speed,
          health: health,
          isDead: isDead,
          points: points
        }
      }, die: function(){
        isDead = true;
        setTimeout(this.respawn, 3500)
      }, respawn: function(){
        isDead = false;
        coords = [0,0];
        pxCoords = [coords[0] * width, coords[1] * height];
      }, isDead: function(){
        return isDead;
      }, canShoot: function(){
        if (shotCount < maxShots){
          return true;
        }
        return false;
      }, closeShot: function(){
        shotCount--;
      }, pickup: function(powerup){
        console.log('picking up powerup ' + powerup.getName());
        powerup.disable();
        this["increment"+powerup.getProperty()](powerup.getValue());
        socket.emit('pickupPowerup', powerup.getCoords());
      }, incrementshotRadius: function(value){
        shotRadius += value;
      }, incrementmaxShots: function(value){
        maxShots += value;
      }, incrementPoints: function(){
        points++;
      }, getPoints: function(){
        return points;
      }
    };
  }

  return {
    create: makePlayer
  };
});
