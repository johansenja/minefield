class ScoresController < ApplicationController

  def index
    scores_reverse = Score.all.sort_by(&:score)
    @scores = scores_reverse.reverse.first(10)
    @recents = Score.all.sort_by(&:created_at).reverse.first(10)
    @score = Score.new
  end

  def create
    @score = Score.new(score_params)
    @score.name = @score.name.gsub(/\</, "")
    @score.save
    redirect_to root_path
  end

  private

  def score_params
    params.require(:score).permit(:name, :score)
  end
end
