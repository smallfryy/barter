require_relative "../spec_helper.rb"

RSpec.describe Address, type: :model do
  DatabaseCleaner.clean


  user = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")
  address1 = Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  address2 = Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  user.addresses << address1
  user.addresses << address2
  user.save


  describe 'relationship' do
    it 'address can belong to a user' do
    expect(user.addresses.first.addressable_type).to eq("User")
    expect(user.addresses.first.addressable_id).to eq(user.id)
    end
  end

end
