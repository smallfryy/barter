class ChangeConditionIdToInteger < ActiveRecord::Migration
  def change
    change_column :user_books, :condition_id, 'integer USING CAST(condition_id AS integer)'
  end
end
