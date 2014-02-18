// Map model takes a 2D array representation of the map as input on initialization

function Map(map_array) {
  this.height = map_array.length;
  this.width = map_array[0].length;
  this.array = map_array;
  this.pxHeight = 600;
  this.pxWidth = 950;
  this.cells = [];
  for (y=0;y<map_array.length;y++){
    for (x=0;x<map_array[y].length; x++){
      var cell = cellCreator({coords: [x, y], map: this, type: map_array[y][x]})
      this.cells.push(cell);
    }
  }
}

Map.prototype.draw = function(context){
  for (i=0;i<this.cells.length;i++){
    this.cells[i].draw(context);
  }
};