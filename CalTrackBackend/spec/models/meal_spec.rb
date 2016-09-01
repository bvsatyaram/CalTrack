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

require 'rails_helper'

RSpec.describe Meal, type: :model do
  let(:subject) {FactoryGirl.build(:meal)}
  context 'Associations' do
    it { should belong_to(:user) }
  end
  context 'Validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:time) }
    it { should validate_presence_of(:calories) }
    it { should validate_numericality_of(:calories) }
    it { should validate_presence_of(:user) }
  end
end
