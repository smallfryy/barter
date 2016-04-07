class CreateTextbooks < ActiveRecord::Migration
  def change
    create_table :textbooks do |t|
      t.string :title
      t.string :ISBN
      t.string :edition

      t.timestamps null: false
    end
  end
end
