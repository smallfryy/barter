class AddColumnsToTextbooks < ActiveRecord::Migration
  def change
     add_column :textbooks, :img_url, :string
     add_column :textbooks, :description, :text
     add_column :textbooks, :publisher, :string
     add_column :textbooks, :published_date, :string
  end
end
