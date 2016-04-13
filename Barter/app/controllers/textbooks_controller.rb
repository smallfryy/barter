# == Schema Information
#
# Table name: textbooks
#
#  id         :integer          not null, primary key
#  title      :string
#  isbn       :string
#  edition    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author     :string
#

class TextbooksController < ApplicationController
  before_action :set_textbook, only: [:show]

  def index
    query = params[:query]
    @textbooks = Adapters::TextbookClient.find_textbooks(query)
  end

  def show
    retail_price = Adapters::TextbookClient.find_retail_price(@textbook)
    if retail_price
      @textbook.calculate_condition_prices(retail_price)
    end
  end


  # def search
  #   # @textbook = Textbook.find_or_create_by(isbn: search)
  #   # @textbooks = JSON.parse(params[:textbooks])
  #   #
  #   #
  #   render search_path(search)
  #
  # end


private

 def set_textbook
   @textbook = Textbook.find(params[:id])
 end


end
