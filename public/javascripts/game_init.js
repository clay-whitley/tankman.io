define(["game_loop", "models/game", "networking"], function(loop, game, networking){
  return {
    gameInit: function(){
      game.canvas = document.createElement("canvas");
      game.context = game.canvas.getContext("2d");
      game.canvas.width = 950;
      game.canvas.height = 600;
      $('body').prepend(game.canvas);
      
      then = Date.now();

      setInterval(loop.mainLoop, 1000/game.fps);
      networking.startTick();
    }, domInit: function(){
      var identity = readCookie('identity');
      socket.emit('identify', identity);

      $('#chatForm').on('submit', function(e){
        e.preventDefault();
        var message = $(this).find('input#messageForm').val();
        socket.emit('message', message);
        $('#messageForm').val('');
        renderMessage({sender: readCookie('identity'), message: message});
      });

      $(document).on('keypress', function(e){
        if (e.keyCode == 32){
          game.player.shoot();
        }
      });
    }
  };
});
