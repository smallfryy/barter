# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160417154036) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.integer  "addressable_id"
    t.string   "addressable_type"
    t.string   "street"
    t.string   "apt_num"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.string   "country"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "carts", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "active",     default: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.datetime "order_date"
  end

  create_table "colleges", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "conditions", force: :cascade do |t|
    t.string "name"
  end

  create_table "karmas", force: :cascade do |t|
    t.float    "balance",    default: 0.0
    t.integer  "user_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "line_items", force: :cascade do |t|
    t.integer  "buyer_id"
    t.integer  "user_book_id"
    t.integer  "cart_id"
    t.float    "item_karma",          default: 0.0
    t.boolean  "shipped",             default: false
    t.boolean  "received",            default: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "shipping_address_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "textbook_subjects", force: :cascade do |t|
    t.integer  "textbook_id"
    t.integer  "subject_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "textbooks", force: :cascade do |t|
    t.string   "title"
    t.string   "isbn"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "author"
    t.string   "img_url"
    t.text     "description"
    t.string   "publisher"
    t.string   "published_date"
  end

  create_table "user_books", force: :cascade do |t|
    t.integer  "textbook_id"
    t.integer  "user_id"
    t.boolean  "sold",         default: false
    t.integer  "condition_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.float    "custom_price"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "college_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
