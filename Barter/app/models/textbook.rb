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
    unless isbn.length == 10 || isbn.length == 13
      errors.add(:isbn, "not a valid ISBN number")
    end
  end

  def user_books_available
    binding.pry
    UserBook.all.where('sold = ? && textbook_id = ?', sold, self.id)

  end




end
