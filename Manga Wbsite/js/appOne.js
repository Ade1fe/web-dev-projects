


const appTitles = [
  "Download Official Mangaowl Android App",
  "Discover the Best Manga on Mangaowl",
  "Read Manga Anytime, Anywhere",
  "Explore a Vast Collection of Manga Titles",
];

const appTitleElement = document.getElementById("app-title");
let currentIndex = 0;

function changeAppTitle() {
  appTitleElement.innerText = appTitles[currentIndex];
  currentIndex = (currentIndex + 1) % appTitles.length;
}

// Change the app title every 3 seconds
setInterval(changeAppTitle, 3000);




// swiperOne
var mySwiperOne = new Swiper(".mySwiperOne", {
  slidesPerView: 7,
  spaceBetween: 20,
  pagination: {
    el: ".mySwiperOne .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
      0: {
      slidesPerView: 2.10,
      spaceBetween: 10,
    },
      320: {
      slidesPerView: 2.20,
      spaceBetween: 10,
    },
    
    420: {
      slidesPerView: 3.0,
      spaceBetween: 5,
    },  
    640: {
      slidesPerView: 3.50,
      spaceBetween: 10,
    },

      768: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
      900: {
      slidesPerView: 7,
      spaceBetween: 10,
    }
  },
});



// swiperOne
var mySwiperTwo = new Swiper(".mySwiperTwo", {
  slidesPerView: 5,
  spaceBetween: 20,
  pagination: {
    el: ".mySwiperOne .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
      0: {
      slidesPerView: 2.10,
      spaceBetween: 10,
    },
      320: {
      slidesPerView: 2.20,
      spaceBetween: 10,
    },
    
    420: {
      slidesPerView: 2.10,
      spaceBetween: 5,
    },  
    640: {
      slidesPerView: 3.10,
      spaceBetween: 10,
    },

      768: {
      slidesPerView: 4.10,
      spaceBetween: 10,
    },
      900: {
      slidesPerView: 5,
      spaceBetween: 10,
    }
  },
});







    // -------------------------------------------------------------

// Fetch manga details and populate genre map
function fetchMangaDetails(mangaIds, swiperId) {
  const apiUrl = 'https://api.jikan.moe/v4/manga/';

  const genreMap = {};

  mangaIds.forEach(mangaId => {
    const mangaUrl = `${apiUrl}${mangaId}/full`;

    fetch(mangaUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const manga = data.data;

        manga.genres.forEach(genre => {
          const genreName = genre.name;

          if (!genreMap[genreName]) {
            genreMap[genreName] = [];
          }

          genreMap[genreName].push({
            id: manga.mal_id,
            manga: manga
          });
        });

        const swiperWrapper = document.querySelector(`#${swiperId} .swiper-wrapper`);
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = manga.images.jpg.large_image_url;
        img.alt = manga.title;
        swiperSlide.appendChild(img);

        const textBody = document.createElement("div");
        textBody.classList.add("text-body");

        const h4 = document.createElement("h4");
        let title = manga.title;

        if (title.length > 15) {
          title = title.slice(0, 15) + "...";
        }

        h4.textContent = title;
        h4.style.cursor = "pointer";
        h4.addEventListener("click", () => {
          window.open(manga.url, "_blank");
        });

        textBody.appendChild(h4);
        swiperSlide.appendChild(textBody);

        if (manga.chapters > 0) {
          const chapter = document.createElement("p");
          chapter.textContent = `Chapter ${manga.chapters}`;
          swiperSlide.appendChild(chapter);
        }

        swiperWrapper.appendChild(swiperSlide);
      })
      .catch(error => {
        console.error(error);
      });
  });

  // Store the genreMap object in localStorage
// Store genreMap in localStorage
localStorage.setItem('genreMap', JSON.stringify(genreMap));




  console.log('Genre Map:', genreMap, " one") ;
}


 

