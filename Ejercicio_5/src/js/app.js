const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 20 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const container = document.getElementById('container');
const table = document.getElementById('table');
const tbody = document.getElementById('tbody');
const space = document.createElement('br')

const toggleContainerClass = () => {
    if (container.classList.contains('invisibility')) {
        container.classList.remove('invisibility');
        table.classList.add('invisibility');
    }
};

const toggleTableClass = () => {
    if (table.classList.contains('invisibility')) {
        container.classList.add('invisibility');
        table.classList.remove('invisibility');
    }
};

document.getElementById('sum').addEventListener('click', () => {
    totalPrice(products);
});

document.getElementById('is-available').addEventListener('click', () => {
    checkAvailability(products);
});

document.getElementById('list-product').addEventListener('click', () => {
    createList(products);
});



const filterOption = document.getElementById('category-select');
filterOption.addEventListener('change', async () => {
    const category = filterOption.value;
    InfoFiltered(category)

})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-input').value;
    InfoFound(wordToSearch)
})


const displayPosts = (products) => {
    tbody.innerHTML = '';
    products.forEach(product => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${product.id}</td>
            <td scope="col">${product.category}</td>
            <td scope="col">${product.name}</td>
            <td scope="col">$${product.price}</td>
            <td scope="col">${product.stock}</td>
        </tr>
        `;
    });
};


const totalPrice = (products) => {
    toggleContainerClass()
    container.innerHTML = '';
    const total = products.reduce((accumulator, product) => accumulator + product.price * product.stock, 0);
    const totalView = document.createElement('strong');
    totalView.textContent = `Total price of all products: $${total}`;
    container.append(space);
    container.appendChild(totalView);
};


const InfoFiltered = (category) => {
    toggleTableClass()
    if (!(category === 'All')) {
        const resultsFiltered = products.filter((product) => product.category === category)
        displayPosts(resultsFiltered)
    } else {
        displayPosts(products);
    }

};


const InfoFound = (wordToSearch) => {
    toggleTableClass()
    if (wordToSearch) {
        searchResults = products.filter((product) => product.name.toLowerCase().includes(wordToSearch.toLowerCase()));
        displayPosts(searchResults)
    };
};

const checkAvailability = (products) => {
    const messageContainer = document.createElement('strong');
    toggleContainerClass()
    container.textContent = ''
    const allAvailable = products.every(product => product.stock > 0);
    if (allAvailable) {
        const messageContainer = document.createElement('strong');
        messageContainer.textContent = 'All products are available.';
        container.appendChild(space);
        container.appendChild(messageContainer);
    } else {
        messageContainer.textContent = 'Not all products are available.';
        container.appendChild(space);
        container.appendChild(messageContainer);
    };
}

const createList = (products) => {
    toggleContainerClass()
    container.textContent = '';
    const productNames = products.map(product => product.name);
    const listTitle = document.createElement('h3');
    const list = document.createElement('ul');

    productNames.forEach(productName => {
        const listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = productName;
    });

    listTitle.textContent = 'List of product names:';
    container.appendChild(listTitle);
    container.appendChild(list);
}

displayPosts(products);