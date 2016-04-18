# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Address.destroy_all
College.destroy_all
Subject.destroy_all
Textbook.destroy_all
TextbookSubject.destroy_all
UserBook.destroy_all
User.destroy_all
Karma.destroy_all

# COLLEGES

college1 = College.create(name: "University of Pennsylvania")
college2 = College.create(name: "Princeton University")
college3 = College.create(name: "Yale University")
college4 = College.create(name: "Columbia University")
college5 = College.create(name: "George Washington University")
college6 = College.create(name: "New York University")

# ADMIN SEEDS

sammy = User.create(first_name: "Sammy", last_name: "Mernick", email: "smernick3@gmail.com", password: "funfunfun", college_id: college5.id)
justin = User.create(first_name: "Justin", last_name: "Curhan", email: "justin.curhan@gmail.com", password: "funfunfun", college_id: college1.id)
liz = User.create(first_name: "Liz", last_name: "Kalina", email: "liz.kalina@gmail.com", password: "funfunfun", college_id: college3.id)
holly = User.create(first_name: "Holly", last_name: "Peck", email: "holly.m.peck@gmail.com", password: "funfunfun", college_id: college2.id)


# DEMONSTRATION SEEDS

# USERS

user1 = User.create(first_name: "Steve", last_name: "Jobs", email: "steve.jobs@gmail.com", password: "funfunfun", college_id: college1.id)
user2 = User.create(first_name: "Jeff", last_name: "Katz", email: "jeffkatz@gmail.com", password: "funfunfun", college_id: college1.id)
user3 = User.create(first_name: "Ian", last_name: "Candy", email: "iancandy@gmail.com", password: "funfunfun", college_id: college1.id)
user4 = User.create(first_name: "Pete", last_name: "Tong", email: "petetong@gmail.com", password: "funfunfun", college_id: college1.id)
user5 = User.create(first_name: "Danny", last_name: "Gilberg", email: "dannyg@gmail.com", password: "funfunfun", college_id: college2.id)
user6 = User.create(first_name: "Richard", last_name: "Smith", email: "richardsmith@gmail.com", password: "funfunfun", college_id: college2.id)
user7 = User.create(first_name: "Joe", last_name: "McMann", email: "joem@gmail.com", password: "funfunfun", college_id: college2.id)
user8 = User.create(first_name: "Tom", last_name: "Brady", email: "tbrady@gmail.com", password: "funfunfun", college_id: college2.id)
user9 = User.create(first_name: "Leon", last_name: "Harary", email: "leonh@gmail.com", password: "funfunfun", college_id: college3.id)
user10 = User.create(first_name: "Mike", last_name: "Amouyal", email: "ma123@gmail.com", password: "funfunfun", college_id: college3.id)
user11 = User.create(first_name: "Sam", last_name: "Summers", email: "ssummers@gmail.com", password: "funfunfun", college_id: college3.id)
user12 = User.create(first_name: "Noredy", last_name: "Neal", email: "nneal@gmail.com", password: "funfunfun", college_id: college3.id)
user13 = User.create(first_name: "Kevin", last_name: "O'Leary", email: "kevino@gmail.com", password: "funfunfun", college_id: college4.id)
user14 = User.create(first_name: "Josh", last_name: "Johnson", email: "joshj@gmail.com", password: "funfunfun", college_id: college4.id)
user15 = User.create(first_name: "Peter", last_name: "Gimbel", email: "pg@gmail.com", password: "funfunfun", college_id: college4.id)
user16 = User.create(first_name: "Ari", last_name: "Gold", email: "arigold@gmail.com", password: "funfunfun", college_id: college4.id)
user17 = User.create(first_name: "Ben", last_name: "Johnson", email: "benj@gmail.com", password: "funfunfun", college_id: college5.id)
user18 = User.create(first_name: "Scott", last_name: "Geftman", email: "scottg@gmail.com", password: "funfunfun", college_id: college5.id)
user19 = User.create(first_name: "Nelson", last_name: "Iginla", email: "nelson@gmail.com", password: "funfunfun", college_id: college5.id)
user20 = User.create(first_name: "Harry", last_name: "Birnbaum", email: "bharry@gmail.com", password: "funfunfun", college_id: college5.id)
user21 = User.create(first_name: "Christopher", last_name: "Strat", email: "chrisstrat@gmail.com", password: "funfunfun", college_id: college6.id)
user22 = User.create(first_name: "Eddy", last_name: "Chan", email: "eddychan@gmail.com", password: "funfunfun", college_id: college6.id)
user23 = User.create(first_name: "Dan", last_name: "Lee", email: "danlee@gmail.com", password: "funfunfun", college_id: college6.id)
user24 = User.create(first_name: "Michael", last_name: "Milano", email: "mikemp@gmail.com", password: "funfunfun", college_id: college6.id)