// Function to display mangas by genre
function displayMangasByGenre(genre) {
  // Retrieve genreMap from localStorage
   const genreMap = JSON.parse(localStorage.getItem('genreMap'));
  // Retrieve mangas from genreMap
   console.log('Genre Map:', genreMap, " two") ;
  if (genreMap && genreMap[genre]) {
    console.log(`Mangas related to genre: ${genre}`);
    genreMap[genre].forEach(manga => {
      const { id, manga: { title, chapters, images } } = manga;
      const imageUrl = images.jpg.large_image_url;
      console.log(`Title: ${title}`);
      console.log(`Chapters: ${chapters}`);
      console.log(`Image URL: ${imageUrl}`);
    });
  } else {
    console.log(`No mangas found for genre: ${genre}`);
  }
}



function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function initializeModal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = closeModal;

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Add event listeners to the genre links
const genreLinks = document.querySelectorAll('.genre-link');
genreLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const genre = event.target.dataset.genre;
    // Call displayMangasByGenre to display mangas based on genre
    displayMangasByGenre(genre);

    openModal(); // Call the openModal function to display the modal
  });
});

// Call the initializeModal function to set up modal functionality
initializeModal();






    // ------------------------------------------------

function generateMangaIds(start, end) {
  const mangaIds = [];
  for (let i = start; i <= end; i++) {
    mangaIds.push(i);
  }
  return mangaIds;
}


const startId1 = 1;
const endId1 = 10;
const mangaId1 = generateMangaIds(startId1, endId1);



const startId2 = 10;  
const endId2 = 20;
const mangaId2 = generateMangaIds(startId2, endId2);

const startId3 = 20;  
const endId3 = 30;
const mangaId3 = generateMangaIds(startId3, endId3);

const startId4 = 30;  
const endId4 = 40;
const mangaId4 = generateMangaIds(startId4, endId4);

const startId5 = 40;  
const endId5 = 50;
const mangaId5 = generateMangaIds(startId5, endId5);

const startId6 = 50;  
const endId6 = 60;
const mangaId6 = generateMangaIds(startId6, endId6);

const startId7 = 60;  
const endId7 = 70;
const mangaId7 = generateMangaIds(startId7, endId7);

const startId8 = 70;
const endId8 = 80;
const mangaId8 = generateMangaIds(startId8, endId8);

const startId9 = 80;
const endId9 = 90;
const mangaId9 = generateMangaIds(startId9, endId9);

const startId10 = 90;
const endId10 = 100;
const mangaId10 = generateMangaIds(startId10, endId10);

fetchMangaDetails(mangaId1, 'swiperOne');
fetchMangaDetails(mangaId2, 'swiperTwo');
fetchMangaDetails(mangaId3, 'swiperThree');
fetchMangaDetails(mangaId4, 'swiperFour');
fetchMangaDetails(mangaId5, 'swiperFive');
fetchMangaDetails(mangaId6, 'swiperSix');
fetchMangaDetails(mangaId7, 'swiperSeven');
fetchMangaDetails(mangaId8, 'swiperEight');
fetchMangaDetails(mangaId9, 'swiperNine');
fetchMangaDetails(mangaId10, 'swiperTen');









// ----------------
//main-container function

function fetchMangaDetail(mangaIds) {
  const apiUrl = 'https://api.jikan.moe/v4/manga/';

  mangaIds.forEach(mangaId => {
    const mangaUrl = `${apiUrl}${mangaId}/full`;

    fetch(mangaUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const manga = data.data;

        const recommendationContainer = document.querySelector('#recommendation');

        const picDiv = document.createElement('div');
        picDiv.classList.add('pic');

        const img = document.createElement('img');
        img.src = manga.images.jpg.large_image_url;
        img.alt = manga.title;
        picDiv.appendChild(img);

        const conDiv = document.createElement('div');
        conDiv.classList.add('con');

          const h4 = document.createElement('h4');
        let title = manga.title;
        if (title.length > 15) {
          title = title.slice(0, 15) + '...';
        }
        h4.textContent = title;
        conDiv.appendChild(h4);

        const p = document.createElement('p');
        p.textContent = `Chapter ${manga.chapters}`;
        conDiv.appendChild(p);

        picDiv.appendChild(conDiv);

        recommendationContainer.appendChild(picDiv);

        h4.addEventListener('click', () => {
          window.open(manga.url, '_blank');
        });

      })
      .catch(error => {
        console.error(error);
      });
  });
}



