function Shot(opts){
  this.height = game.map.pxHeight / game.map.height;
  this.width = game.map.pxWidth / game.map.width;
  this.coords = [opts.coords[0], opts.coords[1]];
  this.speed = 1;
  this.status = 'active';
  this.id = opts.id;
  this.direction = opts.direction;
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
  this.timer = 0;
}

Shot.prototype.draw = function(context){
  this.pxCoords = [this.coords[0] * this.width, this.coords[1] * this.height];
  context.fillStyle = '#000';
  context.fillRect(this.pxCoords[0], this.pxCoords[1], this.width, this.height);
  if (this.timer >= 130 && !this.explosion){
    this.explode();
  }
  if (this.explosion){
    this.explosion.draw(context);
  }
  this.timer++;
}

Shot.prototype.explode = function(){
  var opts = {
    center: this.coords,
    radius: 4,
    shot: this
  };
  this.explosion = new Explosion(opts);
}

