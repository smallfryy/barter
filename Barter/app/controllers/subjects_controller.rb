# == Schema Information
#
# Table name: subjects
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class SubjectsController < ApplicationController

  before_action :set_subject


  def show


  end

private


  def set_subject
    @subject = Subject.find(params[:id])
  end


end
