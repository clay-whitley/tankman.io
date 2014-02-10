// Map model takes a 2D array representation of the map as input on initialization

function Map(map_array) {
  this.height = map_array.length;
  this.width = map_array[0].length;
  this.array = map_array;
  this.pxHeight = 400;
  this.pxWidth = 900;
  this.cells = [];
  for (y=0;y<map_array.length;y++){
    for (x=0;x<y.length; x++){
      this.cells.push(new Cell({coords: [x, y], map: this, type: y[x]}));
    }
  }
}

Map.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.fillRect(this.coords[0], this.coords[1], this.width, this.height);
};