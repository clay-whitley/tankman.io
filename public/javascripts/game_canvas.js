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
}