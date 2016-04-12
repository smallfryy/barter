class TextbooksController < ApplicationController
  before_action :set_textbook, only: [:show]

  def index
    query = params[:query]
    @books = Adapters::TextbookClient.find_by_name(query)
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
