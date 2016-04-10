$(function() {
  $('.user_book').click(app.textbook.controller.show)
  $('.search').click(app.textbook.controller.create.initialize)
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
      var newUser = new app.user.model.new(user.id, user.email, user.first_name, user.last_name, user.college_id)
      var newTextbook = new app.textbook.model.new(textbook.id, textbook.title, textbook.edition, textbook.isbn)
      var newUserBook = new app.userBook.model.new (userBook.id, newUser, newTextbook, userBook.condition, userBook.sold)

      app.textbook.controller.modal(newUserBook)

    })
  },
    modal: function(userBook){
      $('.modal .header').append(userBook.textbook.title)
      $('.modal').modal('show')
      $('.modal .right ul').append(userBook.condition)
      // $('.modal .right ul').append(userBook.user.address.state)
      $('.modal .right ul').append(userBook.user.email)

  }

}

app.textbook.controller.create = {
  initialize: function(event){
    var isbn = $('#q').val()

    $.ajax({
      url:  '/textbooks/search',
      method: 'GET',
      data: {q: isbn}
    }).then(function(response){
      if(!response.success){
      debugger;
      }
    })

  }
}
