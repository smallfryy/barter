class UserMailer < ApplicationMailer

  def add_user_book(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Thanks for adding a textbook')
  end

end
