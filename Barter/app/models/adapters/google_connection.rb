require 'httparty'
require 'openssl'
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

module Adapters
  class GoogleConnection
    include HTTParty
    attr_reader :connection

    def initialize
      @connection = self.class
    end

    def query(query)
      connection.get("https://www.googleapis.com/books/v1/volumes?q=#{query}&maxResults=5")
    end
  end
end