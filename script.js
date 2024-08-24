const gallery = document.getElementById('gallery');
let currentPage = 1;
const limit = 20;

async function fetchData(page, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
}

function renderImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.thumbnailUrl;
        imgElement.alt = image.title;
        gallery.appendChild(imgElement);
    });
}

fetchData(currentPage, limit).then(renderImages);

// Event listener for infinite scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentPage++;
        fetchData(currentPage, limit).then(renderImages);
    }
});