class ChangeKarmaToFloat < ActiveRecord::Migration
  def change
    change_column :karmas, :balance, :float
  end
end
