require(["helpers/utility", "vendor/jquery.min", "/socket.io/socket.io.js"], function(util, jquery, socketio) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    require(['game_init'], function(init){
      console.log(init);
      socket = socketio.connect('http://localhost:8080');
      $(document).ready(function(){
        init.domInit();
        init.gameInit();
      })
    });

});