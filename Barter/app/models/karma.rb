# == Schema Information
#
# Table name: karmas
#
#  id         :integer          not null, primary key
#  balance    :float            default(0.0)
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Karma < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
end
