// Map model takes a 2D array representation of the map as input on initialization

function makeMap(map_array) {
  height = map_array.length;
  width = map_array[0].length;
  array = map_array;
  pxHeight = 600;
  pxWidth = 950;
  cells = [];
  for (y=0;y<map_array.length;y++){
    for (x=0;x<map_array[y].length; x++){
      var cell = makeCell({coords: [x, y], map: this, type: map_array[y][x]});
      cells.push(cell);
    }
  }

  return {
    draw: function(context){
      for (i=0;i<this.cells.length;i++){
        this.cells[i].draw(context);
      }
    }, cellAtCoords: function(x,y){
      for (i=0;i<this.cells.length;i++){
        if (this.cells[i].coords[1] == y){
          if (this.cells[i].coords[0] == x){
            return this.cells[i];
          }
        }
      }
    }
  };
}
