function gameInit(){

  game.canvas = document.createElement("canvas");
  game.context = game.canvas.getContext("2d");
  game.canvas.width = 900;
  game.canvas.height = 300;
  $('body').prepend(game.canvas);
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


// Player Class

function Player(opts){
  this.coords = [0,0];
  this.color = getRandomColor();
  // 100 px per second
  this.speed = 100;
}

Player.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.fillRect(this.coords[0], this.coords[1], 50, 50);
};

// Enemy class

function Enemy(opts){
  this.coords = opts.coords;
  this.color = opts.color;
  this.id = opts.id;
  this.speed = opts.speed;
}

Enemy.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.fillRect(this.coords[0], this.coords[1], 50, 50);
}

// Key listeners

var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Game loop functions

// Update game objects
function update(modifier) {
  if (38 in keysDown) { // Player holding up
    game.player.coords[1] -= game.player.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    game.player.coords[1] += game.player.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    game.player.coords[0] -= game.player.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    game.player.coords[0] += game.player.speed * modifier;
  }
}

function draw(){
  // clear screen
  game.context.clearRect(0,0, game.canvas.width, game.canvas.height);
  // draw background
  // draw enemies
  for (i=0; i<game.players.length; i++){
    game.players[i].draw(game.context);
  }
  // draw player
  game.player.draw(game.context);
  // draw explosives
  // draw explosions
}

function mainLoop() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  draw();

  then = now;
}

var FPS = 30;

// Game initialization

var game = {};

var socket = io.connect('http://localhost');

$(document).ready(function(){
  if (readCookie('identity')){
    var identity = readCookie('identity');
  } else {
    var identity = prompt("Enter name:");
    createCookie('identity', identity);
  }
  socket.emit('identify', identity);

  $('#chatForm').on('submit', function(e){
    e.preventDefault();
    var message = $(this).find('input#messageForm').val();
    socket.emit('message', message);
    $('#messageForm').val('');
    renderMessage({sender: readCookie('identity'), message: message});
  });

  gameInit();
  game.player = new Player();
  socket.emit('newPlayer', game.player);
  game.players = [];
  then = Date.now();
  setInterval(mainLoop, 1000/FPS);
});

socket.on('identified', function(){
  console.log('identified');
});

socket.on('sentMessage', function(data){
  renderMessage(data);
});

// Networking

socket.on('initialSnapshot', function(data){
  for (i=0; i<data.players.length; i++){
    if (data.players[i].id != socket.id){
      game.players.push(new Enemy(data.players[i]));
    }
  }
});

socket.on('snapshot', function(data){
  for (i=0; i<data.players.length; i++){
    for (x=0; x<game.players.length; x++){
      if (data.players[i].id == game.players[x].id){
        game.players[x].coords = data.players[i].coords;
      }
    }
  }
});

socket.on('newPlayer', function(data){
  game.players.push(new Enemy(data));
});

socket.on('playerLeft', function(id){
  for (i=0; i<game.players.length; i++){
    if (game.players[i].id && game.players[i].id == id){
      game.players.splice(i, 1);
    }
  }
});

setInterval(function(){
  socket.emit('playerUpdate', game.player);
  socket.emit('getSnapshot');
}, 30);