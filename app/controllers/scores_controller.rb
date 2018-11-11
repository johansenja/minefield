class ScoresController < ApplicationController

  def index
    @scores = Score.all()
  end

  def create
  end

  def new
  end
end
