define(['models/game', 'models/explosion'], function(game, explosion_module){

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
    var radius = opts.radius;

    return {
      draw: function(context){
        pxCoords = [coords[0] * width, coords[1] * height];
        context.fillStyle = '#000';
        context.fillRect(pxCoords[0], pxCoords[1], width, height);
        if (timer >= 130 && !explosion){
          this.explode();
        }
        if (explosion){
          explosion.draw(context);
        }
        timer++;
      }, explode: function(){
        var opts = {
          center: coords,
          radius: radius,
          shot: this
        };
        explosion = explosion_module.create(opts);
      }, disable: function(){
        status = 'disabled';
        game.player.closeShot();
      }, explosion: function(){
        return explosion;
      }, status: function(){
        return status;
      }, serialize: function(){
        return {
          coords: coords,
          id: id,
          direction: direction
        }
      }
    }
  }

  return {
    create: makeShot
  };

});
