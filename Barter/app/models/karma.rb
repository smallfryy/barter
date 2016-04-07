# == Schema Information
#
# Table name: karmas
#
#  id         :integer          not null, primary key
#  balance    :integer          default("0")
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Karma < ActiveRecord::Base
end
