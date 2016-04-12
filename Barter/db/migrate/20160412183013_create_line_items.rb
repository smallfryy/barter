class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|

      t.integer :buyer_id
      t.integer :user_books_id
      t.integer :cart_id
      t.integer :item_karma, default: 0
      t.boolean :purchased, default: false
      t.boolean :shipped, default: false
      t.boolean :received, default: false

      t.timestamps null: false
    end
  end
end
