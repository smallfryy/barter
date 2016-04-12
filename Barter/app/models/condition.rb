# == Schema Information
#
# Table name: conditions
#
#  id   :integer          not null, primary key
#  name :string
#

class Condition < ActiveRecord::Base
  has_many :user_books

end
