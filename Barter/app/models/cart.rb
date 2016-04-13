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
    active_carts = Cart.joins(:user).where(user_id:self.user_id,active:true)
    if active_carts.count > 0
      errors.add(:cart,"only one active cart allowed per user")
    end
  end



end
