class V1::UsersController < V1::BaseController
  before_action :fetch_user, only: [:update, :destroy]

  def index
    deny_access! unless can? :index, User
    @users = User.all
  end

  def update
    deny_access! unless can? :update, @user
    deny_access! unless (params[:data][:attributes][:admin].nil? && params[:data][:attributes][:manager].nil?) || can?(:manage_role, @user)
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
    deny_access! unless can? :destroy, @user
    @user.destroy
    render status: :no_content, nothing: :true
  end

  private

  def fetch_user
    @user = User.find(params[:id])
  end
end
