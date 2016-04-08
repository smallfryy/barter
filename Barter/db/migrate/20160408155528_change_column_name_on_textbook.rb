class ChangeColumnNameOnTextbook < ActiveRecord::Migration
  def change
    rename_column :textbooks, :ISBN, :isbn
  end
end
