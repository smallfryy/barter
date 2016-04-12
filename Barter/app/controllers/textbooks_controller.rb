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
<<<<<<< HEAD
    @search = params[:query]
=======
    query = params[:query]
    @books = Adapters::TextbookClient.find_by_name(query)
>>>>>>> dad429d21762ba13544d6025bd839d336b4e4f54
  end


  def show
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
