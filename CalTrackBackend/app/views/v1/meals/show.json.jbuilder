json.data do
  json.id @meal.id
  json.type Meal.name
  json.attributes do
    json.title @meal.title
    json.time @meal.time
    json.calories @meal.calories
  end
  json.links do
    json.self v1_meal_url(@meal)
  end
end
