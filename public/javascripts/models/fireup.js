define(["models/game", "models/powerup"], function(game, powerup){
  function makeFireup(opts){
    var that = powerup.create(opts),
    color = "#00FFCC";

    that.setName('Fireup');
    that.setValue(1);
    that.setProperty('shotRadius');
    that.getColor = function(){
      return color;
    };

    return that;
  }

  return {
    create: makeFireup
  };
});