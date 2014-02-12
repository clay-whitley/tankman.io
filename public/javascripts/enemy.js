// Enemy class

function Enemy(opts){
  this.coords = opts.coords;
  this.color = opts.color;
  this.id = opts.id;
  this.speed = opts.speed;
  this.health = opts.health;
  this.width = game.map.pxWidth / game.map.width;
  this.height = game.map.pxHeight / game.map.height;
  this.orientation = opts.orientation;
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Enemy.prototype.draw = function(context){
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
  context.fillStyle = this.color;
  context.fillRect(this.pxCoords[0], this.pxCoords[1], this.width, this.height);
  if (this.orientation == 'up'){
    context.fillRect(this.pxCoords[0] + 25, this.pxCoords[1] - 10, 5, 10);
  } else if (this.orientation == 'down'){
    context.fillRect(this.pxCoords[0] + 25, this.pxCoords[1] + 50, 5, 10);
  } else if (this.orientation == 'left'){
    context.fillRect(this.pxCoords[0] - 10, this.pxCoords[1] + 25, 10, 5);
  } else if (this.orientation == 'right'){
    context.fillRect(this.pxCoords[0] + 50, this.pxCoords[1] + 25, 10, 5);
  }
};