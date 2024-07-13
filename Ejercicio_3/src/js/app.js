document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        const titleItem = document.createElement('h3');
        const textItem = document.createElement('p');
        titleItem.textContent = `Title: ${post.title}`;
        textItem.textContent =`Post: ${post.body}`;
        listItem.appendChild(titleItem);
        listItem.appendChild(textItem);
        postList.appendChild(listItem);
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};