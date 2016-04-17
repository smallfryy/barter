class UserMailer < ApplicationMailer

  def add_user_book(user)
    @user = user
    @textbook = @textbook.user_book
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Listing Details - #{@textbook.title}')
  end


  def order_confirmation(user, cart)
    @user = user
    @cart = cart
    mail(to: @user.email, subject: "Order Placed - Bibliotech")
  end 

end
