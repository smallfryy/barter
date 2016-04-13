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

  def index
    @cart = current_user.cart
    render 'show'
  end

  #
  # def show
  #
  #
  #
  # end


end
