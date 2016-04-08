require_relative "../spec_helper.rb"

RSpec.describe Textbook, type: :model do
  DatabaseCleaner.clean

  textbook = Textbook.create(title: "Math 101", isbn: Faker::Code.isbn)
  sammy = User.create(first_name: "Sammy", last_name: "Mernick", email: "smernick3@gmail.com", password: "funfunfun")
  justin = User.create(first_name: "Justin", last_name: "Curhan", email: "justin.curhan@gmail.com", password: "funfunfun")
  liz = User.create(first_name: "Liz", last_name: "Kalina", email: "liz.kalina@gmail.com", password: "funfunfun")
  holly = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")
  book = UserBook.create(textbook: textbook, user: sammy)
  book1 = UserBook.create(textbook: textbook, user: sammy)
  book2 = UserBook.create(textbook: textbook, user: liz)
  subject1 = Subject.create(name: "Math")
  subject2 = Subject.create(name: "English")
  subject3 = Subject.create(name: "Science")
  text_sub1 = TextbookSubject.create(textbook: textbook, subject: subject1)
  text_sub2 = TextbookSubject.create(textbook: textbook, subject: subject2)


  describe 'relationship' do
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
