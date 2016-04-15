class ChangeColumnTypeKarmaItemToFloatLineItem < ActiveRecord::Migration
  def change
    change_column :line_items, :item_karma, :float
  end
end
