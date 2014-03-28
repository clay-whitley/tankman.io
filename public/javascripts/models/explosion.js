define(["models/game"], function(game){

  function makeExplosion(opts){
    var center = opts.center;
    var radius = opts.radius;
    var shot = opts.shot;
    var cells = [];
    cells.push(game.map.cellAtCoords(opts.center[0], opts.center[1]));
    var counter = 0;
    var upStop, downStop, leftStop, rightStop;

    return {
      expand: function(){
          if (counter <= radius) {
            // Up
          var c1 = game.map.cellAtCoords(center[0], center[1] - counter);
          if (c1 && !upStop) {
            if (c1.type == "w"){
              upStop = true;
            }
            c1.type = "e";
            cells.push(c1)
          }
          // Down
          var c2 = game.map.cellAtCoords(center[0], center[1] + counter);
          if (c2 && !downStop) {
            if (c2.type == "w"){
              downStop = true;
            }
            c2.type = "e";
            cells.push(c2)
          }
          // Left
          var c3 = game.map.cellAtCoords(center[0] - counter, center[1]);
          if (c3 && !leftStop) {
            if (c3.type == "w"){
              leftStop = true;
            }
            c3.type = "e";
            cells.push(c3)
          }
          // Right
          var c4 = game.map.cellAtCoords(center[0] + counter, center[1])
          if (c4 && !rightStop) {
            if (c4.type == "w"){
              rightStop = true;

            }
            c4.type = "e";
            cells.push(c4)
          }
        }
        counter++;
      }, close: function(){
        if (counter >= 30) {
          for (i=0;i<cells.length;i++){
            cells[i].type = "a";
          }
          shot.status = "disabled";
        }
      }, draw: function(){
        expand();
        for (i=1;i<cells.length;i++){
          cells[i].draw(context);
        }
        close();
      };
    }
  }

  return {
    create: makeExplosion
  }
});
