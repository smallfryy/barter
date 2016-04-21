class Blackjack
  def initialize
    @deck = Deck.new.shuffle
    @p1 = Player.new
    @p2 = Player.new
    @players = [@p1,@p2]
  end

  


end

class Deck
  attr_accessor :cards 

  def initialize
    @cards = (4 * [2,3,4,5,6,7,8,9,10,10,10,10,11]).flatten
  end
end

class Player
  def initialize
    @hand = []
  end
end