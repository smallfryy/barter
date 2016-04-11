# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Address.destroy_all
College.destroy_all
Subject.destroy_all
Textbook.destroy_all
TextbookSubject.destroy_all
UserBook.destroy_all
User.destroy_all
Karma.destroy_all

sammy = User.create(first_name: "Sammy", last_name: "Mernick", email: "smernick3@gmail.com", password: "funfunfun")
justin = User.create(first_name: "Justin", last_name: "Curhan", email: "justin.curhan@gmail.com", password: "funfunfun")
liz = User.create(first_name: "Liz", last_name: "Kalina", email: "liz.kalina@gmail.com", password: "funfunfun")
holly = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")


10.times do
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "funfunfun")
end

User.all.each_with_index do |user, i|
  Karma.create(user: user, balance: Faker::Number.between(0, 500))
  if i.even?
    user.addresses << Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  end
  user.addresses << Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
end

10.times do
  college = College.create(name: Faker::University.name)
  college.address = Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
end

User.all.each do |user|
  user.college = College.all.sample
  user.save
end

subject1 = Subject.create(name: "Math")
subject2 = Subject.create(name: "English")
subject3 = Subject.create(name: "Science")
subject4 = Subject.create(name: "Programming")
subject5 = Subject.create(name: "Art")
subject6 = Subject.create(name: "Architecture")

20.times do
  Textbook.create(title: Faker::Book.title, isbn: Faker::Code.isbn)
end

40.times do
  TextbookSubject.create(textbook: Textbook.all.sample, subject: Subject.all.sample)
end

condition_array = ["Fresh", "Very Good", "Good", "Acceptable", "Trash"]

100.times do
  UserBook.create(textbook: Textbook.all.sample, user: User.all.sample, condition: condition_array.sample )
end