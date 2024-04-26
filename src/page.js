const filters = document.getElementById('filters');
const filtersMobile = document.getElementById('filters-mobile');
const movies = document.getElementById('movies');
const description = document.getElementById('description');
const form = document.getElementById('form');
const formEdited = document.getElementById('form-edit');
const content = document.getElementById('content');

// recuperar datos
function fetchMovies(filterBy) {
    let url = 'http://localhost:3000/movies';
    if (filterBy) {
        url += `?_sort=${filterBy}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            movies.innerHTML = '';
            data.forEach((movie, index) => {
                const movieElement = document.createElement('div');
                movieElement.dataset.index = index;
                movieElement.setAttribute('data-movie-id', movie.id);
                movieElement.classList.add('col');
                movieElement.classList.add('w-full');
                movieElement.classList.add('h-full');
                movieElement.classList.add('relative');
                movieElement.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="height:400px;width:400px;object-fit:fill">
                <div id="movie-details" class="bg-white hidden absolute top-20 h-[80%] py-5 px-8 w-full"><p class="movie-title font-nohemiExtraBold text-3xl">${movie.title}</p>
                <p class="movie-year font-nohemiExtralight ">Year: ${movie.year}</p>
                <p class="movie-genre font-nohemiExtralight">Genre: ${movie.genre}</p>
                <p class="movie-rating font-nohemiExtralight">Rating: ${movie.rating}</p>
                
                <div id="manage-options" class='pt-1'>
                    <button id='edit'><i class="fa-regular fa-pen-to-square"></i></button>
                    <button id='delete'><i class="fa-solid fa-trash"></i></button>
                </div>`
                movies.appendChild(movieElement);

                movieElement.addEventListener('mouseover', function() {
                    const movieContainer = movieElement.querySelector('.col img');
                    const movieDetails = movieElement.querySelector('#movie-details');
                    movieContainer.style.filter = 'brightness(20%)';
                    movieDetails.style.display = 'block';
                });
                
                movieElement.addEventListener('mouseout', function() {
                    const movieContainer = movieElement.querySelector('.col img');
                    const movieDetails = movieElement.querySelector('#movie-details');
                    movieContainer.style.filter = 'brightness(100%)';
                    movieDetails.style.display = 'none';

                    const editButtons = document.querySelectorAll('.fa-pen-to-square');
                    editButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            editMovie(movie);
                        });
                });
            });
    });

    const deleteButtons = document.querySelectorAll('.fa-trash');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const movieElement = button.closest('.col');
            deleteMovie(movieElement);
        });
    });

            movies.style.display = 'grid';
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}
fetchMovies();

// filtrar datos
function filterBy(option) {
    fetchMovies(option);
}

//  mostrar formulario para editar 
function showFormEdited() {
    if (formEdited.style.display === 'none' || formEdited.style.display === '') {
        formEdited.style.display = 'block';
        movies.style.display = 'none';
    } else {
        formEdited.style.display = 'none';
        movies.style.display = 'grid';
    }
}

// editar una pelicula
function editMovie(movie) {
    showFormEdited();
    const titleEditInput = document.getElementById('title-edit');
    const yearEditInput = document.getElementById('year-edit');
    const genreEditInput = document.getElementById('genre-edit');
    const ratingEditInput = document.getElementById('rating-edit');
    const imageEditInput = document.getElementById('image-edit');


    titleEditInput.value = movie.title;
    yearEditInput.value = movie.year;
    genreEditInput.value = movie.genre;
    ratingEditInput.value = movie.rating;
    imageEditInput.value = movie.image;


    const formEdited = document.querySelector('#form-edit form');
    formEdited.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los nuevos valores del formulario de edición
        const newTitle = titleEditInput.value;
        const newYear = yearEditInput.value;
        const newGenre = genreEditInput.value;
        const newRating = ratingEditInput.value;
        const newImage = imageEditInput.value;

        updateMovie(movie.id, {
            title: newTitle,
            year: newYear,
            genre: newGenre,
            rating: newRating,
            image: newImage
        });
    });
}

// enviar datos para actualizarlos
function updateMovie(movieId, newData) {
    console.log('Update movie:', movieId, newData);
    fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Movie updated successfully:', data);
        fetchMovies();
        formEdited.style.display = 'none';
    })
    .catch(error => {
        console.error('Error updating movie:', error);
    });
}

// borrar la pelicula
function deleteMovie(movie) {
    const id = movie.getAttribute('data-movie-id');
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta película?');

    if (confirmDelete) {
        console.log('Delete movie:', movie);

    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        movie.remove();
    })
    .catch(error => {
        console.error('Error deleting movie:', error);
    });
}
}

// mostrar filtros
function showFilters() {
    if (filters.style.display === 'none' || filters.style.display === '') {
        filters.style.display = 'block';
    } else {
        filters.style.display = 'none';
    }
}

//  mostrar filtros en mobile
function showFilterMobile() {
    if (filtersMobile.style.display === 'none' || filtersMobile.style.display === '') {
        filtersMobile.style.display = 'block';
    } else {
        filtersMobile.style.display = 'none';
    }
}

// mostrar todas las peliculas
function viewAll() {
    fetchMovies();
    currentFilter = null;
    filters.style.display = 'none';
    description.style.display = 'none';
    formEdited.style.display = 'none';
    form.style.display = 'none';
}

// mostrar formulario para añadir las peliculas
function showForm() {
    if (form.style.display == 'none') {
        form.style.display = 'block';
        description.style.display = 'none';
        movies.style.display = 'none';
    } else {
        form.style.display = 'none';
        movies.style.display = 'grid';
    }
}

// añadir peliculas 
function sendMovie() {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;
    const image = document.getElementById('image').value;

    if (!title || !year || !genre || !rating || !image) {
        alert('Por favor, complete todos los campos del formulario');
        return; 
    }

    const movieData = {
        title: title,
        year: year,
        genre: genre,
        rating: rating,
        image: image
    };

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Movie added successfully:', data);
        fetchMovies();
        form.style.display = 'none';
    })
    .catch(error => {
        console.error('Error adding movie:', error);
    });
}
