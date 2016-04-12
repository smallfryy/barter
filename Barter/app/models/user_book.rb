# == Schema Information
#
# Table name: user_books
#
#  id          :integer          not null, primary key
#  textbook_id :integer
#  user_id     :integer
#  sold        :boolean          default("false")
#  condition   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class UserBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :textbook
  belongs_to :condition

  def self.total_books_sold
    self.where(sold:true).count
  end

  def self.available
    self.where(sold:false)
  end



end
