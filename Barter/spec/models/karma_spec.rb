# == Schema Information
#
# Table name: karmas
#
#  id         :integer          not null, primary key
#  balance    :integer          default("0")
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# require_relative "../spec_helper.rb"
#
#
# RSpec.describe Karma, type: :model do
#
#   user = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun")
#   karma = Karma.create(user: user, balance: Faker::Number.between(0, 500))
#
#
#
#   describe 'relationship' do
#     it 'belongs to a user' do
#       binding.pry
#       expect(karma.user.email).to eq("holly.m.peck@gmail.com")
#     end
#   end
#
#
#
# end
