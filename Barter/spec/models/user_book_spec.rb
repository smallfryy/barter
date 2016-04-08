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

require_relative "../spec_helper.rb"



RSpec.describe UserBook, type: :model do
  DatabaseCleaner.clean

  textbook = Textbook.create(title: "Math 101", isbn: Faker::Code.isbn)
  user = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")
  book = UserBook.create(textbook: textbook, user: user)


  describe 'relationship' do
    it 'book belongs to a textbook' do
      expect(book.textbook.title).to eq("Math 101")
    end

    it "User_book belongs to a user" do
      expect(book.user.email).to eq("holly.m.peck@gmail.com")
    end

  end
end
