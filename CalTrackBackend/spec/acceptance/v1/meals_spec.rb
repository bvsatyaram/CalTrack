require 'acceptance_helper'

resource "Meals" do
  header "Accept", "application/json"
  header "Content-Type", "application/json"

  get "/v1/meals" do
    example "Listing meals" do
      do_request

      expect(status).to eq(200)
    end
  end
end
