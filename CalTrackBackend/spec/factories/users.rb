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
