$(function() {
  app.textbook.controller.create.initialize()

})


app.textbook.controller.create = {
  initialize: function(){
    var searchVal = $('#query').text();

    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + searchVal + "&maxResults=5",
      method: 'GET'
    }).then(function(response){
      return _.map(response.items, function(item){
        // debugger
        var author = item.volumeInfo.authors[0]
        var title = item.volumeInfo.title
        // debugger
        var edition = "1st"
        var isbn = '123'
        // for(var i = 0; i < item.volumeInfo.industryIdentifiers.type.length; i++){
        //   if (item.volumeInfo.industryIdentifiers.type[i] === "ISBN_13"){
        //     var isbn = isbn.identifier
        //   }
        //   debugger;
        // }

        // var isbn = item.volumeInfo.title[0]
        // var edition = item.volumeInfo.title[0]
        return new app.textbook.model.new("no_id", title, author, edition, isbn)
      })
    }).then(function(textbooks){
      _.each(textbooks, function(textbook){
        app.textbook.controller.create.render(textbook)
      })
    })
    },
  render: function(textbook){
    $('.search_results ul').append('<li>' + textbook.title + '</li>')


  }

  }
