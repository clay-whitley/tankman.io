// Represents a single grid square on the map. Can be various types of terrain.

function Cell(opts){
  this.type = opts.type;
  this.map = opts.map;
  this.coords = opts.coords;
  this.width = opts.map.pxWidth / opts.map.width;
  this.height = opts.map.pxHeight / opts.map.height;
  this.pxCoords = [opts.coords[0] * this.width, opts.coords[1] * this.height];
  this.status = "normal";
}

Cell.prototype.draw = function(context){
  if (this.type == "a") {
    context.fillStyle = "#ddd";
  } else if (this.type == "e") {
    context.fillStyle = "#ff0000";
  } else {
    context.fillStyle = "#000";
  }
  context.fillRect(this.pxCoords[0], this.pxCoords[1], this.width, this.height);
};