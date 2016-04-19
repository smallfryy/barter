# == Schema Information
#
# Table name: carts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  active     :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_date :datetime
#

class CartsController < ApplicationController

  before_action :set_cart

  def show
    @addresses = Address.where(addressable_id:current_user.id,addressable_type:"User")
  end

  def update
    address = Address.find(params[:address][:addressable_id])
    if @cart.buyer_has_enough_karma
      @cart.complete_transaction
        UserMailer.buyer_order_details(@cart).deliver_now
        UserMailer.seller_order_details(@cart, address).deliver_now
    elsif @cart.is_empty
      flash[:notice] = "Your cart is empty, dumdum."
    else
      flash[:notice] = "You do not have enough karma to complete this transaction, bruh."
    end
    redirect_to @cart
  end

  def format_order_date
    self.order_date.to_date.to_formatted_s(:long_ordinal)
  end

  private

    def set_cart
      @cart = Cart.find(params[:id])
    end

end
