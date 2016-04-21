# == Schema Information
#
# Table name: karmas
#
#  id         :integer          not null, primary key
#  balance    :float            default(0.0)
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class KarmasController < ApplicationController
  def update
    friend_karma = Karma.find(params[:friendId])
    @sender_karma = Karma.find(params[:id])
    if @sender_karma.balance - params[:amount].to_f < 0
        @message = "You unfortunately don't have enough karma."
        render json: {message: @message}
    else
        friend_karma.balance += params[:amount].to_f
        @sender_karma.balance -= params[:amount].to_f
        friend_karma.save
        @sender_karma.save
        render json: {sender_karma: @sender_karma}
    end
  end
end
