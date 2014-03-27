require(["helpers/utility", "vendor/jquery.min", "/socket.io/socket.io.js", "game_init"], function(util, jquery, socketio, init, loop) {
  
    socket = socketio.connect('http://localhost:8080');
    $(document).ready(function(){
      init.domInit();
      init.gameInit();
    });

});