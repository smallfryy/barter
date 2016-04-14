$(function() {


  $('body').on('click', '.user_book', app.userBook.controller.show)


  // $('.user_book').click(app.userBook.controller.show)
  $('.remove icon').click(function(){
    $('.modal').modal('hide')
  })


  $('#newUserBook').click(function(){
    $('#buildUserBook').modal('show')
  })

  $('#userBookSubmit').click(app.userBook.controller.new)


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
      var newUser = new app.user.model.new(user.email, user.first_name, user.last_name, user.college_id)
      var newTextbook = new app.textbook.model.new(textbook.title, textbook.author, textbook.edition, textbook.isbn)
      var newUserBook = new app.userBook.model.new (newUser, newTextbook, userBook.condition, userBook.sold)

      app.userBook.controller.modal(newUserBook, response.userBook.id)

    })
  },
    modal: function(userBook, userBookId){
      // $('.ui.basic.modal').html("")
      $('.ui.basic.modal .header').empty()
      $('.ui.basic.modal ul').empty()
      // $('#addToCartMessage').empty();
      $('.ui.basic.modal .header').append(userBook.textbook.title)
      $('.ui.basic.modal ul').append('<li>'+ userBook.condition +'</li>')
      // $('.modal .right ul').append(userBook.user.address.state)
      $('.ui.basic.modal ul').append('<li>'+userBook.user.email+'</li>')

      $('.ui.basic.modal').modal('show')
      $('#addToCart').attr('userBookId', userBookId)



  },
  new: function(event){
    event.preventDefault()
    var condition_id = $('#condition_id option:selected').val()
    var url = $('form').attr('action')

    $.ajax({
      url: url,
      method: 'POST',
      data: {condition: condition_id}
    }).then(function(response){
      app.userBook.controller.render(response)

    })


  },
  render: function(response){
    var userBook = response.userBook;
    var condition = response.condition;
    var userName = response.userName;
    var bookName = response.bookName
    var userBooksSold = response.userBooksSold;
    var listingDaysAgo = response.listingDaysAgo
    var userBookCount = response.userBookCount
    var url = '/textbooks/' + userBook.textbook_id + '/book/' + userBook.id

    $('#book_info').text('There are ' + userBookCount + ' copies of ' + bookName + ' available for sale:')
    $('ul').append('<li id="'+ userBook.id +'" class="user_book"><a href="'+ url +'">' + condition + '</a>' + " - listed by " + userName + "(" + userBooksSold + " books sold), " + listingDaysAgo + '.</li>')
  }
}
