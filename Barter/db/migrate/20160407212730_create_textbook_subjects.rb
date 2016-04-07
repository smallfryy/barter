class CreateTextbookSubjects < ActiveRecord::Migration
  def change
    create_table :textbook_subjects do |t|
      t.integer :textbook_id
      t.integer :subject_id

      t.timestamps null: false
    end
  end
end
