function Shot(opts){
  this.height = 5;
  this.width = 5;
  this.coords = [opts.coords[0], opts.coords[1]];
  this.speed = 200;
  this.status = 'active';
  this.id = opts.id;
  this.direction = opts.direction;
}

Shot.prototype.draw = function(context){
  context.fillStyle = '#000';
  context.fillRect(this.coords[0], this.coords[1], this.width, this.height);
}