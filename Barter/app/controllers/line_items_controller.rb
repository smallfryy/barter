# == Schema Information
#
# Table name: line_items
#
#  id                  :integer          not null, primary key
#  buyer_id            :integer
#  user_book_id        :integer
#  cart_id             :integer
#  item_karma          :float            default(0.0)
#  shipped             :boolean          default(FALSE)
#  received            :boolean          default(FALSE)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  shipping_address_id :integer
#

class LineItemsController < ApplicationController

  def create
    @user_book = UserBook.find(params[:userBookId])
    @line_item = LineItem.create(user_book: @user_book, buyer_id: current_user.id, cart: current_user.active_cart)
    render json: {lineItem: @line_item}
  end

  def destroy
    @line_item_id = params[:id]
    LineItem.delete(@line_item_id)
    render json: {lineItemId: @line_item_id}
  end

end
