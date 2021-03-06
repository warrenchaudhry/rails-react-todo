class TodoItem < ApplicationRecord
  belongs_to :user

  validates :title, presence: true

  default_scope { order(created_at: :desc) }
end
