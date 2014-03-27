function makeExplosion(opts){
  center = opts.center;
  radius = opts.radius;
  shot = opts.shot;
  cells = [];
  cells.push(game.map.cellAtCoords(opts.center[0], opts.center[1]));
  counter = 0;

  return {
    expand: function(){
        if (this.counter <= this.radius) {
          // Up
        var c1 = game.map.cellAtCoords(this.center[0], this.center[1] - this.counter);
        if (c1 && !this.upStop) {
          if (c1.type == "w"){
            this.upStop = true;
          }
          c1.type = "e";
          this.cells.push(c1)
        }
        // Down
        var c2 = game.map.cellAtCoords(this.center[0], this.center[1] + this.counter);
        if (c2 && !this.downStop) {
          if (c2.type == "w"){
            this.downStop = true;
          }
          c2.type = "e";
          this.cells.push(c2)
        }
        // Left
        var c3 = game.map.cellAtCoords(this.center[0] - this.counter, this.center[1]);
        if (c3 && !this.leftStop) {
          if (c3.type == "w"){
            this.leftStop = true;
          }
          c3.type = "e";
          this.cells.push(c3)
        }
        // Right
        var c4 = game.map.cellAtCoords(this.center[0] + this.counter, this.center[1])
        if (c4 && !this.rightStop) {
          if (c4.type == "w"){
            this.rightStop = true;

          }
          c4.type = "e";
          this.cells.push(c4)
        }
      }
      this.counter++;
      // console.log(this.cells.length, this.counter);
    }, close: function(){
      if (this.counter >= 30) {
        for (i=0;i<this.cells.length;i++){
          this.cells[i].type = "a";
        }
        this.shot.status = "disabled";
      }
    }, draw: function(){
      this.expand();
      for (i=1;i<this.cells.length;i++){
        this.cells[i].draw(context);
      }
      this.close();
    };
  }
}
