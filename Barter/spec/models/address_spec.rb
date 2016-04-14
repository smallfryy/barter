# == Schema Information
#
# Table name: addresses
#
#  id               :integer          not null, primary key
#  addressable_id   :integer
#  addressable_type :string
#  street           :string
#  apt_num          :string
#  city             :string
#  state            :string
#  zip              :integer
#  country          :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require_relative "../spec_helper.rb"

RSpec.describe Address, type: :model do


  user = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")
  address1 = Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  address2 = Address.create(street: Faker::Address.street_address, apt_num: Faker::Address.secondary_address, city: Faker::Address.city, state: Faker::Address.state, zip: Faker::Address.zip, country: "USA")
  user.addresses << address1
  user.addresses << address2
  user.save


  describe 'relationship' do
    it 'address can belong to a user' do
      binding.pry
    expect(user.addresses.first.addressable_type).to eq("User")
    end
  end

end
