require 'rails_helper'

RSpec.describe "Pages", type: :request do
  describe "GET /home" do
    it "returns http success" do
      get "/pages/home"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /my_todo_items" do
    it "returns http success" do
      get "/pages/my_todo_items"
      expect(response).to have_http_status(:success)
    end
  end

end
