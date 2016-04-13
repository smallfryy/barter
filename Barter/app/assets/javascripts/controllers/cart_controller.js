$(function(){
  $('#addToCart').click(app.cart.controller.createLineItem)
})



app.cart.controller = {
  createLineItem: function(event){
    event.preventDefault();
    debugger

  }

}
