const form = document.getElementById("form");
const allPosts = document.getElementById('all-post');

updateContent()

form.addEventListener('submit',submitPost)

async function submitPost(e) {
	// Prevent Refresh
	e.preventDefault();

    // Store input in variable
	const postData = {
		title: e.target.title.value,
		pseudonym: e.target.pseudonym.value,
		body: e.target.body.value
    };

    const newPost = await sendToServer(postData);
    console.log(newPost);

    hideForm()
    window.location.hash = `${newPost.id}`
};

async function sendToServer(postData) {
	try {
	    const newPostData = await fetch("http://localhost:3000/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
        newPost = await newPostData.json()
        console.log("fetch result", newPost);
        return newPost
	} catch (error) {
		console.log(error);
	}
};

async function fetchAll() {
    try {
        const data = await fetch("http://localhost:3000/posts");
        const res = await data.json();
        res.forEach((data) => appendOne(data))
    } catch (error) {
        console.log(error)
    }
};

async function fetchOne(id) {
    try {
        const data = await fetch(`http://localhost:3000/posts/${id}`);
        const res = await data.json();
        console.log("res", res)
        console.log("error", res.err)
        if(res.err == "Post not found") {
            hidePost()
            revealForm()
            console.log("reveal")
        }
        appendOne(res)
    } catch (error) {
        console.log(error)
    }
};



async function appendOne(post) {
    //create h1 tag for title
    allPosts.style.inlineSize = "200px"
    console.log(post)
    const div = document.createElement('div');
    div.setAttribute('id', post.id);
    div.setAttribute('class', "post")
    allPosts.insertBefore(div,allPosts.children[0])
    const title = document.createElement('h1');
    title.textContent = post.title;
    div.appendChild(title);
    const pseudonym = document.createElement('h3');
    pseudonym.textContent = post.pseudonym;
    div.appendChild(pseudonym);
    const body = document.createElement('p');
    body.textContent = post.body;
    div.appendChild(body);
}

async function hideForm() {
    const container = document.getElementById("container");
    container.style.display = "none";
}

async function revealForm() {
    const container = document.getElementById("container");
    container.style.display = "block";
    const title = document.getElementById("title");
    title.value = "Type here"
    const pseudonym = document.getElementById("pseudonym");
    pseudonym.value = "Type something"
    const body = document.getElementById("body");
    body.value = ""
}

async function hidePost() {
    const postToRemove = document.querySelector(".post");
    postToRemove.style.display = "none";
    allPosts.style.inlineSize = "0";
}

// ***************
window.addEventListener('hashchange', updateContent);

function updateContent(){
    let hash = window.location.hash.substring(1);
    updateMain(hash);
}

function updateMain(hash) {
    if (hash) {
        let id = hash;
        hideForm()
        allPosts.style.inlineSize = "0px"
        fetchOne(id);
    } else {
        revealForm()
        hidePost()
    }
}
