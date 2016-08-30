class V1::MealsController < V1::BaseController
  def index
    @meals = Meal.all
  end
end
