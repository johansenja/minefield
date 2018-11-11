class ScoresController < ApplicationController

  def index
    scores_reverse = Score.all.sort_by(&:score)
    @scores = scores_reverse.reverse
    @score = Score.new
  end

  def create
    @score = Score.create(score_params)
    redirect_to root_path
  end

  private

  def score_params
    params.require(:score).permit(:name, :score)
  end
end
