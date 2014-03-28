// Enemy class

define(function(){

  function makeEnemy(opts){
    var coords = opts.coords;
    var color = opts.color;
    var id = opts.id;
    var speed = opts.speed;
    var health = opts.health;
    var width = game.map.pxWidth / game.map.width;
    var height = game.map.pxHeight / game.map.height;
    var orientation = opts.orientation;
    var pxCoords = [coords[0] * width, coords[1] * height];

    return {
      draw: function(context){
        pxCoords = [coords[0] * width, coords[1] * height];
        context.fillStyle = color;
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
        if (orientation == 'up'){
          context.fillRect(pxCoords[0] + 25, pxCoords[1] - 10, 5, 10);
        } else if (orientation == 'down'){
          context.fillRect(pxCoords[0] + 25, pxCoords[1] + 50, 5, 10);
        } else if (orientation == 'left'){
          context.fillRect(pxCoords[0] - 10, pxCoords[1] + 25, 10, 5);
        } else if (orientation == 'right'){
          context.fillRect(pxCoords[0] + 50, pxCoords[1] + 25, 10, 5);
        }
      }
    };
  }

  return {
    create: makeEnemy
  };
});
