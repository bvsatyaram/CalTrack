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

require 'rails_helper'

RSpec.describe Meal, type: :model do
  context 'Validations' do
    let(:meal) {FactoryGirl.build(:meal)}
    it 'validates title' do
      expect(meal).to be_valid
      meal.title = nil
      expect(meal).not_to be_valid
    end
    it 'validates time' do
      expect(meal).to be_valid
      meal.time = nil
      expect(meal).not_to be_valid
    end
    context 'validates calories' do
      it 'validates presence of calories' do
        expect(meal).to be_valid
        meal.calories = nil
        expect(meal).not_to be_valid
      end
      it 'validates numericality of calories' do
        expect(meal).to be_valid
        meal.calories = 'hundred'
        expect(meal).not_to be_valid
        meal.calories = 100
        expect(meal).to be_valid
      end
    end
  end
end
