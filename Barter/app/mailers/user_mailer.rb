class UserMailer < ApplicationMailer

  def order_details_buyer(user, cart)
    @user = user
    @cart = cart
    mail(to: @user.email, subject: "Order Placed - Bibliotech")
  end 

  def order_details_user(user, cart)
    @user = user
    @cart = cart
    mail(to: @user.email, subject: "Someone wants to buy your #{@book.name}")
  end 

end
