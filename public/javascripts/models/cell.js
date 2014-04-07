// Represents a single grid square on the map. Can be various types of terrain.

define(["models/bombup", "models/fireup"], function(bombup, fireup){

  function makeCell(opts){
    var type = opts.type;
    var coords = opts.coords;
    var width = opts.pxWidth / opts.width;
    var height = opts.pxHeight / opts.height;
    var pxCoords = [opts.coords[0] * width, opts.coords[1] * height];
    var status = "normal";
    var powerup = false;

    if (type == "bu"){
      powerup = bombup.create({
        coords: coords,
        height: height,
        width: width
      });
    } else if (type == "fu"){
      powerup = fireup.create({
        coords: coords,
        height: height,
        width: width
      });
    }

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
        } else if (type == "bu" || type == "fu"){
          context.fillStyle = powerup.getColor();
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
      }, serialize: function(){
        return {
          coords: coords,
          type: type
        };
      }
    };
  }

  return {
    create: makeCell
  };
});
