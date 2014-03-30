define(["models/game", "models/shot"], function(game, shot){

  function makePlayer(){
    var coords = [0,0];
    var color = getRandomColor();
    var orientation = 'down';
    // 100 px per second
    var speed = 30;
    var health = 100;
    var isDead = false;
    var pxCoords, width, height;

    return {
      init: function(map){
        width = map.pxWidth() / map.width();
        height = map.pxHeight() / map.height();
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveLeft: function(modifier){
        var newCoords = [coords[0] - Math.floor(speed * modifier), coords[1]]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable()){
          coords = newCoords;
        }
        orientation = 'left';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveRight: function(modifier){
        var newCoords = [coords[0] + Math.floor(speed * modifier), coords[1]]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable()){
          coords = newCoords;
        }
        orientation = 'right';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveDown: function(modifier){
        var newCoords = [coords[0], coords[1] + Math.floor(speed * modifier)]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable()){
          coords = newCoords;
        }
        orientation = 'down';
        pxCoords = [coords[0] * width, coords[1] * height];
      }, moveUp: function(modifier){
        var newCoords = [coords[0], coords[1] - Math.floor(speed * modifier)]
        if (game.map.cellAtCoords(newCoords[0], newCoords[1]).movable()){
          coords = newCoords;
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
        if (game.map.cellAtCoords(position[0], position[1]).movable()){
          var newShot = shot.create({coords: position, id: socket.socket.sessionid, direction: orientation});
          game.shots.push(newShot);
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
          health: health
        }
      }, die: function(){
        isDead = true;
        socket.emit('playerDeath', this.serialize())
        setTimeout(this.respawn, 3500)
      }, respawn: function(){
        isDead = false;
        coords = [0,0];
        pxCoords = [coords[0] * width, coords[1] * height];
      }, isDead: function(){
        return isDead;
      }
    };
  }

  return {
    create: makePlayer
  };
});
