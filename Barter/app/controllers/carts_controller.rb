# == Schema Information
#
# Table name: carts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  active     :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CartsController < ApplicationController

  before_action :set_cart

  def show
    @addresses = Address.where(addressable_id:current_user.id,addressable_type:"User")
  end

  def update
    @cart.complete_transaction
    redirect_to @cart
  end

  private

    def set_cart
      @cart = Cart.find(params[:id])
    end

end