const start = 1;
const end = 10;
const manga = generateMangaIds(start, end);
fetchMangaDetail(manga);


  // https://api.jikan.moe/v4/manga/{id}/recommendations


// review section
let displayedReviews = 15; // Number of reviews to display initially
const reviewsPerPage = 1; // Number of reviews to fetch per page

function getReviews(mangaId, page) {
  fetch(`https://api.jikan.moe/v4/manga/${mangaId}/reviews?page=${page}&limit=${reviewsPerPage}`)
    .then(response => response.json())
    .then(data => {
      const reviewContainer = document.getElementById('review-container');

      if (data.data && data.data.length > 0) {
        // Iterate over the reviews and create the HTML structure for each review
        data.data.forEach(review => {
          if (displayedReviews > 0) {
            const reviewPost = document.createElement('div');
            reviewPost.className = 'review-post';

            const reviewImage = document.createElement('img');
            reviewImage.src = review.user.images.jpg.image_url;
            reviewImage.alt = review.user.username;

            const reviewText = document.createElement('div');
            reviewText.className = 'review-text';

            const reviewTitle = document.createElement('h4');
            reviewTitle.textContent = review.user.username;
            reviewText.appendChild(reviewTitle);

            const reviewContent = document.createElement('p');
            reviewContent.textContent = review.review;

            const maxLength = 120; // Maximum number of characters to display
            const ellipsis = "...";

            if (reviewContent.textContent.length > maxLength) {
              const truncatedText = reviewContent.textContent.slice(0, maxLength) + ellipsis;
              reviewContent.textContent = truncatedText;

              const readMoreButton = document.createElement('button');
              readMoreButton.textContent = 'Read More';

              let isExpanded = false; // Track whether the full content is expanded or not

              readMoreButton.addEventListener('click', () => {
                if (isExpanded) {
                  // If already expanded, truncate the content again
                  reviewContent.textContent = truncatedText;
                  readMoreButton.textContent = 'Read More';
                } else {
                  // If not expanded, show the full content
                  reviewContent.textContent = review.review;
                  readMoreButton.textContent = 'Read Less';
                }

                isExpanded = !isExpanded; // Toggle the expanded state
              });

              reviewText.appendChild(reviewContent);
              reviewText.appendChild(document.createElement('br'));
              reviewText.appendChild(readMoreButton);
            } else {
              reviewText.appendChild(reviewContent);
            }

            // Append the elements to the review container
          
            reviewPost.appendChild(reviewImage);
            reviewPost.appendChild(reviewText);
            reviewContainer.appendChild(reviewPost);

            displayedReviews--; // Decrement the number of displayed reviews
          }
        });

        if (displayedReviews <= 0) {
          // If all reviews are displayed, hide the "Show More" button
          const showMoreButton = document.getElementById('show-more-button');
          showMoreButton.style.display = 'block';
        }
      } else {
        console.log(`No reviews found for manga ID: ${mangaId}.`);
      }
    })
    .catch(error => console.log(error));
}

function showMoreReviews() {
  const showMoreButton = document.getElementById('show-more-button');
  showMoreButton.style.display = 'none'; // Hide the "Show More" button temporarily

  const mangaIds = [1, 2]; // Replace with the actual manga IDs you want to fetch reviews for

  mangaIds.forEach(mangaId => {
    const pagesToFetch = Math.ceil(displayedReviews / reviewsPerPage);
    for (let page = 1; page <= pagesToFetch; page++) {
      getReviews(mangaId, page);
    }
  });

  displayedReviews += reviewsPerPage;
}

// Call the getReviews function for the initial set of reviews
const mangaIDs = [33, 45]; // Replace with the actual manga IDs you want to fetch reviews for

mangaIDs.forEach(mangaIDs => {
  const pagesToFetch = Math.ceil(displayedReviews / reviewsPerPage);
  for (let page = 1; page <= pagesToFetch; page++) {
    getReviews(mangaIDs, page);
  }
});

// Add event listener to the "Show More" button
const showMoreButton = document.getElementById('show-more-button');
showMoreButton.addEventListener('click', showMoreReviews);



localStorage.clear();



// grid 