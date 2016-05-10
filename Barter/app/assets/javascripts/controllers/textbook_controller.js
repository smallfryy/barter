$(function() { 
  $(".text_d_long").hide();
  $('#custom_price_value').hide();
  $('#see_more').on('click', function(event){
    event.preventDefault()
    $(".text_d_short").hide()
    $(".text_d_long").show()
  });
  $('#see_less').on('click', function(event){
    event.preventDefault()
    $(".text_d_long").hide()
    $(".text_d_short").show()
  })
})