# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def dot
  print '.'
end

puts 'Destroying Existing Meals'
Meal.destroy_all

puts 'Seeding New Meals'
(0...10).each do |i|
  (5 + rand(5)).times do
    meal = Meal.new
    meal.title = Faker::Beer.name
    meal.time = Date.today - i.days + rand(86400).seconds
    meal.calories = (1 + rand(15))*100
    meal.save
    dot
  end
end

puts ''
puts 'Done'
