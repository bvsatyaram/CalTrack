class V1::UsersController < V1::BaseController
  before_action :fetch_user, only: [:update, :destroy]

  def index
    @users = User.all
  end

  def update
    @user.target_calories = params[:data][:attributes][:target_calories]
    @user.admin = params[:data][:attributes][:admin] unless params[:data][:attributes][:admin].nil?
    @user.manager = params[:data][:attributes][:manager] unless params[:data][:attributes][:manager].nil?
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
end
