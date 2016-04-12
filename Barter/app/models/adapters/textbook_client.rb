module Adapters
  class TextbookClient

    def self.connection
      @connection ||= Adapters::GoogleConnection.new()
    end

    def self.find_by_name(textbook_query)
      information = connection.query(textbook_query)

      information["items"].collect do |item|
        # binding.pry

        author = item["volumeInfo"]["authors"].join(", ") if item["volumeInfo"]["authors"].present?
        title = item["volumeInfo"]["title"]
        isbn = item["volumeInfo"]["industryIdentifiers"].select{|item| item["type"] == "ISBN_13"}.first["identifier"] if item["volumeInfo"]["industryIdentifiers"].present?
        image_url = item["volumeInfo"]["imageLinks"]["thumbnail"]
        publisher = item["volumeInfo"]["publisher"]
        description = item["volumeInfo"]["description"]
        subject = item["volumeInfo"]["categories"]
        # retail_price = item["saleInfo"]["retailPrice"]["amount"]
        publisher_date = item["volumeInfo"]["publishedDate"]

        if isbn.present?
          textbook = Textbook.find_or_create_by(isbn: isbn)
          textbook.update(title: title, isbn: isbn, author: author, edition: publisher_date)
          # textbook.subjects << we need to build a find or a create for textbook
        end

        textbook
      end

    end
  end
end
