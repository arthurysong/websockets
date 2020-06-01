# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
messages = Message.create([
    {content: "hello"},
    {content: "hi, how are you"},
    {content: "my name is bobbb"},
    {content: "I want some pizza"},
    {content: "2020 is a crazy year, what is happening?"}
])