# == Schema Information
#
# Table name: textbooks
#
#  id         :integer          not null, primary key
#  title      :string
#  ISBN       :string
#  edition    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Textbook < ActiveRecord::Base
end
