function gameInit(){
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

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
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }
}

function draw(){
  context.clearRect(0,0, 500, 300);
  // draw background
  // draw enemies
  // draw player
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

setInterval(mainLoop, 1000/FPS);

// Game initialization

var context = gameInit();

var socket = io.connect('http://localhost');
      $(document).ready(function(){
        if (readCookie('identity')){
          var identity = readCookie('identity')
        } else {
          var identity = prompt("Enter name:");
          createCookie('identity', identity);
        }
        socket.emit('identify', identity);

        $('#chatForm').on('submit', function(e){
          e.preventDefault();
          var message = $(this).find('input#messageForm').val()
          socket.emit('message', message)
          $('#messageForm').val('');
          renderMessage({sender: readCookie('identity'), message: message});
        });

        var gameContext = gameInit();
        var board = new Board();
        var player = new Player({board: board});
        player.render(gameContext);
      });

      socket.on('identified', function(){
        console.log('identified');
      });

      socket.on('sentMessage', function(data){
        renderMessage(data);
      });
