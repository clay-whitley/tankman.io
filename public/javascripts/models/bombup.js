define(["models/game", "models/powerup"], function(game, powerup){
  function makeBombup(opts){
    var that = powerup.create(opts),
    color = "#6600CC";

    that.setName('Bombup');
    that.setValue(1);
    that.setProperty('maxShots');
    that.getColor = function(){
      return color;
    };

    return that;
  }

  return {
    create: makeBombup
  };
});