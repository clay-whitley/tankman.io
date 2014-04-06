define(["models/game"], function(game){

  function makeCreature(opts){
    var coords = [2,6];
    var width = game.map.pxWidth() / game.map.width();
    var height = game.map.pxHeight() / game.map.height();
    var pxCoords = [coords[0] * width, coords[1] * height];
    var color = "#ff7b00";

    return {
      draw: function(context){
        context.fillStyle = color;
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
      }, moveUp: function(){
        var newCoords = [coords[0], coords[1]-1];
        var newCell = game.map.cellAtCoords(newCoords[0], newCoords[1])
        if (newCell && newCell.movable()){
          coords = newCoords;
          pxCoords = [coords[0] * width, coords[1] * height];
        }
      }, moveDown: function(){
        var newCoords = [coords[0], coords[1]+1];
        var newCell = game.map.cellAtCoords(newCoords[0], newCoords[1])
        if (newCell && newCell.movable()){
          coords = newCoords;
          pxCoords = [coords[0] * width, coords[1] * height];
        }
      }, moveRight: function(){
        var newCoords = [coords[0]+1, coords[1]];
        var newCell = game.map.cellAtCoords(newCoords[0], newCoords[1])
        if (newCell && newCell.movable()){
          coords = newCoords;
          pxCoords = [coords[0] * width, coords[1] * height];
        }
      }, moveLeft: function(){
        var newCoords = [coords[0]-1, coords[1]];
        var newCell = game.map.cellAtCoords(newCoords[0], newCoords[1])
        if (newCell && newCell.movable()){
          coords = newCoords;
          pxCoords = [coords[0] * width, coords[1] * height];
        }
      }, init: function(){
        var that = this;
        setInterval(function(){
          var num = Math.floor(Math.random()*4 + 1);
          if (num == 1){
            that.moveUp();
          } else if (num == 2){
            that.moveDown();
          } else if (num == 3){
            that.moveLeft();
          } else if (num == 4) {
            that.moveRight();
          }
        }, 1000);
        return this;
      }
    }
  }

  return {
    create: makeCreature
  };

});
