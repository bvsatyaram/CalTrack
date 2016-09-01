class V1::BaseController < ApplicationController
  include CanCan::ControllerAdditions

  before_action :authenticate_v1_user!, unless: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    deny_access!
  end

  def current_ability
    @current_ability ||= Ability.new(current_v1_user)
  end

protected
  def deny_access!(msg = 'Access Denied')
    render nothing: true, status: :unauthorized
  end
end
