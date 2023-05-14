


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
      slidesPerView: 3.0,
      spaceBetween: 5,
    },  
    640: {
      slidesPerView: 3.50,
      spaceBetween: 10,
    },

      768: {
      slidesPerView: 4.50,
      spaceBetween: 10,
    },
      900: {
      slidesPerView: 5,
      spaceBetween: 10,
    }
  },
});







    // -------------------------------------------------------------


function fetchMangaDetails(mangaIds, swiperId) {
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
}

function generateMangaIds(start, end, storageKey) {
  const storedMangaIds = localStorage.getItem(storageKey);
  if (storedMangaIds) {
    return JSON.parse(storedMangaIds);
  } else {
    const mangaIds = [];
    for (let i = start; i <= end; i++) {
      mangaIds.push(i);
    }
    localStorage.setItem(storageKey, JSON.stringify(mangaIds));
    return mangaIds;
  }
}

const startId = 1;
const endId = 10;
const mangaIds = generateMangaIds(startId, endId, 'mangaIds');

const startIds = 10;
const endIds = 20;
const mangaId = generateMangaIds(startIds, endIds, 'mangaId');

fetchMangaDetails(mangaIds, 'swiperOne');
fetchMangaDetails(mangaId, 'swiperTwo');


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

const start = 30;
const end = 40;

const storedManga = localStorage.getItem('mangaId');
let manga;

if (storedManga) {
  manga = JSON.parse(storedManga);
} else {
  manga = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  localStorage.setItem('mangaId', JSON.stringify(manga));
}

fetchMangaDetail(manga);


  // https://api.jikan.moe/v4/manga/{id}/recommendations


// review section
let displayedReviews = 5; // Number of reviews to display initially
const reviewsPerPage = 1; // Number of reviews to fetch per page

function getReviews(mangaId, page) {
  fetch(`https://api.jikan.moe/v4/manga/${mangaId}/reviews?page=${page}&limit=${reviewsPerPage}`)
    .then(response => response.json())
    .then(data => {
      const reviewContainer = document.getElementById('review-container');

      if (data.data && data.data.length > 0) {
        // Iterate over the reviews and create the HTML structure for each review
        data.data.forEach(review => {
          const reviewPost = document.createElement('div');
          reviewPost.className = 'review-post';

          const reviewImage = document.createElement('img');
          reviewImage.src = review.user.images.jpg.image_url;
          reviewImage.alt = review.user.username;

          const reviewText = document.createElement('div');
          reviewText.className = 'review-text';

          const reviewTitle = document.createElement('h4');
          reviewTitle.textContent = review.user.username;

         const reviewContent = document.createElement('p');
reviewContent.textContent = review.review;

const maxLength = 30; // Maximum number of characters to display
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
          reviewText.appendChild(reviewTitle);
          reviewText.appendChild(reviewContent);
          reviewPost.appendChild(reviewImage);
          reviewPost.appendChild(reviewText);
          reviewContainer.appendChild(reviewPost);
        });

        if (displayedReviews < data.pagination.last_visible_page * reviewsPerPage) {
          // If there are more reviews to fetch, show the "Show More" button
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
    const pagesToFetch = Math.ceil((displayedReviews + reviewsPerPage) / reviewsPerPage);
    for (let page = 1; page <= pagesToFetch; page++) {
      getReviews(mangaId, page);
    }
  });

  displayedReviews += reviewsPerPage;
}

// Call the getReviews function for the initial set of reviews
const mg = [1, 2]; // Replace with the actual manga IDs you want to fetch reviews for

mg.forEach(mg => {
  const pagesToFetch = Math.ceil(displayedReviews / reviewsPerPage);
  for (let page = 1; page <= pagesToFetch; page++) {
    getReviews(mg, page);
  }
});

// Add event listener to the "Show More" button
const showMoreButton = document.getElementById('show-more-button');
showMoreButton.addEventListener('click', showMoreReviews);