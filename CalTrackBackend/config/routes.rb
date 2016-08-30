Rails.application.routes.draw do
  api_version(:module => "V1", :path => {:value => "v1"}) do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :meals
    resources :users, only: [:index, :update, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
