class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :user_books
  has_many :textbooks, through: :user_books
  has_one :karma
  belongs_to :college
  has_many :addresses, as: :addressable
  validates :first_name, :last_name, :email, presence: true

end