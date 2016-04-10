$(function() {
  $('.user_book').click(app.textbook.controller.show)
})



app.textbook.controller = {
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
      debugger;
      var newUser = new app.user.model.new(user.id, user.email, user.first_name, user.last_name, user.college_id)
      var newTextbook = new app.textbook.model.new(textbook.id, textbook.title, textbook.edition, textbook.isbn)
      var newUserBook = new app.userBook.model.new (userBook.id, newUser, newTextbook, userBook.condition, userBook.sold)
      debugger;


    })
  }}
