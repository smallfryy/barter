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
#  custom_price :float
#

class UserBooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_book, only: [:show]


  def show
    @textbook = @user_book.textbook
    @user = @user_book.user
    @price = @user_book.custom_price.present? ? @user_book.format_custom_price : @user_book.format_current_price
    render json: {userBook: @user_book, userBookCondition: @user_book.condition.name, user: @user, textbook: @textbook, price: @price}
  end


  def create
    @user = current_user
    params[:custom_price].present? ? custom_price = params[:custom_price].gsub(/[^0-9|\.]/,'') : custom_price = nil
    @user_book = UserBook.new(condition_id:params[:condition], textbook_id:params[:textbook_id], user:current_user, custom_price:custom_price)
    @textbook = @user_book.textbook
    if @user_book.save
    render json: {userBook: @user_book, bookName: @user_book.textbook.title, condition: @user_book.condition.name, userName: @user_book.user.first_name, userBooksSold: @user_book.user.num_books_sold, listingDaysAgo: @user_book.listing_days_ago, userBookCount: @textbook.user_books.available.count }
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
