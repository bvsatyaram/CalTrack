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
#  user_id    :integer
#

class Meal < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :time, presence: true
  validates :calories, presence: true, numericality: true
  validates :user, presence: true
end
