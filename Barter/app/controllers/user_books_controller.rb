class UserBooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_book, only: [:show]



  def show
    @textbook = @user_book.textbook
    @user = @user_book.user

    render json: {userBook: @user_book, user: @user, textbook: @textbook}
  end


  def create

    @user_book = UserBook.new(condition_id: params[:condition], textbook_id: params[:textbook_id], user: current_user)
    if @user_book.save
      render json: {userBook: @user_book, condition: @user_book.condition.name}
    end

  end

private

 def set_book
   @user_book = UserBook.find(params[:id])
 end

 def user_book_params
   params.require(:condition).permit(:id)
 end


end
