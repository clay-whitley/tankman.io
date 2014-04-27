// Enemy class

define(["models/game"], function(game){

  function makeEnemy(opts){
    var coords = opts.coords;
    var color = opts.color;
    var id = opts.id;
    var speed = opts.speed;
    var health = opts.health;
    var width = game.map.pxWidth() / game.map.width();
    var height = game.map.pxHeight() / game.map.height();
    var orientation = opts.orientation;
    var pxCoords = [coords[0] * width, coords[1] * height];
    var isDead = opts.isDead || false;
    var points = opts.points || 0;

    return {
      draw: function(context){
        pxCoords = [coords[0] * width, coords[1] * height];
        context.fillStyle = color;
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
        if (orientation == 'up'){
          context.fillRect(pxCoords[0] + 25, pxCoords[1] - 10, 5, 10);
        } else if (orientation == 'down'){
          context.fillRect(pxCoords[0] + 25, pxCoords[1] + 50, 5, 10);
        } else if (orientation == 'left'){
          context.fillRect(pxCoords[0] - 10, pxCoords[1] + 25, 10, 5);
        } else if (orientation == 'right'){
          context.fillRect(pxCoords[0] + 50, pxCoords[1] + 25, 10, 5);
        }
      }, id: function(){
        return id;
      }, setCoords: function(new_coords){
        coords = new_coords;
      }, setOrientation: function(new_orient){
        orientation = new_orient;
      }, setHealth: function(new_health){
        health = new_health;
      }, isDead: function(){
        return isDead;
      }, setDead: function(status){
        isDead = status;
      }, setPoints: function(value){
        points = value;
      }
    };
  }

  return {
    create: makeEnemy
  };
});
