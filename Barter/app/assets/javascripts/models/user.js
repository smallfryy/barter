app.user.model = {
  all: [],
  new: function User(id, email, first_name, last_name, college_id) {
    var self = this;
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.collegeId = college_id;
    this.userBooks = function(){
      return app.userBook.model.findBy({user: self})
    };
    (function initialize(){
      app.user.model.all.push(self);
    })()
  },
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.user.model.all, function(user) {
      return user[key] == value;
    })
  }
}
