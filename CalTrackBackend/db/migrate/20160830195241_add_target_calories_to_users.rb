class AddTargetCaloriesToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :target_calories, :integer, default: 2000
  end
end
