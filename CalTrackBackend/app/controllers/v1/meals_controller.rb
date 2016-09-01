class V1::MealsController < V1::BaseController
  before_action :fetch_meal, only: [:show, :update, :destroy]

  def index
    @meals = current_v1_user.meals.all
  end

  def show
  end

  def create
    @meal = current_v1_user.meals.new
    save_meal
  end

  def update
    save_meal
  end

  def destroy
    @meal.destroy
    render status: :no_content, nothing: :true
  end

private

  def fetch_meal
    @meal = current_v1_user.meals.find(params[:id])
  end

  def save_meal
    begin
      @meal.title = params[:data][:attributes][:title] if params[:data][:attributes][:title]
      @meal.time = Time.parse(params[:data][:attributes][:time]) if params[:data][:attributes][:time]
      @meal.calories = params[:data][:attributes][:calories] if params[:data][:attributes][:calories]
      @meal.save!
      render :show, status: ((action_name == 'create') ? :created : :accepted)
    rescue
      render template: 'v1/common/errors.json.jbuilder', status: :bad_request, locals: {errors: @meal.errors.full_messages}
    end
  end
end
