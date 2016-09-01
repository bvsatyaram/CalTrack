require 'acceptance_helper'

resource "Meals" do
  let(:user) {User.find_by(email: 'user@caltrack.com')}

  before(:each) do
    set_authentication_headers_for(user)
  end

  header "Accept", "application/json"
  header "Content-Type", "application/json"

  get "/v1/meals" do
    example "Listing of Meals" do
      expect(path).to eq("/v1/meals")

      do_request
      expect(status).to eq(200)
    end
  end

  get "/v1/meals/:id" do
    let(:meal) {user.meals.first}
    let(:id) {meal.id}

    example "Show a Meal" do
      expect(path).to eq("/v1/meals/#{meal.id}")

      do_request
      expect(status).to eq(200)
    end
  end

  post "/v1/meals" do
    parameter :title, "CheeseBurger", required: true, scope: [:data, :attributes]
    parameter :time, "2016-09-01T13:40:33+05:30", required: true, scope: [:data, :attributes]
    parameter :calories, 200, required: true, scope: [:data, :attributes]

    let(:title) { "CheeseBurger" }
    let(:time) {"2016-09-01T13:40:33+05:30"}
    let(:calories) {200}

    example "Create a Meal" do

      # expect(params).to eq({"attributes"=>{"title"=>"CheeseBurger", "time"=>"2016-09-01T13:40:33+05:30", "calories"=>200}})
      # do_request
      # expect(path).to eq("/v1/meals")
      # expect(status).to eq(200)
    end
  end
end
