$(function() {
  $('.user_book').click(app.userBook.controller.show)
  $('#back').click(function(){
    $('.modal').modal('hide')
})
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
      $('.modal .header').append(userBook.textbook.title)
      $('.modal .right ul').append(userBook.condition)
      // $('.modal .right ul').append(userBook.user.address.state)
      $('.modal .right ul').append(userBook.user.email)
      $('.modal').modal('show')


  }

}
