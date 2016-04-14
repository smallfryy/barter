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

  def index
    render 'show'
  end

  def update
    binding.pry
    # set item_karma per list item
    # calculate total price of order
    # convert total price to karma
      # subtract karma from buyer
      # add karma to seller
    # deactive current cart
    # create new cart for buyer
    # set list item as purchased
    # set user_book sold to true
    @cart.complete_transaction
  end

  private

    def set_cart
      @cart = current_user.cart
    end

end
