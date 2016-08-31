class V1::UsersController < V1::BaseController
  before_action :fetch_user, only: [:update, :destroy]

  def index
    @users = User.all
  end

  def update
    @user.target_calories = params[:data][:attributes][:target_calories]
    if @user.save
      render :update, status: :accepted
    else
      render template: 'v1/common/errors.json.jbuilder', status: :bad_request, locals: {errors: @user.errors.full_messages}
    end
  end

  def destroy
    @user.destroy
    render status: :no_content, nothing: :true
  end

  private

  def fetch_user
    @user = User.find(params[:id])
  end

  def save_user
    begin
      @user.title = params[:data][:attributes][:title] if params[:data][:attributes][:title]
      @user.time = Time.parse(params[:data][:attributes][:time]) if params[:data][:attributes][:time]
      @user.calories = params[:data][:attributes][:calories] if params[:data][:attributes][:calories]
      @user.save!
      render :show, status: ((action_name == 'create') ? :created : :accepted)
    rescue
      render template: 'v1/common/errors.json.jbuilder', status: :bad_request, locals: {errors: @user.errors.full_messages}
    end
  end
end
