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

module LineItemsHelper
end
