
# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string
#  last_name              :string
#  college_id             :integer
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :setup_cart, :setup_karma

  has_many :user_books, dependent: :destroy
  has_many :textbooks, through: :user_books
  has_one :karma
  belongs_to :college
  has_many :addresses, as: :addressable
  has_many :carts
  validates :first_name, :last_name, :email, presence: true

  def setup_cart
    self.carts.create
  end

  def setup_karma
    self.build_karma
    self.save
  end

  def name_w_initial
    "#{first_name} #{last_name.first}."
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def active_cart
    Cart.where(user_id:self.id,active:true).first
  end

  def inactive_carts
    Cart.where(user_id:self.id,active:false)
  end

  def member_since
    self.created_at.to_date.to_formatted_s(:long_ordinal)
  end

  def last_sign_in
    if self.last_sign_in_at
      days = (Date.today - self.last_sign_in_at.to_date).to_i
      days == 0 ? 'Today' : "#{days} days ago"
    end
  end

  def books_sold
    UserBook.where(sold:true,user_id:self.id)
  end

  def books_for_sale
    UserBook.where(sold:false,user_id:self.id)
  end

  def books_purchased
    UserBook.joins(:line_items).where('user_books.sold = true AND line_items.buyer_id = ?',self.id)
  end

  def num_books_sold
    books_sold.count
  end

  def num_books_for_sale
    books_for_sale.count
  end

end
