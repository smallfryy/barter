# == Schema Information
#
# Table name: user_books
#
#  id           :integer          not null, primary key
#  textbook_id  :integer
#  user_id      :integer
#  sold         :boolean          default(FALSE)
#  condition_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class UserBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :textbook
  belongs_to :condition

  def self.total_books_sold
    self.where(sold:true).count
  end

  def current_price
    retail_price = Adapters::TextbookClient.find_retail_price(self.textbook)
    if retail_price
      @condition_prices = self.textbook.calculate_condition_prices(retail_price)
      @condition_prices[self.condition.name.downcase.to_sym]
      binding.pry
    end
  end


end
