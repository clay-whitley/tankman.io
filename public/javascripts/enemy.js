// Enemy class

function Enemy(opts){
  this.coords = opts.coords;
  this.color = opts.color;
  this.id = opts.id;
  this.speed = opts.speed;
  this.orientation = opts.orientation;
}

Enemy.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.fillRect(this.coords[0], this.coords[1], 50, 50);
}