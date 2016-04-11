class AddAuthorToTextbooks < ActiveRecord::Migration
  def change
    add_column :textbooks, :author, :string
  end
end
