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

require_relative "../spec_helper.rb"

RSpec.describe Textbook, type: :model do
  # DatabaseCleaner.clean
  describe 'relationship' do
  let!(:textbook){Textbook.create(title: "Math 101", isbn: Faker::Code.isbn)}
  let!(:sammy){User.create(first_name: "Sammy", last_name: "Mernick", email: "smernick3@gmail.com", password: "funfunfun")}
  let!(:justin){User.create(first_name: "Justin", last_name: "Curhan", email: "justin.curhan@gmail.com", password: "funfunfun")}
  let!(:liz){User.create(first_name: "Liz", last_name: "Kalina", email: "liz.kalina@gmail.com", password: "funfunfun")}
  let!(:holly){User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")}
  let!(:book){UserBook.create!(textbook: textbook, user: sammy)}
  let!(:book1){UserBook.create!(textbook: textbook, user: sammy)}
  let!(:book2){UserBook.create!(textbook: textbook, user: liz)}
  let!(:subject1){Subject.create(name: "Math")}
  let!(:subject2){Subject.create(name: "English")}
  let!(:subject3){Subject.create(name: "Science")}
  let!(:text_sub1){TextbookSubject.create(textbook: textbook, subject: subject1)}
  let!(:text_sub2){TextbookSubject.create(textbook: textbook, subject: subject2)}


    it 'Textbook has a title' do
      expect(textbook.title).to eq("Math 101")
    end

    it "has multilpe user_books" do
      expect(textbook.user_books.count).to eq(3)
    end


    it "has multilpe users, through user_books" do
      #  textbook.users will return all instances of users, even if a user is selling mutliple coppies of hte same book. that user will be counted for each time they sell book.
    
      expect(textbook.users.uniq.count).to eq(2)
    end


    it "textbook has multiple textbooksubjects" do
      expect(textbook.textbook_subjects.count).to eq(2)
    end

    it "textbook has subjects, through textbooksubjects" do
      expect(textbook.subjects.first.name).to eq("Math")
    end

    it "textbook has subjects, through textbooksubjects" do
      expect(textbook.subjects.count).to eq(2)
    end

  end
end
