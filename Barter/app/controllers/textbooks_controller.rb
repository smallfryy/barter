# == Schema Information
#
# Table name: textbooks
#
#  id             :integer          not null, primary key
#  title          :string
#  isbn           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  author         :string
#  img_url        :string
#  description    :text
#  publisher      :string
#  published_date :string
#

class TextbooksController < ApplicationController
  before_action :set_textbook, only: [:show]

  def index
    query = params[:query]
    @textbooks = Adapters::TextbookClient.find_textbooks(query)
    @textbooks = Textbook.paginate_by_sql('SELECT * FROM textbooks ORDER BY created_at DESC', :page => params[:page], :per_page => 2, total_entries: 10)
  end

  def show
    retail_price = Adapters::TextbookClient.find_retail_price(@textbook)
    if retail_price
      @condition_prices = @textbook.calculate_condition_prices(retail_price)
    end
  end

private

 def set_textbook
   @textbook = Textbook.find(params[:id])
 end


end