# CONDITIONS

fresh = Condition.create(name: "Fresh")
very_good = Condition.create(name: "Very Good")
good = Condition.create(name: "Good")
acceptable = Condition.create(name: "Acceptable")
trash = Condition.create(name: "Trash")

# KARMA

justin.karma.balance = 250.09
justin.save 

# sammy_karma = Karma.create(balance: 220.50, user_id: sammy)
# liz_karma = Karma.create(balance: 203.74, user_id: liz)
# holly_karma = Karma.create(balance: 235.00, user_id: holly)

# user1_karma = Karma.create(balance: 235.00, user_id: user1)
# user2_karma = Karma.create(balance: 35.00, user_id: user2)
# user3_karma = Karma.create(balance: 25.50, user_id: user3)
# user4_karma = Karma.create(balance: 21.01, user_id: user4)
# user5_karma = Karma.create(balance: 54.90, user_id: user5)
# user6_karma = Karma.create(balance: 4.50, user_id: user6)
# user7_karma = Karma.create(balance: 3.02, user_id: user7)
# user8_karma = Karma.create(balance: 22.76, user_id: user8)
# user9_karma = Karma.create(balance: 215.10, user_id: user9)
# user10_karma = Karma.create(balance: 14.14, user_id: user10)
# user11_karma = Karma.create(balance: 67.54, user_id: user11)
# user12_karma = Karma.create(balance: 101.55, user_id: user12)
# user13_karma = Karma.create(balance: 56.98, user_id: user13)
# user14_karma = Karma.create(balance: 0, user_id: user14)
# user15_karma = Karma.create(balance: 235.00, user_id: user15)
# user16_karma = Karma.create(balance: 0, user_id: user16)
# user17_karma = Karma.create(balance: 45.00, user_id: user17)
# user18_karma = Karma.create(balance: 77.78, user_id: user18)
# user19_karma = Karma.create(balance: 61.08, user_id: user19)
# user20_karma = Karma.create(balance: 99.99, user_id: user20)
# user21_karma = Karma.create(balance: 305.10, user_id: user21)
# user22_karma = Karma.create(balance: 101.89, user_id: user22)
# user23_karma = Karma.create(balance: 10.05, user_id: user23)
# user24_karma = Karma.create(balance: 0, user_id: user24)

# ADDRESSES

justin.addresses << Address.create(street: "11 Broadway", apt_num: "Fl 2", city: "New York", state: "NY", zip: "10004", country: "USA")
justin.addresses << Address.create(street: "525 E 14th St", apt_num: "Apt 4H", city: "New York", state: "NY", zip: "10009", country: "USA")

sammy.addresses << Address.create(street: "11 Broadway", apt_num: "Fl 2", city: "New York", state: "NY", zip: "10004", country: "USA")
sammy.addresses << Address.create(street: "120 E 34th St", apt_num: "Apt 3K", city: "New York", state: "NY", zip: "10016", country: "USA")

liz.addresses << Address.create(street: "11 Broadway", apt_num: "Fl 2", city: "New York", state: "NY", zip: "10004", country: "USA")
liz.addresses << Address.create(street: "90 Park Avenue", apt_num: "Apt 18", city: "New York", state: "NY", zip: "10016", country: "USA")

holly.addresses << Address.create(street: "11 Broadway", apt_num: "Fl 2", city: "New York", state: "NY", zip: "10004", country: "USA")
holly.addresses << Address.create(street: "74 Wythe Ave", apt_num: "Apt 1", city: "Brooklyn", state: "NY", zip: "11249", country: "USA")


# TEXTBOOKS

