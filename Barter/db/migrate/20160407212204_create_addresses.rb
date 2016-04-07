class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.integer :addressable_id
      t.string :addressable_type
      t.string :street
      t.string :apt_num
      t.string :city
      t.string :state
      t.integer :zip
      t.string :country

      t.timestamps null: false
    end
  end
end
