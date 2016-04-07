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
end
