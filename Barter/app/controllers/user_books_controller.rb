class UserBooksController < ApplicationController
  before_action :set_book, only: [:show]



  def show
    @textbook = @user_book.textbook
    @user = @user_book.user

    render json: {userBook: @user_book, user: @user, textbook: @textbook}


  end




private

 def set_book
   @user_book = UserBook.find(params[:id])
 end


end
