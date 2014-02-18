// Represents a single grid square on the map. Can be various types of terrain.

function cellCreator(opts) {

  var type = opts.type;
  var map = opts.map;
  var coords = opts.coords;
  var width = opts.map.pxWidth / opts.map.width;
  var height = opts.map.pxHeight / opts.map.height;
  var pxCoords = [opts.coords[0] * width, opts.coords[1] * height];
  var status = "normal";

  return {
    draw: function(context){
      if (type == "a") {
        context.fillStyle = "#ddd";
      } else {
        context.fillStyle = "#000";
      }
      context.fillRect(pxCoords[0], pxCoords[1], width, height);
    }
  }
}

