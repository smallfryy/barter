class ChangeColumnConditionOnUserBook < ActiveRecord::Migration
  def change
    rename_column :user_books, :condition, :condition_id
  end
end
