function Explosion(opts){
  this.center = opts.center;
  this.radius = opts.radius;
  this.shot = opts.shot;
  this.cells = [];
  this.cells.push(game.map.cellAtCoords(opts.center[0], opts.center[1]));
  this.counter = 0;
}

Explosion.prototype.expand = function(){
  if (this.counter <= this.radius) {
      // Up
    var c1 = game.map.cellAtCoords(this.center[0], this.center[1] - this.counter);
    if (c1) {
      c1.type = "e";
      this.cells.push(c1)
    }
    // Down
    var c2 = game.map.cellAtCoords(this.center[0], this.center[1] + this.counter);
    if (c2) {
      c2.type = "e";
      this.cells.push(c2)
    }
    // Left
    var c3 = game.map.cellAtCoords(this.center[0] - this.counter, this.center[1]);
    if (c3) {
      c3.type = "e";
      this.cells.push(c3)
    }
    // Right
    var c4 = game.map.cellAtCoords(this.center[0] + this.counter, this.center[1])
    if (c4) {
      c4.type = "e";
      this.cells.push(c4)
    }
  }
  this.counter++;
  // console.log(this.cells.length, this.counter);
}

Explosion.prototype.close = function (){
  if (this.counter >= 30) {
    for (i=0;i<this.cells.length;i++){
      this.cells[i].type = "a";
    }
    this.shot.status = "disabled";
  }
}

Explosion.prototype.draw = function(context){
  this.expand();
  for (i=1;i<this.cells.length;i++){
    this.cells[i].draw(context);
  }
  this.close();
}