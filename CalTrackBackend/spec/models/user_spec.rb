# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  provider               :string           default("email"), not null
#  uid                    :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  name                   :string
#  nickname               :string
#  image                  :string
#  email                  :string
#  tokens                 :json
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  admin                  :boolean          default(FALSE)
#  target_calories        :integer          default(2000)
#  manager                :boolean          default(FALSE)
#

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:subject) {FactoryGirl.build(:user)}
  context 'Associations' do
    it { should have_many(:meals) }
  end
  context 'Validations' do
    it { should validate_presence_of(:target_calories) }
    it { should validate_numericality_of(:target_calories) }
  end
end
