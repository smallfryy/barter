module Adapters
  class TextbookClient

    def self.connection
      @connection ||= Adapters::GoogleConnection.new()
    end

    def self.find_textbooks(textbook_query)
      information = connection.query(textbook_query)
      construct_textbook_objects(information).compact
    end

    def self.find_retail_price(textbook)
      information = connection.query(textbook.isbn)
      retail_price = information["items"].first["saleInfo"]["retailPrice"]
      if retail_price && retail_price["currencyCode"] == "USD"
        retail_price["amount"]
      end
    end

    def self.construct_textbook_objects(information)
      information["items"].collect do |item|
        author = item["volumeInfo"]["authors"].join(", ") if item["volumeInfo"]["authors"].present?
        title = item["volumeInfo"]["title"] if item["volumeInfo"]["title"].present?
        industry_identifier = connection.returns_industry_identifier(item)
        img_url = item["volumeInfo"]["imageLinks"]["thumbnail"] if item["volumeInfo"]["imageLinks"].present?
        publisher = item["volumeInfo"]["publisher"] if item["volumeInfo"]["publisher"].present?
        description = item["volumeInfo"]["description"] if item["volumeInfo"]["description"].present?
        published_date = item["volumeInfo"]["publishedDate"] if item["volumeInfo"]["publishedDate"].present?

        if industry_identifier.present?
          textbook = Textbook.find_or_create_by(isbn: industry_identifier)
          textbook.update(title: title, isbn: industry_identifier, author: author, published_date: published_date, img_url: img_url, description: description)
        end

        if item["volumeInfo"]["categories"].present? && industry_identifier.present?
          # textbook.subjects << we need to build a find or a create for textbook

          subjects_string = item["volumeInfo"]["categories"][0]
          subject_array = subjects_string.gsub("&", '').split()

          subject_array.each do |subject|
            new_subj = subject.capitalize
            subject_object = Subject.find_or_create_by(name: new_subj)
            textbook.subjects << subject_object
          end
        end

        textbook
      end

    end

  end
end
