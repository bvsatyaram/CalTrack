require 'acceptance_helper'

resource "Meals" do
  let(:user) {FactoryGirl.build(:user)}

  before(:all) do
    FactoryGirl.create(:meal, title: "Cheese Burger", calories: 400)
    FactoryGirl.create(:meal, title: "Pizza", calories: 200, time: 6.hours.ago)
  end

  before(:each) do
    set_authentication_headers_for(user)
  end

  header "Accept", "application/json"
  header "Content-Type", "application/json"

  get "/v1/meals" do
    example "Listing meals" do
      do_request

      expect(status).to eq(200)
    end
  end
end
