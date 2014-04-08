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
            if (c1.type() == "w"){
              upStop = true;
              socket.emit('mapUpdate', {type: "a", coords: c1.coords()});
              c1.setType('e');
              cells.push(c1)
            } else if (c1.type() == "m"){
              upStop = true;
            } else if (c1.type() == "a"){
              c1.setType('e');
              cells.push(c1);
            }
          }
          // Down
          var c2 = game.map.cellAtCoords(center[0], center[1] + counter);
          if (c2 && !downStop) {
            if (c2.type() == "w"){
              downStop = true;
              socket.emit('mapUpdate', {type: "a", coords: c2.coords()});
              c2.setType('e');
              cells.push(c2)
            } else if (c2.type() == "m"){
              upStop = true;
            } else if (c2.type() == "a"){
              c2.setType('e');
              cells.push(c2);
            }
          }
          // Left
          var c3 = game.map.cellAtCoords(center[0] - counter, center[1]);
          if (c3 && !leftStop) {
            if (c3.type() == "w"){
              leftStop = true;
              socket.emit('mapUpdate', {type: "a", coords: c3.coords()});
              c3.setType('e');
              cells.push(c3)
            } else if (c3.type() == "m"){
              leftStop = true;
            } else if (c3.type() == "a"){
              c3.setType('e');
              cells.push(c3);
            }
          }
          // Right
          var c4 = game.map.cellAtCoords(center[0] + counter, center[1])
          if (c4 && !rightStop) {
            if (c4.type() == "w"){
              rightStop = true;
              socket.emit('mapUpdate', {type: "a", coords: c4.coords()});
              c4.setType('e');
              cells.push(c4)
            } else if (c4.type() == "m"){
              rightStop = true;
            } else if (c4.type() == "a"){
              c4.setType('e');
              cells.push(c4);
            }
          }
        }
        counter++;
      }, close: function(){
        if (counter >= 30) {
          for (i=0;i<cells.length;i++){
            cells[i].setType('a');
          }
          shot.disable();
        }
      }, draw: function(context){
        this.expand();
        for (i=1;i<cells.length;i++){
          cells[i].draw(context);
        }
        this.close();
      }
    }
  }

  return {
    create: makeExplosion
  };
});
