function makeCreature(opts){
  var coords = opts.coords;

  return {
    moveUp: function(){
      coords = [coords[0], coords[1]-1];
    }, moveDown: function(){
      coords = [coords[0], coords[1]+1];
    }, moveRight: function(){
      coords = [coords[0]-1, coords[1]];
    }, moveLeft: function(){
      coords = [coords[0]+1, coords[1]];
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