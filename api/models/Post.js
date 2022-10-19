const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

// const postsData = [
//     { id: 1, title: 'Mochi1', pseudonym: 1, body: 2 },
//     { id: 2, title: 'Mochi2', pseudonym: 1, body: 2 },
//     { id: 3, title: 'Mochi3', pseudonym: 1, body: 2 },
// ]

class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.pseudonym = data.pseudonym
        this.body = data.body
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const postsData = await db.collection('posts').find().toArray()
                console.log(postsData);
                const posts = postsData.map(p => new Post({ ...p, id: p._id }))
                console.log(posts)
                // const posts = postsData.map(d => new Post(d))
                // console.log(posts);
                resolve(posts);
            } catch (err) {
                console.log(err);
                reject("Error retrieving posts")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let postData = await db.collection('posts').find({ _id: ObjectId(id) }).toArray()
                let post = new Post({...postData[0], id: postData[0]._id});
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }

    static create(title, pseudonym, body){
        return new Promise (async (resolve, reject) => {
            try {
                console.log("*****models/Post*****")
                const db = await init();
                let postData = await db.collection('posts').insertOne({ title, pseudonym, body })
                console.log("postData", postData.ops[0]);
                let newPost = new Post({...postData.ops[0], id: postData.ops[0]._id});
                console.log("newPost", newPost);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }
}


module.exports = Post
