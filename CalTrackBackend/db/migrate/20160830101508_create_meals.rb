class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.string :title
      t.datetime :time
      t.integer :calories

      t.timestamps
    end
  end
end
