Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :spots, only: [:index, :show, :create]
    resources :spot_images, only: [:index, :show, :create]
  end
end
