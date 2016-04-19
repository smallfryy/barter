class UserMailer < ApplicationMailer

  def buyer_order_details(cart, user)
    binding.pry
    @user = user
    @cart = cart
    mail(to: @user.email, subject: "Order Placed - Bibliotech")
  end

  def order_details_user(cart, user)

    @user = user
    @cart = cart
    mail(to: @user.email, subject: "Someone wants to buy your")
  end

end
