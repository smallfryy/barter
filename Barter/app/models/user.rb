# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  first_name :string
#  last_name  :string
#  email      :string
#  password   :string
#  college_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  has_many :user_books 
  has_many :textbooks, through: :user_books
  has_one :karma
  belongs_to :college 
  has_many :addresses, as: :addressable 
   
end
