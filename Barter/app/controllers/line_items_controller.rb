# == Schema Information
#
# Table name: line_items
#
#  id            :integer          not null, primary key
#  buyer_id      :integer
#  user_books_id :integer
#  cart_id       :integer
#  item_karma    :integer          default(0)
#  purchased     :boolean          default(FALSE)
#  shipped       :boolean          default(FALSE)
#  received      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class LineItemsController < ApplicationController
end
