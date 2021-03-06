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

FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@caltrack.com" }
    password 'secret123'
    password_confirmation 'secret123'
    target_calories 2000

    factory :admin do
      admin true
    end

    factory :manager do
      manager true
    end
  end
end
