$(function(){
  $('#addToCart').click(app.cart.controller.createLineItem)
  $('.remove-item').click(app.cart.controller.removeFromCart)
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
          $('#addToCartMessage').append('<h2> Succesfully added to cart </h2>')
        }

      }
    })
  },
  removeFromCart: function(event){
    event.preventDefault();
    lineItemId = $(this).attr('line-item-id')
      $.ajax({
      url: '/line_items/' + lineItemId,
      method: 'DELETE',
      success: function(response){
        if (!_.isNull(response.lineItemId)){
          id = response.lineItemId
          $('#cart-item-' + id).empty();
        }

      }
    })
  }
}
