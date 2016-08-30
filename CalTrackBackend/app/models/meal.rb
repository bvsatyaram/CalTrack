# == Schema Information
#
# Table name: meals
#
#  id         :integer          not null, primary key
#  title      :string
#  time       :datetime
#  calories   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Meal < ApplicationRecord
  validates :title, presence: true
  validates :time, presence: true
  validates :calories, presence: true, numericality: true
end
