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

class LineItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :user_book
  has_one :textbook, through: :user_book
  belongs_to :address
  belongs_to :buyer, :foreign_key => :id, class_name: 'User'

  validate :book_not_in_user_cart_twice, :book_buyer_is_not_seller

  def book_not_in_user_cart_twice
    buyer = User.find(buyer_id)
    if buyer.active_cart.user_books.include?(self.user_book)
      errors.add(:user_book, "This book already exists in cart.")
    end
  end

  def book_buyer_is_not_seller
    buyer = User.find(buyer_id)
    if buyer == seller
      errors.add(:user_book, "You cannot buy your own books.")
    end
  end

  def seller
    self.user_book.user
  end

end
