Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'scores#index'
  resources :scores, only: [:create, :new]
end
