game = {};
socket = io.connect('http://localhost');

function gameInit(){

  game.canvas = document.createElement("canvas");
  game.context = game.canvas.getContext("2d");
  game.canvas.width = 900;
  game.canvas.height = 300;
  $('body').prepend(game.canvas);

  game.fps = 30;

  game.player = new Player();
  socket.emit('newPlayer', game.player);
  game.players = [];
  game.shots = [];
  then = Date.now();
  setInterval(mainLoop, 1000/game.fps);
}

// Game initialization

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

  $(document).on('keypress', function(e){
    if (e.keyCode == 32){
      game.player.shoot();
    }
  })
});
