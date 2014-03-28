require(["helpers/utility", "vendor/jquery.min", "game_init"], function(util, jquery, init, loop) {

    $(document).ready(function(){
      init.domInit();
      init.gameInit();
    });

});