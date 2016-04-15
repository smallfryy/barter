class UpdateLineItemFields < ActiveRecord::Migration
  def change
    remove_column :line_items, :purchased, :boolean
    add_column :line_items, :shipping_address_id, :integer
  end
end
