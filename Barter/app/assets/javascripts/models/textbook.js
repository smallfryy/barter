app.textbook.model = {
  all: [],
  new: function Textbook(id, title, author, edition, isbn) {
    var self = this;
    this.id = id;
    this.title = title;
    this.author = author;
    this.edition = edition;
    this.isbn = isbn;
    this.userBooks = function(){
      return app.userBook.model.findBy({textbook: self})
    };
    (function initialize(){
      app.textbook.model.all.push(self);
    })()
  },
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.textbook.model.all, function(textbook) {
      return textbook[key] == value;
    })
  }
}
