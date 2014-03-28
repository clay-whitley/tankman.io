// Represents a single grid square on the map. Can be various types of terrain.

define(function(){

  function makeCell(opts){
    var type = opts.type;
    var coords = opts.coords;
    var width = opts.pxWidth / opts.width;
    var height = opts.pxHeight / opts.height;
    var pxCoords = [opts.coords[0] * width, opts.coords[1] * height];
    var status = "normal";

    return {
      movable: function(){
        if (type == "a") {
        return true;
        } else {
        return false;
        }
      }, draw: function(context){
        if (type == "a") {
          context.fillStyle = "#ddd";
        } else if (type == "e") {
          context.fillStyle = "#ff0000";
        } else {
          context.fillStyle = "#111";
        }
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
      }, type: function(){
        return type;
      }, coords: function(){
        return coords;
      }, setType: function(new_type){
        type = new_type;
      }
    };
  }

  return {
    create: makeCell
  };
});
