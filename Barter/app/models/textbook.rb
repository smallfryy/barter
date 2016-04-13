# == Schema Information
#
# Table name: textbooks
#
#  id         :integer          not null, primary key
#  title      :string
#  isbn       :string
#  edition    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author     :string
#

class Textbook < ActiveRecord::Base
  has_many :user_books
  has_many :users, through: :user_books
  has_many :textbook_subjects
  has_many :subjects, through: :textbook_subjects
  validates :title, :isbn, presence: true
  validate :isbn_length


  def isbn_length
    isbn = self.isbn.gsub("-", "")
    unless isbn.length == 10 || isbn.length == 13 || isbn.length == 8
      errors.add(:isbn, "not a valid ISBN number")
    end
  end

  def calculate_condition_prices(retail_price)
    depreciation = 0
    semester_in_months = 6
    condition_hash = {fresh: retail_price, very_good: 0, good: 0, acceptable: 0, trash: 0}
    conditions = condition_hash.keys
    condition_hash.each_with_index do |(condition, price), index|
      if index < 4
        binding.pry
        depreciation = ((price - depreciation)*2)/semester_in_months
        condition_hash[conditions[index + 1]] = price - depreciation
      end
    end
    condition_hash
  end
  # old code below. code was refactored above:
    # depreciation = ((fresh - depreciation)*2)/semester_in_months
    # very_good = fresh - depreciation
    # depreciation = ((very_good - depreciation)*2)/semester_in_months
    # good = very_good - depreciation
    # depreciation = ((good - depreciation)*2)/semester_in_months
    # acceptable = good - depreciation
    # depreciation = ((acceptable - depreciation)*2)/semester_in_months
    # trash = acceptable - depreciation  

  # write a method for how many times a book has been exchanged

end
