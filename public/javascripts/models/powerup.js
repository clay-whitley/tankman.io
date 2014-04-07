define(["models/game"], function(game){
  function makePowerup(opts){
    var coords = opts.coords,
    status = 'active',
    height = opts.height,
    width = opts.width,
    pxCoords = [coords[0] * width, coords[1] * height],
    name, property, value;

    return {
      disable: function(){
        status = 'disabled';
      }, getStatus: function(){
        return status;
      }, getName: function(){
        return name;
      }, setName: function(new_name){
        name = new_name;
      }, getProperty: function(){
        return property;
      }, setProperty: function(new_property){
        property = new_property;
      }, getValue: function(){
        return value;
      }, setValue: function(new_value){
        value = new_value;
      }
    };
  }

  return {
    create: makePowerup
  };
});