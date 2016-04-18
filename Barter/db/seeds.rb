


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



# justin = Karma.create(balance: 250.55, user_id: justin)
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
american_history2 = Textbook.create(title: "Twelve Years a Slave", isbn: "9780807101506", author: "Solomon Northup", img_url: "http://books.google.com/books/content?id=FZxw9pb2s28C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "Solomon Northup was a free man, the son of an emancipated Negro Slave. Until the spring of 1841 he lived a simple, uneventful life with his wife and three children in Upstate New York. Then, suddenly, he fell victim to a series of bizarre events that make this one of the most amazing autobiographies ever written. Northup accepted an offer from two strangers in Saratoga, New York, to catch up with their traveling circus and play in its band. But when the chase ended, Northup had been drugged, beaten, and sold to a slave trader in Washington, D.C. Subsequently, he was shipped to New Orleans, where he was purchased by a planter in the Red River region of Louisiana. For the next twelve years Northup lived as a chattel slave under several masters. He might well have died a slave, except for another set of bizarre circumstances which enabled him to get word to his family and finally regain his freedom. These elements alone -- the kidnapping, enslavement, and rescue -- are sufficient for a sensational story. But Northup provides more. He was a shrewd observer of people and events. His memory was remarkable. He described cultivation of cotton and sugar in the Deep South. He detailed the daily routine and general life of the Negro slave. Indeed, he vividly portrayed the world of slavery -- from the underside. Originally published in 1853, Northup's autobiography is regarded as one of the best accounts of American Negro slavery ever written by a slave. It is reprinted in full here for the first time, as the initial volume in The Library of Southern Civilization. Northup's account has been carefully checked by the editors and has been found to be remarkably accurate. To his own narrative of a long and tragic adventure, Professors Eakin and Logsdon have added significant new details about Northup and the plantation country where he spent most of his time as a slave. Heretofore unknown information about the capture and trial of Northup's kidnappers has been included, adding still another fascinating episode to an already astounding story.", published_date: "1968-04-01")
american_history3 = Textbook.create(title: "1776", isbn: "9780743287708", author: "David McCullough", img_url: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "America’s beloved and distinguished historian presents, in a book of breathtaking excitement, drama, and narrative force, the stirring story of the year of our nation’s birth, 1776, interweaving, on both sides of the Atlantic, the actions and decisions that led Great Britain to undertake a war against her rebellious colonial subjects and that placed America’s survival in the hands of George Washington. In this masterful book, David McCullough tells the intensely human story of those who marched with General George Washington in the year of the Declaration of Independence—when the whole American cause was riding on their success, without which all hope for independence would have been dashed and the noble ideals of the Declaration would have amounted to little more than words on paper. Based on extensive research in both American and British archives, 1776 is a powerful drama written with extraordinary narrative vitality. It is the story of Americans in the ranks, men of every shape, size, and color, farmers, schoolteachers, shoemakers, no-accounts, and mere boys turned soldiers. And it is the story of the King’s men, the British commander, William Howe, and his highly disciplined redcoats who looked on their rebel foes with contempt and fought with a valor too little known. Written as a companion work to his celebrated biography of John Adams, David McCullough’s 1776 is another landmark in the literature of American history.", published_date: "2005-05-24")

finance1 = Textbook.create(title: "Introductory Econometrics for Finance", isbn: "9781139472302", author: "Chris Brooks", img_url: "http://books.google.com/books/content?id=cJmZWBDnPrQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This best-selling textbook addresses the need for an introduction to econometrics specifically written for finance students. Key features: • Thoroughly revised and updated, including two new chapters on panel data and limited dependent variable models • Problem-solving approach assumes no prior knowledge of econometrics emphasising intuition rather than formulae, giving students the skills and confidence to estimate and interpret models • Detailed examples and case studies from finance show students how techniques are applied in real research • Sample instructions and output from the popular computer package EViews enable students to implement models themselves and understand how to interpret results • Gives advice on planning and executing a project in empirical finance, preparing students for using econometrics in practice • Covers important modern topics such as time-series forecasting, volatility modelling, switching models and simulation methods • Thoroughly class-tested in leading finance schools. Bundle with EViews student version 6 available. Please contact us for more details.", published_date: "2013-01-29")
finance2 = Textbook.create(title: "Handbook of Health Care Accounting and Finance", isbn: "9780834200562", author: "William O. Cleverley", img_url: "http://books.google.com/books/content?id=q-epKwamQZYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "More than 1,000 pages in this landmark publication cover areas that are critical to the sound financial management of health care organizations.", published_date: "1989")

calc1 = Textbook.create(title: "Calculus: Early Transcendentals", isbn: "9780538497909", author: "James Stewart", img_url: "http://books.google.com/books/content?id=QyOYWR9RLI8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "James Stewart’s CALCULUS: EARLY TRANSCENDENTALS texts are widely renowned for their mathematical precision and accuracy, clarity of exposition, and outstanding examples and problem sets. Millions of students worldwide have explored calculus through Stewart’s trademark style, while instructors have turned to his approach time and time again. In the Seventh Edition of CALCULUS: EARLY TRANSCENDENTALS, Stewart continues to set the standard for the course while adding carefully revised content. The patient explanations, superb exercises, focus on problem solving, and carefully graded problem sets that have made Stewart’s texts best-sellers continue to provide a strong foundation for the Seventh Edition. From the most unprepared student to the most mathematically gifted, Stewart’s writing and presentation serve to enhance understanding and build confidence. Important Notice: Media content referenced within the product description or the product text may not be available in the ebook version.", published_date: "2010-11-19")
calc2 = Textbook.create(title: "Discovering Statistics Using SAS", isbn: "9781849200929", author: "Andy P. Field, Jeremy Miles", img_url: "http://books.google.com/books/content?id=tT1wiG8pWFQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "Hot on the heels of Andy Field’s best-selling Discovering Statistics Using SPSS, Third Edition (2009), the author has teamed up with a co-author, Jeremy Miles, to adapt this textbook for SAS® using the most up-to-date commands and programming language available in latest release 9.2. As with its sister textbook, Discovering Statistics Using SAS® takes the entry level student from first principles right the way through to advanced level statistical concepts all the while grounding knowledge through the use of SAS®. Its approach is to teach statistical concepts as well as the computational principles, commands and language of the SAS® software package in one textbook, and given this comprehensive coverage this textbook should be enthusiastically adopted on a wide variety of statistics courses.", published_date: "2010-02-25")

spanish = Textbook.create(title: "Spanish Pronouns and Prepositions", isbn: "9780764134647", author: "Frank Nuessel", img_url: "http://books.google.com/books/content?id=SnPVnsMt144C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This supplementary reference guide for students of intermediate Spanish, provides a clear, step-by-step process explaining correct Spanish use of every kind of pronoun and preposition, and discusses interrogative pronouns, subject pronouns, reflexive pronouns and uses of, and more.", published_date: "2006")
french = Textbook.create(title: "A Concise History of the French Revolution", isbn: "9780742534117", author: "Sylvia Neely", img_url: "http://books.google.com/books/content?id=fccjTyOQiYwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This concise yet rich introduction to the French Revolution explores the origins, development, and eventual decline of a movement that defines France to this day. Through an accessible chronological narrative, Sylvia Neely explains the complex events, conflicting groups, and rapid changes that characterized this critical period in French history. She traces the fundamental transformations in government and society that forced the French to come up with new ways of thinking about their place in the world, ultimately leading to liberalism, conservatism, terrorism, and modern nationalism. Throughout, the author focuses on the essential political events that propelled the Revolution, at the same time deftly interweaving the intellectual, social, diplomatic, military, and cultural history of the time. Neely explains how the difficult choices made by the royal government and the revolutionaries alike not only brought on the collapse of the Old Regime but moved the nation into increasingly radical policies, to the Terror, and finally to the rise of Napoleon Bonaparte. Written with clarity and nuance, this work offers a deeply knowledgeable understanding of the political possibilities available at any given moment in the course of the Revolution, placing them in a broad social context. All readers interested in France and revolutionary history will find this an engaging and rewarding read.", publisher: nil, published_date: "2008")
chinese = Textbook.create(title: "The One Hour China Book", isbn: "9780991445028", author: "Jeffrrey Alan Towson, Jonathan R. Woetzel", img_url: "http://books.google.com/books/content?id=qtoOngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", description: "\"One hour with this book will make you an expert on business in China.\" - Dick Gephardt, Majority-Minority Leader, U.S. House of Representatives, 1989-2002 \"Without question, the best 60 minutes you will spend on China.\" - Jonathan Anderson, Emerging Markets Advisors This is the China book for everyone - whether an expert or novice. It can be read in an hour and gives you most of what you need to know about China business today - and its increasing impact on the rest of the world. This \"speed-read\" book is the distilled knowledge of two Peking University business professors with over 30 years of experience on the ground in China and the emerging markets. According to authors Jeffrey Towson and Jonathan Woetzel, \"if we had the undivided attention of someone from Ohio, Brighton or Lima for just one hour, this little book is what we would say.\" Author Jonathan Woetzel is a senior partner of McKinsey & Company. He opened McKinsey's Shanghai location in 1995 and has been resident since then. He currently the global leader of its Cities Special Initiative and the Asia-based Director of the McKinsey Global Institute. He has led many of the Firm's most significant projects in China including the first major international listing of a Chinese company and the development of the economic plans for the cities of Shanghai, Wuhan, Shenzhen, Xian and Harbin among others. He co-chairs the Urban China Initiative along with Tsinghua University and Columbia University to catalyze the next stage of China's urbanization. Author Jeffrey Towson is a private equity investor, professor and best-selling author. His area of expertise is developing economy investing and cross-border strategies - primarily US-China deals in healthcare and consumer products. He was previously Head of Direct Investments for Middle East North Africa and Asia Pacific for Prince Alwaleed, nicknamed by Time magazine the \"Arabian Warren Buffett\" and arguably the world's first private global investor.", published_date: "2014-01-14")
japanese = Textbook.create(title: "Traditional Japanese Music and Musical Instruments", isbn: "9784770023957", author: "William P. Malm", img_url: "http://books.google.com/books/content?id=Yn3VQbqywCsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "When William Malm published his wide-ranging study of traditional Japanese music in 1959, it was the first time in the twentieth century that such a work had been brought out in a Western language. Malm's book has still not been replaced as the single most interesting and authoritative text on the subject. But until now it was never revised or updated, nor were its illustrations ever changed. With the present publication, however, an extensively improved edition that includes a CD of sample music has been made available. Professor Malm's aim has always been to attract the layman reader as well as the musicologist, which has given this book its strength and durability. The writing is clear, lively, and informed, the scope of his study being broadened by frequent comparisons with other traditions, East and West. Accompanying it all is a generous number of drawings and photographs of the players and their various instruments. The book opens with a brisk and eloquent history of Japan's musical life, then moves on to its religious music, Shinto, Buddhist, and Christian; its court music; the music of the noh drama; and the music of specific instruments: biwa, shakuhachi, koto, and shamisen. After examining the components of kabuki music, it closes with a chapter on folk music, popular musical arts, and the music of other ethnic groups in Japan. For the more technically inclined, there is a detailed appendix on notation systems. Lastly, to put all this in a practical context, a CD is provided, giving nineteen examples of these different genres. Whether your interest is in a particular form of Japanese music-the marvelous sonority of the bamboo flute, the sharp but wistful sound of the shamisen-or just in music in general, Malm's book will more than satisfy your curiosity.", published_date: "2000")

art1 = Textbook.create(title: "Art History: A Very Short Introduction", isbn: "9780191577598", author: "Dana Arnold", img_url: "http://books.google.com/books/content?id=SrAhAuJ8KmQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This clear and concise new introduction examines all the major debates and issues using a wide range of well-known examples. It discusses the challenge of using verbal and written language to analyse a visual form. Dana Arnold also examines the many different ways of writing about art, and the changing boundaries of the subject of art history. Topics covered include the canon of Art History, the role of the gallery, 'blockbuster' exhibitions, the emergence of social histories of art (Feminist Art History or Queer Art History, for example), the impact of photography, and the development of Art History using artefacts such as the altarpiece, the portrait, or pornography, to explore social and cultural issues such as consumption, taste, religion, and politics. Importantly, this book explains how the traditional emphasis on periods and styles originates in western art production and can obscure other critical approaches, as well as art from non western cultures. ABOUT THE SERIES: The Very Short Introductions series from Oxford University Press contains hundreds of titles in almost every subject area. These pocket-sized books are the perfect way to get ahead in a new subject quickly. Our expert authors combine facts, analysis, perspective, new ideas, and enthusiasm to make interesting and challenging topics highly readable.", published_date: "2004-01-22")
art2 = Textbook.create(title: "Is Art History Global?", isbn: "9781135867669", author: "James Elkins", img_url: "http://books.google.com/books/content?id=JQaOAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "This is the third volume in The Art Seminar, James Elkin's series of conversations on art and visual studies. Is Art History Global? stages an international conversation among art historians and critics on the subject of the practice and responsibility of global thinking within the discipline. Participants range from Keith Moxey of Columbia University to Cao Yiqiang, Ding Ning, Cuautemoc Medina, Oliver Debroise, Renato Gonzalez Mello, and other scholars.", published_date: "2013-10-18")
art3 = Textbook.create(title: "Critical Terms for Art History, Second Edition", isbn: "9780226571690", author: "Robert S. Nelson, Richard Shiff", img_url: "http://books.google.com/books/content?id=ObqVXJgMhYgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", description: "\"Art\" has always been contested terrain, whether the object in question is a medieval tapestry or Duchamp's Fountain. But questions about the categories of \"art\" and \"art history\" acquired increased urgency during the 1970s, when new developments in critical theory and other intellectual projects dramatically transformed the discipline. The first edition of Critical Terms for Art History both mapped and contributed to those transformations, offering a spirited reassessment of the field's methods and terminology. Art history as a field has kept pace with debates over globalization and other social and political issues in recent years, making a second edition of this book not just timely, but crucial. Like its predecessor, this new edition consists of essays that cover a wide variety of \"loaded\" terms in the history of art, from sign to meaning, ritual to commodity. Each essay explains and comments on a single term, discussing the issues the term raises and putting the term into practice as an interpretive framework for a specific work of art. For example, Richard Shiff discusses \"Originality\" in Vija Celmins's To Fix the Image in Memory, a work made of eleven pairs of stones, each consisting of one \"original\" stone and one painted bronze replica. In addition to the twenty-two original essays, this edition includes nine new ones—performance, style, memory/monument, body, beauty, ugliness, identity, visual culture/visual studies, and social history of art—as well as new introductory material. All help expand the book's scope while retaining its central goal of stimulating discussion of theoretical issues in art history and making that discussion accessible to both beginning students and senior scholars. Contributors: Mark Antliff, Nina Athanassoglou-Kallmyer, Stephen Bann, Homi K. Bhabha, Suzanne Preston Blier, Michael Camille, David Carrier, Craig Clunas, Whitney Davis, Jas Elsner, Ivan Gaskell, Ann Gibson, Charles Harrison, James D. Herbert, Amelia Jones, Wolfgang Kemp, Joseph Leo Koerner, Patricia Leighten, Paul Mattick Jr., Richard Meyer, W. J. T. Mitchell, Robert S. Nelson, Margaret Olin, William Pietz, Alex Potts, Donald Preziosi, Lisbet Rausing, Richard Shiff, Terry Smith, Kristine Stiles, David Summers, Paul Wood, James E. Young", published_date: "2010-03-15")

# SUBJECTS

# english = Subject.create(name: "English")
# psych = Subject.create(name: "Psychology")
# programming = Subject.create(name: "Programming")
# history = Subject.create(name: "History")
# business = Subject.create(name: "Business")
# math = Subject.create(name: "Math")
# language = Subject.create(name: "Foreign Language")
# art = Subject.create(name: "Art History")


# TEXTBOOK_SUBJECTS

# TextbookSubject.create(textbook: harry_potter , subject: english)
# TextbookSubject.create(textbook: psych_101, subject: psych)
# TextbookSubject.create(textbook: javascript, subject: programming)
# TextbookSubject.create(textbook: javascript2, subject: programming)
# TextbookSubject.create(textbook: javascript3, subject: programming)
# TextbookSubject.create(textbook: american_history, subject: history)
# TextbookSubject.create(textbook: american_history2, subject: history)
# TextbookSubject.create(textbook: american_history3, subject: history)
# TextbookSubject.create(textbook: finance1, subject: business)
# TextbookSubject.create(textbook: finance2, subject: business)
# TextbookSubject.create(textbook: calc1, subject: math)
# TextbookSubject.create(textbook: calc2, subject: math)
# TextbookSubject.create(textbook: spanish, subject: language)
# TextbookSubject.create(textbook: french, subject: language)
# TextbookSubject.create(textbook: chinese, subject: language)
# TextbookSubject.create(textbook: japanese, subject: language)
# TextbookSubject.create(textbook: art1, subject: art)
# TextbookSubject.create(textbook: art2, subject: art)
# TextbookSubject.create(textbook: art3, subject: art)


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
UserBook.create(textbook: harry_potter, user: user23, condition: acceptable )
UserBook.create(textbook: harry_potter, user: holly, condition: trash )

UserBook.create(textbook: javascript, user: user12, condition: fresh, custom_price: 4.0)
UserBook.create(textbook: javascript, user: user22, condition: very_good, custom_price: 5.0)
UserBook.create(textbook: javascript, user: justin, condition: good, custom_price: 5.0 )
UserBook.create(textbook: javascript, user: user2, condition: good, custom_price: 5.0 )
UserBook.create(textbook: javascript, user: liz, condition: acceptable, custom_price: 5.0 )
UserBook.create(textbook: javascript, user: sammy, condition: trash, custom_price: 5.0 )
UserBook.create(textbook: javascript, user: user13, condition: fresh, custom_price: 5.0 )
UserBook.create(textbook: javascript, user: user18, condition: very_good, custom_price: 5.0 )

UserBook.create(textbook: javascript2, user: holly, condition: good )
UserBook.create(textbook: javascript2, user: user3, condition: good )
UserBook.create(textbook: javascript2, user: user9, condition: acceptable )
UserBook.create(textbook: javascript2, user: user17, condition: trash )


UserBook.create(textbook: javascript3, user: user14, condition: fresh )
UserBook.create(textbook: javascript3, user: sammy, condition: very_good )
UserBook.create(textbook: javascript3, user: user23, condition: good )
UserBook.create(textbook: javascript3, user: liz, condition: acceptable )
UserBook.create(textbook: javascript3, user: user7, condition: trash )

UserBook.create(textbook: american_history, user: user15, condition: fresh )
UserBook.create(textbook: american_history, user: holly, condition: very_good )
UserBook.create(textbook: american_history, user: user24, condition: good )
UserBook.create(textbook: american_history, user: user5, condition: good )
UserBook.create(textbook: american_history, user: liz, condition: acceptable )
UserBook.create(textbook: american_history, user: user2, condition: trash )
UserBook.create(textbook: american_history, user: user4, condition: good )


UserBook.create(textbook: american_history2, user: user6, condition: good )
UserBook.create(textbook: american_history2, user: liz, condition: acceptable )
UserBook.create(textbook: american_history2, user: justin, condition: trash )

UserBook.create(textbook: american_history3, user: user17, condition: fresh )
UserBook.create(textbook: american_history3, user: user12, condition: very_good )
UserBook.create(textbook: american_history3, user: user20, condition: good )
UserBook.create(textbook: american_history3, user: user7, condition: good )
UserBook.create(textbook: american_history3, user: user22, condition: acceptable )
UserBook.create(textbook: american_history3, user: sammy, condition: trash )
UserBook.create(textbook: american_history3, user: user16, condition: fresh )
UserBook.create(textbook: american_history3, user: user24, condition: very_good )
UserBook.create(textbook: american_history3, user: user9, condition: good )

UserBook.create(textbook: finance1, user: user18, condition: fresh )
UserBook.create(textbook: finance1, user: liz, condition: very_good )
UserBook.create(textbook: finance1, user: holly, condition: good )
UserBook.create(textbook: finance1, user: user8, condition: good )
UserBook.create(textbook: finance1, user: user3, condition: acceptable )
UserBook.create(textbook: finance1, user: sammy, condition: trash )

UserBook.create(textbook: finance2, user: user19, condition: fresh )
UserBook.create(textbook: finance2, user: user2, condition: very_good )


UserBook.create(textbook: calc1, user: user22, condition: good )
UserBook.create(textbook: calc1, user: user9, condition: good )
UserBook.create(textbook: calc1, user: user15, condition: acceptable )
UserBook.create(textbook: calc1, user: user13, condition: trash )
UserBook.create(textbook: calc1, user: user20, condition: fresh )
UserBook.create(textbook: calc1, user: user5, condition: very_good )
UserBook.create(textbook: calc1, user: justin, condition: good )
UserBook.create(textbook: calc1, user: user12, condition: good )
UserBook.create(textbook: calc1, user: sammy, condition: acceptable )
UserBook.create(textbook: calc1, user: user16, condition: trash )

UserBook.create(textbook: calc2, user: user21, condition: fresh )
UserBook.create(textbook: calc2, user: user14, condition: very_good )


UserBook.create(textbook: spanish, user: user8, condition: good )
UserBook.create(textbook: spanish, user: user11, condition: good )
UserBook.create(textbook: spanish, user: liz, condition: acceptable )
UserBook.create(textbook: spanish, user: sammy, condition: trash )
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

UserBook.create(textbook: chinese, user: user9, condition: trash )
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
UserBook.create(textbook: art1, user: user8, condition: fresh )
UserBook.create(textbook: art1, user: user24, condition: very_good )

UserBook.create(textbook: art2, user: user13, condition: good )
UserBook.create(textbook: art2, user: user10, condition: good )
UserBook.create(textbook: art2, user: user4, condition: acceptable )
UserBook.create(textbook: art2, user: user17, condition: trash )

UserBook.create(textbook: art3, user: user9, condition: fresh )
UserBook.create(textbook: art3, user: user15, condition: very_good )
UserBook.create(textbook: art3, user: user3, condition: good )
UserBook.create(textbook: art3, user: user16, condition: good )
UserBook.create(textbook: art3, user: user18, condition: acceptable )
