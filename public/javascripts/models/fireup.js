define(["models/game", "models/powerup"], function(game, powerup){
  function makeFireup(opts){
    var that = powerup.create(opts),
    color = "#00FFCC";

    that.getColor = function(){
      return color;
    };

    return that;
  }

  return {
    create: makeFireup
  };
});