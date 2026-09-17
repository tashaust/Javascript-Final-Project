let isModalOpen = false;


function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_zwn8wb5",
      "template_nmyn9zp",
      event.target,
      "pHXZKLx-ZzF8W9FBK",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

function filterGenres() {
    const checkboxes = document.querySelectorAll('.genre__checkbox');
    const selectedGenres = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });

    const allBooks = document.querySelectorAll('.results__item');
    

    allBooks.forEach((book) => {
    const bookGenres = book.dataset.genre
      .split(",")
      .map((genre) => genre.trim());
    const isVisible =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => bookGenres.includes(genre));

    book.style.display = isVisible ? "block" : "none";
  });
}

document.getElementById('search__bar').addEventListener('submit', function(event) {
    event.preventDefault(); // 

    const query = document.querySelector('.search__bar--input').value; // 
    fetchBooks(query); // 
});

function fetchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById('apiResults');
    resultsContainer.innerHTML = ''; 

    data.docs.forEach(book => {
        const bookDiv = document.createElement('div');
bookDiv.innerHTML = `
  <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}">
  <h3>${book.title}</h3>
  <p>${book.author_name}</p>
`;
        resultsContainer.appendChild(bookDiv);
    });
}

