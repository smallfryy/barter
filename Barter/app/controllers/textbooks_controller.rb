class TextbooksController < ApplicationController
  before_action :set_textbook, only: [:show]

  def index

  end


  def show
  end


  def search
    search = params[:q]
    @textbook = Textbook.find_by(isbn: search)
    redirect_to @textbook
  end


private

 def set_textbook
   @textbook = Textbook.find(params[:id])
 end


end
