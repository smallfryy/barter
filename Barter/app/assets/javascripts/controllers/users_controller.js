$(function(){
  $('#giftKarma').click(app.users.controller.karmaModal);
  $('#sendKarma').click(app.users.controller.sendKarma);
})

app.users.controller = {
  karmaModal: function(event){
    event.preventDefault();
    $('.ui.modal').modal('show')
    ;
  },
  sendKarma: function(event){
    event.preventDefault();
    var friendId = $('#karmaFriend option:checked').val();
    var amount = $('#karmaAmount').val();
    var karmaId = String($('#karmaId').val())
    $.ajax({
      url: '/karmas/' + karmaId,
      method: 'PATCH',
      data: {friendId: friendId, amount:amount}
    }).success(function(data){
      if (data.message){
        var message = data.message;
        $('#karmaError').text(message);
      } else {
        var karma = data.sender_karma.balance;
        app.users.controller.updateKarma(karma);
      }
    })
  },
  updateKarma: function(karma){
    $('#navKarma').text('Karma: $' + karma + '.00');
    $('#bodyKarma').text('Karma Balance: $' + karma + '.00');
    $('.ui.modal').modal('hide');
  }
}