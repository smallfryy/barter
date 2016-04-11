class CreateConditionTable < ActiveRecord::Migration
  def change
    create_table :conditions do |t|
      t.string :type
    end
  end
end
