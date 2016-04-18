# == Schema Information
#
# Table name: colleges
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CollegesController < ApplicationController

  def show
  @college = College.find(params[:id])
  end 

  def index 
  @colleges = College.all
  @colleges = College.paginate(:page => params[:page], :per_page => 5)

  end 

end
