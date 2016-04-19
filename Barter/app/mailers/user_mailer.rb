class UserMailer < ApplicationMailer

  def buyer_order_details(cart)
    @cart = cart
    @user = @cart.user
    mail(to: @user.email, subject: "Order Placed - Bibliotech")
  end

  def seller_order_details(cart)
    cart.line_items.each do |item|
      @item = item
      @user = @item.seller
      @buyer = cart.user
      mail(to: @user.email, subject: "Your book has been purchased!")
    end
  end

end
