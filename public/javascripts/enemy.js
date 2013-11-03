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
  if (this.orientation == 'up'){
    context.fillRect(this.coords[0] + 25, this.coords[1] - 10, 5, 10);
  } else if (this.orientation == 'down'){
    context.fillRect(this.coords[0] + 25, this.coords[1] + 50, 5, 10);
  } else if (this.orientation == 'left'){
    context.fillRect(this.coords[0] - 10, this.coords[1] + 25, 10, 5);
  } else if (this.orientation == 'right'){
    context.fillRect(this.coords[0] + 50, this.coords[1] + 25, 10, 5);
  }
}