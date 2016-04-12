app.userBook.model = {
  all: [],
  new: (function(){
      var counter = 0;
      var userbook = function UserBook(user, textbook, condition, sold) {
      this.user = user;
      this.textbook = textbook;
      this.condition = condition;
      this.sold = sold;
      var self = this;
      (function initialize(){
        self.id = ++counter;
        app.userBook.model.all.push(self);
      })()
    }
    return userbook;
  }()),
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.userBook.model.all, function(userBook) {
      return userBook[key] == value;
    })
  }
}