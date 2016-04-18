# == Schema Information
#
# Table name: carts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  active     :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_date :datetime
#

class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :line_items
  has_many :user_books, through: :line_items
  validates_presence_of :user_id
  # validate :one_active_cart

  # def one_active_cart
  #   active_carts = Cart.where(user_id:self.user_id,active:true)
  #   if active_carts.count > 1
  #     errors.add(:cart,"only one active cart allowed per user")
  #   end
  # end

  def is_empty
    line_items.count.zero?
  end

  def buyer_has_enough_karma
    cart_total_price < self.user.karma.balance
  end

  def complete_transaction
    add_karma_to_sellers
    set_items_final_karma
    subtract_karma_from_buyer
    self.order_date = Time.now
    self.update(active:false) #old card deactivated
    user.setup_cart #new cart created
  end

  def set_items_final_karma
    line_items.each do |line_item|
      price = line_item_price(line_item)
      # address = params[:address]
      line_item.update(item_karma:price)
      # line_item.address(address:)
      line_item.user_book.update(sold:true)
    end
  end

  def line_item_price(line_item)
    line_item.user_book.custom_price ? line_item.user_book.custom_price : line_item.user_book.current_price
  end

  def cart_total_price
    self.line_items.inject(0) do |total_price, item|
      total_price += line_item_price(item)
    end
  end

  def subtract_karma_from_buyer
    user.karma.balance -= self.cart_total_price
    user.karma.save
  end

  def add_karma_to_sellers
    line_items.each do |line_item|
      line_price = line_item_price(line_item)
      line_item.seller.karma.balance += line_price
      line_item.seller.karma.save
      line_item.seller.save
    end
  end

end
