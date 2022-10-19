const form = document.getElementById("form");
const allPosts = document.getElementById('all-post');

fetchAll()

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

    sendToServer(postData);

    appendOne(postData)
//    setTimeout(() => {
//     location.reload();
// }, 200);
};

async function sendToServer(postData) {
	try {
	await fetch("http://localhost:3000/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
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



async function appendOne(post) {
    //create h1 tag for title
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

