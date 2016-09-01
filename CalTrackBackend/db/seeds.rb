# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'rubygems'
require 'faker'

def dot
  print '.'
end

def say(msg = nil, level = 1)
  if msg.nil?
    puts ''
    return
  end

  msg = ('*' * level) + msg
  puts msg
end

def seed_users
  say 'Seeding Users'
  users = []
  ['user', 'admin', 'manager'].each do |username|
    user = User.find_or_create_by(email: "#{username}@caltrack.com") do |usr|
      usr.password = 'secret123'
      usr.password_confirmation = 'secret123'
      usr.target_calories = 2000
      usr.admin = (username == 'admin')
      usr.manager = (username == 'manager')
    end
    users.push(user)
    dot
  end
  say

  return users
end

def seed_meals(users)
  say 'Seeding Meals'
  users.each do |user|
    (30 - user.meals.count).times do
      meal = user.meals.new
      meal.title = Faker::Beer.name
      meal.time = Date.today - rand(10).days + rand(86400).seconds
      meal.calories = (1 + rand(15))*100
      meal.save
      dot
    end
  end
  say
end

say 'Seeding Data...'

if Rails.env.development?
  users = seed_users

  seed_meals(users)
end
say 'Done Seeding.'
