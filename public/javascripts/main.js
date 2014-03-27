require(["helpers/utility", "vendor/jquery.min", "/socket.io/socket.io.js", "game_init", "game_loop"], function(util, jquery, socketio, init, loop) {

    console.log(init);
    socket = socketio.connect('http://localhost:8080');
    $(document).ready(function(){
      init.domInit();
      init.gameInit();
    });

});