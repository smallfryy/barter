class CreateKarmas < ActiveRecord::Migration
  def change
    create_table :karmas do |t|
      t.integer :balance, default: 0
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
