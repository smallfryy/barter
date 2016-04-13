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

class LineItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :user_book
  belongs_to :buyer, :foreign_key => :id, class_name: 'User'
  validate :book_not_in_user_cart_twice

  def book_not_in_user_cart_twice
    if self.cart.user_books.include?(self.user_book)
      errors.add(:user_book, "This book already exists in cart.")
    end
  end

end
