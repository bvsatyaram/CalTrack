json.data do
  json.id @user.id
  json.type User.name
  json.attributes do
    json.target_calories @user.target_calories
  end
end
