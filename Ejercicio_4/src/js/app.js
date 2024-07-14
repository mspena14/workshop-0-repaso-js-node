let data;
const fetchPosts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            data = posts
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    posts.forEach(post => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${post.id}</td>
            <td scope="col">${post.category.name}</td>
            <td scope="col">${post.title}</td>
            <td scope="col">$${post.price}</td>
            <td scope="col"><img src=${post.images[0]} width="100px" alt="${post.title}"></td>
            <td scope="col">${post.description}</td>
        </tr>
        `;
    });
}

const InfoFiltered = (category) => {
    const categorizedPosts = data.filter((post) => post.category.name === category)
    displayPosts(categorizedPosts)
}

const infoFound = (wordToSearch) => {
    if (wordToSearch) {
        const searchResults = data.filter((post) => post.title.toLowerCase().includes(wordToSearch.toLowerCase()));
        displayPosts(searchResults)
    }
}

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};

const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;

    if (!(category === 'All')) {
        InfoFiltered(category)
    } else {
        fetchPosts()
    }

})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-input').value;
    infoFound(wordToSearch)
})

fetchPosts()