const db = connect("mongodb://localhost:27017/posts")


db.posts.drop()

db.posts.insertMany([
    { title: "Hello World", pseudonym: "Not Brendan", body: "Hello" },
    { title: "Goodbye World", pseudonym: "Not Brendan again", body: "Goodbye" }
])
