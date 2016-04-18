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


# ADMIN SEEDS

sammy = User.create(first_name: "Sammy", last_name: "Mernick", email: "smernick3@gmail.com", password: "funfunfun")
justin = User.create(first_name: "Justin", last_name: "Curhan", email: "justin.curhan@gmail.com", password: "funfunfun")
liz = User.create(first_name: "Liz", last_name: "Kalina", email: "liz.kalina@gmail.com", password: "funfunfun")
holly = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")


# DEMONSTRATION SEEDS
justin.addresses << Address.create(street: "11 Broadway", apt_num: "Apt 1", city: "New York", state: "NY", zip: "10004", country: "USA")
psych_101 = Textbook.create(title: "Psych 101", isbn: "9781440543937")
fresh = Condition.create(name: "Fresh")
very_good = Condition.create(name: "Very Good")
good = Condition.create(name: "Good")
acceptable = Condition.create(name: "Acceptable")
trash = Condition.create(name: "Trash")
UserBook.create(textbook: psych_101, user: sammy, condition: fresh )
UserBook.create(textbook: psych_101, user: liz, condition: very_good )
UserBook.create(textbook: psych_101, user: holly, condition: good )
UserBook.create(textbook: psych_101, user: sammy, condition: good )
UserBook.create(textbook: psych_101, user: liz, condition: acceptable )
UserBook.create(textbook: psych_101, user: holly, condition: trash )

# FAKER DATA

10.times do
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "funfunfun")
end

User.all.each_with_index do |user, i|
    user.karma.update(balance:500.0)
  if i.even?
    user.addresses << Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  end
    user.addresses << Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
end

college1 = College.create(name: "University of Pennsylvania")
college2 = College.create(name: "Princeton University")
college3 = College.create(name: "Yale University")
college4 = College.create(name: "Columbia University")
college5 = College.create(name: "Simon Fraser University")
college6 = College.create(name: "University of British Columbia")
college7 = College.create(name: "Texas State University")
college8 = College.create(name: "George Washington University")
college9 = College.create(name: "New York University")
college10 = College.create(name: "Brown University")

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

100.times do
  UserBook.create(textbook: Textbook.all.sample, user: User.all.sample, condition: Condition.all.sample )
end
