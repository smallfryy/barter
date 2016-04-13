class RemoveEditionFromTextbooks < ActiveRecord::Migration
  def change
    remove_column :textbooks, :edition, :string
  end
end
