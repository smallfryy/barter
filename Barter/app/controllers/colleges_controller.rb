class CollegesController < ApplicationController

  def show
  @college = College.find(params[:id])
  end 

  def index 
  @colleges = College.all
  end 


end
