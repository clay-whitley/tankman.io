define(["models/game"], function(game){
  function makePowerup(opts){
    var coords = opts.coords,
    status = 'active',
    height = opts.height,
    width = opts.width,
    pxCoords = [coords[0] * width, coords[1] * height];

    return {
      pickup: function(){
        status = 'disabled';
      }
    };
  }

  return {
    create: makePowerup
  };
});