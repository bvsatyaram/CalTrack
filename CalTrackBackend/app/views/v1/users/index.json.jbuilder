json.data @users do |user|
  json.id user.id
  json.type User.name
  json.attributes do
    json.email user.email
    json.target_calories user.target_calories
    json.admin user.admin
    json.manager user.manager
  end
end
