class AddCustomPriceToUserBooks < ActiveRecord::Migration
  def change
    add_column :user_books, :custom_price, :float
  end
end
