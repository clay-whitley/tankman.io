// Represents a single grid square on the map. Can be various types of terrain.

define(function(){
  return {
    create: makeCell
  };
});

function makeCell(opts){
  type = opts.type;
  map = opts.map;
  coords = opts.coords;
  width = opts.map.pxWidth / opts.map.width;
  height = opts.map.pxHeight / opts.map.height;
  pxCoords = [opts.coords[0] * width, opts.coords[1] * height];
  status = "normal";

  return {
    movable: function(){
      if (this.type == "a") {
      return true;
      } else {
      return false;
      }
    }, draw: function(context){
      if (this.type == "a") {
        context.fillStyle = "#ddd";
      } else if (this.type == "e") {
        context.fillStyle = "#ff0000";
      } else {
        context.fillStyle = "#000";
      }
      context.fillRect(this.pxCoords[0], this.pxCoords[1], this.width, this.height);
    }
  };
}
