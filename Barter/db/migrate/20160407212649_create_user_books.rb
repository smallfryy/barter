class CreateUserBooks < ActiveRecord::Migration
  def change
    create_table :user_books do |t|
      t.integer :textbook_id
      t.integer :user_id
      t.boolean :sold, default: false
      t.string :condition

      t.timestamps null: false
    end
  end
end