harry_potter = Textbook.create(title: "Harry Potter and the Sorcerer's Stone", isbn: "9781781100486", author: "J.K. Rowling, Olly Moss", img_url: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "\"Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H'.\" Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!")
psych_101 = Textbook.create(title: "Psych 101", isbn: "9781440543937", author: "Paul Kleinman", img_url:"http://books.google.com/books/content?id=8RJTZLmCUtcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "A hands-on approach to exploring the human mind Too often, textbooks turn the noteworthy theories, principles, and experiments of psychology into tedious discourse that even Freud would want to repress. Psych 101 cuts out the boring details and statistics, and instead, gives you a lesson in psychology that keeps you engaged - and your synapses firing. From personality quizzes and the Rorschach Blot Test to B.F. Skinner and the stages of development, this primer for human behavior is packed with hundreds of entertaining psychology basics and quizzes you can't get anywhere else. So whether you're looking to unravel the intricacies of the mind, or just want to find out what makes your friends tick, Psych 101 has all the answers - even the ones you didn't know you were looking for.", published_date: "2012-08-18")

javascript = Textbook.create(title: "JavaScript and JQuery", isbn: "9781118871652", author: "Jon Duckett", img_url: "http://books.google.com/books/content?id=_uTRAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This book covers: 1. Basic programming concepts - assuming no prior knowledge of programming beyond an ability to create a web page using HTML & CSS ; 2. Core elements of the JavaScript language - so you can learn how to write your own scripts from scratch ; 3. jQuery - which will allow you to simplify the process of writing scripts (this is introduced half-way through the book once you have a solid understanding of JavaScript) ; 4. How to recreate techniques you will have seen on other web sites such as sliders, content filters, form validation, updating content using Ajax, and more. Each chapter: Breaks subjects down into bite-sized chunks with a new topic on each page ; Contains clear descriptions of syntax, each one demonstrated with inspiring code samples ; Uses diagrams and photography to explain complex concepts in a visual way. This book enables you to use & customize thousands of scripts, JavaScript APIs, and jQuery plugins that are freely available on the web as well as create your own scripts from scratch.", published_date: "2014-07-21")
javascript2 = Textbook.create(title: "JavaScript: The Good Parts", isbn: "9780596554873", author: "Douglas Crockford", img_url: "http://books.google.com/books/content?id=PXa2bby0oQ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code. Considered the JavaScript expert by many people in the development community, author Douglas Crockford identifies the abundance of good ideas that make JavaScript an outstanding object-oriented programming language-ideas such as functions, loose typing, dynamic objects, and an expressive object literal notation. Unfortunately, these good ideas are mixed in with bad and downright awful ideas, like a programming model based on global variables. When Java applets failed, JavaScript became the language of the Web by default, making its popularity almost completely independent of its qualities as a programming language. In JavaScript: The Good Parts, Crockford finally digs through the steaming pile of good intentions and blunders to give you a detailed look at all the genuinely elegant parts of JavaScript, including: Syntax Objects Functions Inheritance Arrays Regular expressions Methods Style Beautiful features The real beauty? As you move ahead with the subset of JavaScript that this book presents, you'll also sidestep the need to unlearn all the bad parts. Of course, if you want to find out more about the bad parts and how to use them badly, simply consult any other JavaScript book. With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must.", published_date: "2008-05-08")
javascript3 = Textbook.create(title: "High Performance JavaScript", isbn: "9781449388744", author: "Nicholas C. Zakas", img_url: "http://books.google.com/books/content?id=ED6ph4WEIoQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "If you're like most developers, you rely heavily on JavaScript to build interactive and quick-responding web applications. The problem is that all of those lines of JavaScript code can slow down your apps. This book reveals techniques and strategies to help you eliminate performance bottlenecks during development. You'll learn how to improve execution time, downloading, interaction with the DOM, page life cycle, and more. Yahoo! frontend engineer Nicholas C. Zakas and five other JavaScript experts—Ross Harmes, Julien Lecomte, Steven Levithan, Stoyan Stefanov, and Matt Sweeney—demonstrate optimal ways to load code onto a page, and offer programming tips to help your JavaScript run as efficiently and quickly as possible. You'll learn the best practices to build and deploy your files to a production environment, and tools that can help you find problems once your site goes live. Identify problem code and use faster alternatives to accomplish the same task Improve scripts by learning how JavaScript stores and accesses data Implement JavaScript code so that it doesn't slow down interaction with the DOM Use optimization techniques to improve runtime performance Learn ways to ensure the UI is responsive at all times Achieve faster client-server communication Use a build system to minify files, and HTTP compression to deliver them to the browser", published_date: "2010-03-11")

american_history = Textbook.create(title: "American History", isbn: "9780195389142", author: "Paul S. Boyer", img_url: "http://books.google.com/books/content?id=C6B13ky6vkQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This volume in Oxford's A Very Short Introduction series offers a concise, readable narrative of the vast span of American history, from the earliest human migrations to the early twenty-first century when the United States loomed as a global power and comprised a complex multi-cultural society of more than 300 million people. The narrative is organized around major interpretive themes, with facts and dates introduced as needed to illustrate these themes. The emphasis throughout is on clarity and accessibility to the interested non-specialist.", published_date: "2012-08-09")
american_history2 = Textbook.create(title: "Twelve Years a Slave", isbn: "9780807101506")
american_history3 = Textbook.create(title: "1776", isbn: "9780743287708")

finance1 = Textbook.create(title: "Introductory Econometrics for Finance", isbn: "9780521694681")
finance2 = Textbook.create(title: "Handbook of Health Care Accounting and Finance", isbn: "9780834200562")

calc1 = Textbook.create(title: "Calculus: Early Transcendentals", isbn: "9780538497909")
calc2 = Textbook.create(title: "Discovering Statistics Using SAS", isbn: "9781849200929")

spanish = Textbook.create(title: "Spanish Pronouns and Prepositions", isbn: "9780764134647")
french = Textbook.create(title: "A Concise History of the French Revolution", isbn: "9780742534117")
chinese = Textbook.create(title: "The One Hour China Book", isbn: "9780991445028")
japanese = Textbook.create(title: "Traditional Japanese Music and Musical Instruments", isbn: "9784770023957")

art1 = Textbook.create(title: "Art History: A Very Short Introduction", isbn: "9780191577598")
art2 = Textbook.create(title: "Is Art History Global?", isbn: "9781135867669")
art3 = Textbook.create(title: "Critical Terms for Art History, Second Edition", isbn: "9780226571690")

# USER_BOOKS

UserBook.create(textbook: psych_101, user: justin, condition: fresh )
UserBook.create(textbook: psych_101, user: user1, condition: very_good )
UserBook.create(textbook: psych_101, user: holly, condition: good )
UserBook.create(textbook: psych_101, user: sammy, condition: good )
UserBook.create(textbook: psych_101, user: user24, condition: acceptable )
UserBook.create(textbook: psych_101, user: user16, condition: trash )


UserBook.create(textbook: harry_potter, user: user11, condition: fresh )
UserBook.create(textbook: harry_potter, user: liz, condition: very_good )
UserBook.create(textbook: harry_potter, user: justin, condition: good )
UserBook.create(textbook: harry_potter, user: user1, condition: good )
UserBook.create(textbook: harry_potter, user: user23, condition: acceptable )
UserBook.create(textbook: harry_potter, user: holly, condition: trash )


UserBook.create(textbook: javascript, user: user12, condition: fresh )
UserBook.create(textbook: javascript, user: user22, condition: very_good )
UserBook.create(textbook: javascript, user: justin, condition: good )
UserBook.create(textbook: javascript, user: user2, condition: good )
UserBook.create(textbook: javascript, user: liz, condition: acceptable )
UserBook.create(textbook: javascript, user: sammy, condition: trash )


UserBook.create(textbook: javascript2, user: user13, condition: fresh )
UserBook.create(textbook: javascript2, user: liz, condition: very_good )
UserBook.create(textbook: javascript2, user: holly, condition: good )
UserBook.create(textbook: javascript2, user: user3, condition: good )
UserBook.create(textbook: javascript2, user: user9, condition: acceptable )
UserBook.create(textbook: javascript2, user: user17, condition: trash )


UserBook.create(textbook: javascript3, user: user14, condition: fresh )
UserBook.create(textbook: javascript3, user: sammy, condition: very_good )
UserBook.create(textbook: javascript3, user: user23, condition: good )
UserBook.create(textbook: javascript3, user: user4, condition: good )
UserBook.create(textbook: javascript3, user: liz, condition: acceptable )
UserBook.create(textbook: javascript3, user: user7, condition: trash )

UserBook.create(textbook: american_history, user: user15, condition: fresh )
UserBook.create(textbook: american_history, user: holly, condition: very_good )
UserBook.create(textbook: american_history, user: user24, condition: good )
UserBook.create(textbook: american_history, user: user5, condition: good )
UserBook.create(textbook: american_history, user: liz, condition: acceptable )
UserBook.create(textbook: american_history, user: user2, condition: trash )

UserBook.create(textbook: american_history2, user: user16, condition: fresh )
UserBook.create(textbook: american_history2, user: user24, condition: very_good )
UserBook.create(textbook: american_history2, user: user9, condition: good )
UserBook.create(textbook: american_history2, user: user6, condition: good )
UserBook.create(textbook: american_history2, user: liz, condition: acceptable )
UserBook.create(textbook: american_history2, user: justin, condition: trash )

UserBook.create(textbook: american_history3, user: user17, condition: fresh )
UserBook.create(textbook: american_history3, user: user12, condition: very_good )
UserBook.create(textbook: american_history3, user: user20, condition: good )
UserBook.create(textbook: american_history3, user: user7, condition: good )
UserBook.create(textbook: american_history3, user: user22, condition: acceptable )
UserBook.create(textbook: american_history3, user: sammy, condition: trash )

UserBook.create(textbook: finance1, user: user18, condition: fresh )
UserBook.create(textbook: finance1, user: liz, condition: very_good )
UserBook.create(textbook: finance1, user: holly, condition: good )
UserBook.create(textbook: finance1, user: user8, condition: good )
UserBook.create(textbook: finance1, user: user3, condition: acceptable )
UserBook.create(textbook: finance1, user: sammy, condition: trash )

UserBook.create(textbook: finance2, user: user19, condition: fresh )
UserBook.create(textbook: finance2, user: user2, condition: very_good )
UserBook.create(textbook: finance2, user: user22, condition: good )
UserBook.create(textbook: finance2, user: user9, condition: good )
UserBook.create(textbook: finance2, user: user15, condition: acceptable )
UserBook.create(textbook: finance2, user: user13, condition: trash )

UserBook.create(textbook: calc1, user: user20, condition: fresh )
UserBook.create(textbook: calc1, user: user5, condition: very_good )
UserBook.create(textbook: calc1, user: justin, condition: good )
UserBook.create(textbook: calc1, user: user12, condition: good )
UserBook.create(textbook: calc1, user: sammy, condition: acceptable )
UserBook.create(textbook: calc1, user: user16, condition: trash )

UserBook.create(textbook: calc2, user: user21, condition: fresh )
UserBook.create(textbook: calc2, user: user14, condition: very_good )
UserBook.create(textbook: calc2, user: user8, condition: good )
UserBook.create(textbook: calc2, user: user11, condition: good )
UserBook.create(textbook: calc2, user: liz, condition: acceptable )
UserBook.create(textbook: calc2, user: sammy, condition: trash )


UserBook.create(textbook: spanish, user: user22, condition: fresh )
UserBook.create(textbook: spanish, user: user17, condition: very_good )
UserBook.create(textbook: spanish, user: sammy, condition: good )
UserBook.create(textbook: spanish, user: user12, condition: good )
UserBook.create(textbook: spanish, user: justin, condition: acceptable )
UserBook.create(textbook: spanish, user: user3, condition: trash )


UserBook.create(textbook: french, user: user23, condition: fresh )
UserBook.create(textbook: french, user: user2, condition: very_good )
UserBook.create(textbook: french, user: user7, condition: good )
UserBook.create(textbook: french, user: user13, condition: good )
UserBook.create(textbook: french, user: user19, condition: acceptable )
UserBook.create(textbook: french, user: user9, condition: trash )

UserBook.create(textbook: chinese, user: user24, condition: fresh )
UserBook.create(textbook: chinese, user: liz, condition: very_good )
UserBook.create(textbook: chinese, user: holly, condition: good )
UserBook.create(textbook: chinese, user: justin, condition: good )
UserBook.create(textbook: chinese, user: sammy, condition: acceptable )
UserBook.create(textbook: chinese, user: user14, condition: trash )


UserBook.create(textbook: japanese, user: user3, condition: fresh )
UserBook.create(textbook: japanese, user: user14, condition: very_good )
UserBook.create(textbook: japanese, user: user1, condition: good )
UserBook.create(textbook: japanese, user: user10, condition: good )
UserBook.create(textbook: japanese, user: user21, condition: acceptable )
UserBook.create(textbook: japanese, user: user18, condition: trash )

UserBook.create(textbook: art1, user: user7, condition: fresh )
UserBook.create(textbook: art1, user: justin, condition: very_good )
UserBook.create(textbook: art1, user: sammy, condition: good )
UserBook.create(textbook: art1, user: user20, condition: good )
UserBook.create(textbook: art1, user: liz, condition: acceptable )
UserBook.create(textbook: art1, user: holly, condition: trash )

UserBook.create(textbook: art2, user: user8, condition: fresh )
UserBook.create(textbook: art2, user: user24, condition: very_good )
UserBook.create(textbook: art2, user: user13, condition: good )
UserBook.create(textbook: art2, user: user10, condition: good )
UserBook.create(textbook: art2, user: user4, condition: acceptable )
UserBook.create(textbook: art2, user: user17, condition: trash )

UserBook.create(textbook: art3, user: user9, condition: fresh )
UserBook.create(textbook: art3, user: user15, condition: very_good )
UserBook.create(textbook: art3, user: user3, condition: good )
UserBook.create(textbook: art3, user: user16, condition: good )
UserBook.create(textbook: art3, user: user18, condition: acceptable )
UserBook.create(textbook: art3, user: user22, condition: trash )
