$(function(){
  $('#addToCart').click(app.cart.controller.createLineItem)
})



app.cart.controller = {
  createLineItem: function(event){
    event.preventDefault();
    userBookId = $('#addToCart').attr('userbookid')
    $.ajax({
      url: '/line_items',
      method: 'POST',
      data: {userBookId: userBookId},
      success: function(response){
          $('#addToCartMessage').empty();
        if (!_.isNull(response.lineItem.id)){
          debugger
          $('#addToCartMessage').append('<h2> Succesfully added to cart </h2>')
        }

      }
    })
  }
}
