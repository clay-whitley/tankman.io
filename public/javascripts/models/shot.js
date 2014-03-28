define(['models/game', 'models/explosion'], function(game, explosion){

  function makeShot(opts){
    var height = game.map.pxHeight() / game.map.height();
    var width = game.map.pxWidth() / game.map.width();
    var coords = [opts.coords[0], opts.coords[1]];
    var speed = 1;
    var status = 'active';
    var id = opts.id;
    var direction = opts.direction;
    var pxCoords = [coords[0] * width, coords[1] * height];
    var timer = 0;
    var explosion = false;

    return {
      draw: function(context){
        pxCoords = [coords[0] * width, coords[1] * height];
        console.log(pxCoords, width, height);
        context.fillStyle = '#000';
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
        if (timer >= 130 && !explosion){
          explode();
        }
        if (explosion){
          explosion.draw(context);
        }
        timer++;
      }, explode: function(){
        var opts = {
          center: coords,
          radius: 4,
          shot: this
        };
        explosion = explosion.create(opts);
      }
    }
  }

  return {
    create: makeShot
  };

});
