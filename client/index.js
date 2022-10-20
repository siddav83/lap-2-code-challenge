const form = document.getElementById("form");
const allPosts = document.getElementById('all-post');

// fetchAll()

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
    // redirect(newPost.id)
    // appendOne(newPost)
    window.location.hash = `${newPost.id}`
//    setTimeout(() => {
//     location.reload();
// }, 200);
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
        appendOne(res)
    } catch (error) {
        console.log(error)
    }
};



async function appendOne(post) {
    //create h1 tag for title
    console.log(post)
    const div = document.createElement('div');
    div.setAttribute('id', post.id);
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


async function redirect(id) {
    window.location.href = `http://127.0.0.1:5500/client/index.html/${id}`;
}


// ***************
window.addEventListener('hashchange', updateContent);

function updateContent(){
    let hash = window.location.hash.substring(1);
    // updateNav(hash);
    updateMain(hash);
}

// function updateNav(hash) {
//     const updateLink = link => {
//         link.classList = (link.textContent == '+' && hash.includes('new') || hash.includes(link.textContent)) ? ['navlink', 'current'] : ['navlink']
//     };
//     navLinks.forEach(updateLink)
// }

function updateMain(hash) {
    // main.innerHTML = '';
    if (hash) {
        let id = hash;
        const container = document.getElementById("container");
        container.style.display = "none"
        fetchOne(id);
        // id ? loadModalFor(category, id) : loadIndexFor(category)
    } else {
        // const container = document.getElementById("container");
        // container.style.display = "block"
        // const header = document.createElement('h1');
        // header.className = 'title';
        // header.textContent = "Welcome to the Reading Room";
        // main.appendChild(header);
        console.log("didn't work");
    }
}
