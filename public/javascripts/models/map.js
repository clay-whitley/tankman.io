define(['./cell'], function(cell){

  function makeMap(map_array) {
    var height = map_array.length;
    var width = map_array[0].length;
    var array = map_array;
    var pxHeight = 750;
    var pxWidth = 1300;
    var cells = [];
    for (y=0;y<map_array.length;y++){
      for (x=0;x<map_array[y].length; x++){
        var new_cell = cell.create({coords: [x, y], pxHeight: pxHeight, pxWidth: pxWidth, width: width, height: height, type: map_array[y][x]});
        cells.push(new_cell);
      }
    }

    return {
      draw: function(context){
        for (i=0;i<cells.length;i++){
          cells[i].draw(context);
        }
      }, cellAtCoords: function(x,y){
        for (i=0;i<cells.length;i++){
          if (cells[i].coords()[1] == y){
            if (cells[i].coords()[0] == x){
              return cells[i];
            }
          }
        }
      }, cells: function(){
        return cells;
      }, pxHeight: function(){
        return pxHeight;
      }, pxWidth: function(){
        return pxWidth;
      }, height: function(){
        return height;
      }, width: function(){
        return width;
      }
    };
  }

  return {
    create: makeMap
  };
});
