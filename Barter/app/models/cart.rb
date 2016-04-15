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

class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :line_items
  has_many :user_books, through: :line_items
  validates_presence_of :user_id
  validate :one_active_cart

  def one_active_cart
    active_carts = Cart.where(user_id:self.user_id,active:true)
    if active_carts.count > 0
      errors.add(:cart,"only one active cart allowed per user")
    end
  end

  # set item_karma per list item - done
  # calculate total price of order
  # convert total price to karma
    # subtract karma from buyer
    # add karma to seller
  # deactive current cart
  # create new cart for buyer
  # set list item as purchased
  # set user_book sold to true

  def complete_transaction(user)
    assign_line_item_prices
    subtract_karma_from_buyer(user)
    binding.pry
  end

  def total_price
    self.line_items.inject(0) do |total_price, item|
      total_price += item.item_karma
    end.round(2)
  end

  def subtract_karma_from_buyer(user)
    user.karma.balance -= self.total_price
    user.save
  end

  def add_karma_to_seller(line_item)
    line_item.seller.karma.balance += line_item.usr_book.current_price.round(2)
    line_item.seller.karma
  end

  def assign_line_item_prices
    self.line_items.each do |line_item|
      line_item.item_karma = line_item.user_book.current_price.round(2)
      binding.pry
      line_item.save
      add_karma_to_seller(line_item)
      binding.pry
    end
  end



end
