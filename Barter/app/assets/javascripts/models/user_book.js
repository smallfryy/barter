app.userBook.model = {
  all: [],
  new: function UserBook(id, user, textbook, condition, sold) {
    this.id = id;
    this.user = user;
    this.textbook = textbook;
    this.condition = condition;
    this.sold = sold;
    var self = this;

    (function initialize(){
      app.userBook.model.all.push(self);
    })()
  },
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.userBook.model.all, function(userBook) {
      return userBook[key] == value;
    })
  }
}
