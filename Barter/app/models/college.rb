# == Schema Information
#
# Table name: colleges
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class College < ActiveRecord::Base
  has_many :users
  has_many :user_books, through: :users
  has_one :address, as: :addressable
  validates :name, presence: true

  def self.most_popular_college
    College.joins(:users).joins(:user_books).group("colleges.id").order("COUNT(user_books.id) desc").first
  end

  def self.number_of_books
    College.joins(:users).joins(:user_books).group("colleges.id").order("COUNT(user_books.id) desc")
  end

  def user_books_sold
   sold_books = College.joins(:users).joins(:user_books).where('user_books.sold = true').group("colleges.id").order("COUNT(user_books.id) desc")
   sold_books.present? ? sold_books : 0 
  end

end
