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

  def books_sold
   College.joins(:users).joins(:user_books).group("colleges.id").order("COUNT(user_books.id) desc").all.select(&:sold).count
  end

end
