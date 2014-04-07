function makeCreature(opts){
  var coords = opts.coords,
  map = opts.map;

  return {
    moveUp: function(){
      var newCoords = [coords[0], coords[1]-1];
      if (map[newCoords[1]] && map[newCoords[1]][newCoords[0]]){
        var cell = map[newCoords[1]][newCoords[0]];
        if (cell && (cell == "a" || cell == "fu" || cell == "bu")){
          coords = newCoords;
        }
      }
    }, moveDown: function(){
      var newCoords = [coords[0], coords[1]+1];
      if (map[newCoords[1]] && map[newCoords[1]][newCoords[0]]){
        var cell = map[newCoords[1]][newCoords[0]];
        if (cell && (cell == "a" || cell == "fu" || cell == "bu")){
          coords = newCoords;
        }
      }
    }, moveRight: function(){
      var newCoords = [coords[0]-1, coords[1]];
      if (map[newCoords[1]] && map[newCoords[1]][newCoords[0]]){
        var cell = map[newCoords[1]][newCoords[0]];
        if (cell && (cell == "a" || cell == "fu" || cell == "bu")){
          coords = newCoords;
        }
      }
    }, moveLeft: function(){
      var newCoords = [coords[0]+1, coords[1]];
      if (map[newCoords[1]] && map[newCoords[1]][newCoords[0]]){
        var cell = map[newCoords[1]][newCoords[0]];
        if (cell && (cell == "a" || cell == "fu" || cell == "bu")){
          coords = newCoords;
        }
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
    }, serialize: function(){
      return {
        coords: coords
      };
    }
  }
}

module.exports = makeCreature;