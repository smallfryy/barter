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

    def returns_industry_identifier(item) #figure out where to put later
      unique_id = item["volumeInfo"]["industryIdentifiers"]

      if unique_id
        if unique_id.select{|item| item["type"] == "ISBN_13"}.first.present?
          unique_id.select{|item| item["type"] == "ISBN_13"}.first["identifier"]
        elsif unique_id.select{|item| item["type"] == "ISBN_10"}.first.present?
          unique_id.select{|item| item["type"] == "ISBN_10"}.first["identifier"]
        elsif unique_id.select{|item| item["type"] == "ISSN"}.first.present?
          unique_id.select{|item| item["type"] == "ISSN"}.first["identifier"]
        end
      end
    end

  end
end
