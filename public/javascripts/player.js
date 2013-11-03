// Player Class

function Player(opts){
  this.coords = [0,0];
  this.color = getRandomColor();
  this.orientation = 'down';
  // 100 px per second
  this.speed = 100;
}

Player.prototype.shoot = function(){
  var newShot = new Shot({coords: this.coords, id: socket.socket.sessionid, direction: this.orientation});
  game.shots.push(newShot);
};

Player.prototype.draw = function(context){
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
};