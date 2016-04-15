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
  # validate :one_active_cart

  def one_active_cart
    active_carts = Cart.where(user_id:self.user_id,active:true)
    if active_carts.count > 1
      errors.add(:cart,"only one active cart allowed per user")
    end
  end

  def complete_transaction
    add_karma_to_sellers
    set_items_final_karma
    subtract_karma_from_buyer
    self.update(active:false) #old card deactivated
    user.setup_cart #new cart created
  end

  def line_item_price(line_item)
    price = line_item.user_book.current_price.round(2)
  end

  def set_items_final_karma
    line_items.each do |line_item|
      price = line_item_price(line_item)
      line_item.update(item_karma:price)
      line_item.user_book.update(sold:true)
    end
  end

  def total_price
    self.line_items.inject(0) do |total_price, item|
      total_price += item.item_karma
    end.round(2)
  end

  def subtract_karma_from_buyer
    user.karma.balance -= self.total_price
    binding.pry
    user.karma.save
  end

  def add_karma_to_sellers
    line_items.each do |line_item|
      price = line_item_price(line_item)
      line_item.seller.karma.balance += price
      line_item.seller.karma.save
    end
  end

end
