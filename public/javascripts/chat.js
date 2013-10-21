function renderMessage(data){
  var $elem = $("<tr><td class='identity'></td><td class='message'></td></tr>");
  $elem.find('.identity').html(data.sender + ": ");
  $elem.find('.message').html(data.message);
  $('#messages').append($elem);
}