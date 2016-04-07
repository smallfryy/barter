# == Schema Information
#
# Table name: textbook_subjects
#
#  id          :integer          not null, primary key
#  textbook_id :integer
#  subject_id  :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TextbookSubject < ActiveRecord::Base
end
