class V1::BaseController < ApplicationController
  before_action :authenticate_v1_user!, unless: :devise_controller?
end
