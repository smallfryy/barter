class AddOrderDateToCarts < ActiveRecord::Migration
  def change
    add_column :carts, :order_date, :datetime
  end
end
