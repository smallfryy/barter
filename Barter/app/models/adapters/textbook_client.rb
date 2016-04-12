module Adapters
  class TextbookClient

    def self.connection
      @connection ||= Adapters::GoogleConnection.new()
    end

    def self.find_by_name(textbook_query)
      information = connection.query(textbook_query)
      binding.pry
    end
  end
end
