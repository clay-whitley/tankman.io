function gameInit(){
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  for (var x = 0.5; x < 500; x += 50) {
    context.moveTo(x, 0);
    context.lineTo(x, 300);
  }

  for (var y = 0.5; y < 350; y += 50) {
    context.moveTo(0, y);
    context.lineTo(500, y);
  }

  context.strokeStyle = "#000";
  context.stroke();

  return context;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

// Board class

function Board(opts){
  this.cellHeight = 50;
  this.cellWidth = 50;
}

Board.prototype.calculatePixels = function(coords){
  var result = [];
  result[0] = coords[0] * this.cellWidth;
  result[1] = coords[1] * this.cellHeight;
  result[2] = 50;
  result[3] = 50;
  return result;
};

Board.prototype.reset = function(object){
  // removes object from it's previous coordinates
};

// Player Class

function Player(opts){
  this.coords = [0,0];
  this.color = getRandomColor();
  this.board = opts.board;
}

Player.prototype.render = function(context){
  // returns area in format [x, y, width, height]
  var area = this.board.calculatePixels(this.coords);
  context.fillStyle = this.color;
  context.fillRect(area[0], area[1], area[2], area[3]);

  // resets previous grid square to prior state
  this.board.reset(this);
};