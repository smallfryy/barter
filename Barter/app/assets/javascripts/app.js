var app = {
  textbook: {controller: {}},
  user: {},
  userBook: {},
  cart: {controller: {}},
  users: {controller: {}}
}


$(function(){
  $('#buttonPress').click(function(){
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  })
})