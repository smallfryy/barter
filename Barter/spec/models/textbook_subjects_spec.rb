require_relative "../spec_helper.rb"

RSpec.describe TextbookSubject, type: :model do
  DatabaseCleaner.clean


  textbook = Textbook.create(title: "Math 101", isbn: Faker::Code.isbn)
  subject1 = Subject.create(name: "Math")
  subject2 = Subject.create(name: "English")
  subject3 = Subject.create(name: "Science")
  text_sub1 = TextbookSubject.create(textbook: textbook, subject: subject1)
  text_sub2 = TextbookSubject.create(textbook: textbook, subject: subject2)

  describe 'relationship' do
    it 'TextbookSubject belongs to a textbook' do
      expect(text_sub1.textbook.title).to eq("Math 101")
    end

    it 'TextbookSubject belongs to a subject' do
      expect(text_sub1.subject.name).to eq("Math")
    end




  end



end
