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
    @students = @college.users.sort_by{|user| user.num_books_for_sale}.reverse
    @textbooks = Textbook.joins(:user_books).joins(:users).where('users.college_id = ?', @college.id).uniq.sort_by{|textbook| textbook.title}
  
  end 

  def index 
    @colleges = College.all
  end

end
