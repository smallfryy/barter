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

module AddressesHelper
end
