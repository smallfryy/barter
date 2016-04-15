app.textbook.model = {
  all: [],
  new: (function(){
    var counter = 0;
    var textbook = function Textbook(title, author, published_date, isbn) {
      var self = this;
      this.title = title;
      this.author = author;
      this.publishedDate = published_date;
      this.isbn = isbn;
      // this.userBooks = function(){
      //   return app.userBook.model.findBy({textbook: self})
      // };
      (function initialize(){
        self.id = ++counter;
        app.textbook.model.all.push(self);
      })()
     }
     return textbook;
  }()),
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.textbook.model.all, function(textbook) {
      return textbook[key] == value;
    })[0]
  }
}
