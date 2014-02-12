// Player Class

function Player(){
  this.coords = [0,0];
  this.color = getRandomColor();
  this.orientation = 'down';
  // 100 px per second
  this.speed = 30;
  this.health = 100;
}

Player.prototype.init = function(map){
  this.width = map.pxWidth / map.width;
  this.height = map.pxHeight / map.height;
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Player.prototype.moveLeft = function(modifier){
  this.coords[0] -= Math.floor(this.speed * modifier);
  this.orientation = 'left';
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Player.prototype.moveRight = function(modifier){
  this.coords[0] += Math.floor(this.speed * modifier);
  this.orientation = 'right';
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Player.prototype.moveDown = function(modifier){
  this.coords[1] += Math.floor(this.speed * modifier);
  this.orientation = 'down';
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Player.prototype.moveUp = function(modifier){
  this.coords[1] -= Math.floor(this.speed * modifier);
  this.orientation = 'up';
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
}

Player.prototype.shoot = function(){
  var newShot = new Shot({coords: this.coords, id: socket.socket.sessionid, direction: this.orientation});
  game.shots.push(newShot);
  socket.emit('newShot', newShot);
};

Player.prototype.takeDamage = function(amount){
  this.health -= amount;
}

Player.prototype.draw = function(context){
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