class ChangeUserBooksIdToUserBookOnLineItem < ActiveRecord::Migration
  def change
    rename_column :line_items, :user_books_id, :user_book_id
  end
end
