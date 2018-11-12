class Score < ApplicationRecord
  validates :name, presence: true, length: { maximum: 15 }
  validates :score, presence: true
end
