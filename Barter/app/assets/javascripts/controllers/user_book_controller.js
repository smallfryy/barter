$(function() {
  $('.user_book').click(app.userBook.controller.show)
  $('.remove icon').click(function(){
    $('.modal').modal('hide')
})
$('#newUserBook').click(app.userBook.controller.new)
$('#newUserBook').click(app.userBook.controller.new)


})


app.userBook.controller = {
  show: function(event){
    event.preventDefault()

    var url = $(this).find('a').attr('href')
    // $('.modal').modal('show')
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response){
      var user = response.user
      var textbook = response.textbook
      var userBook = response.userBook
      var newUser = new app.user.model.new(user.id, user.email, user.first_name, user.last_name, user.college_id)
      var newTextbook = new app.textbook.model.new(textbook.id, textbook.title, textbook.author, textbook.edition, textbook.isbn)
      var newUserBook = new app.userBook.model.new (userBook.id, newUser, newTextbook, userBook.condition, userBook.sold)

      app.userBook.controller.modal(newUserBook)

    })
  },
    modal: function(userBook){
      // $('.ui.basic.modal').html("")
      $('.ui.basic.modal .header').empty()
      $('.ui.basic.modal ul').empty()

      $('.ui.basic.modal .header').append(userBook.textbook.title)
      $('.ui.basic.modal ul').append('<li>'+ userBook.condition +'</li>')
      // $('.modal .right ul').append(userBook.user.address.state)
      $('.ui.basic.modal ul').append('<li>'+userBook.user.email+'</li>')

      $('.ui.basic.modal').modal('show')



  },
  new: function(event){
    event.preventDefault()
    var user = $('#newUserBook').attr('user')
    debugger;
    $('#buildUserBook').modal('show')


  }
}
