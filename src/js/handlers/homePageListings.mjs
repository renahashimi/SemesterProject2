import { getListings } from "../api/listings/get.mjs";
import { simpleListingCard } from "../templates/simpleCardTemplate.mjs";

/**
 * Renders home listings based on the viewport size.
 * Displays a single listing switch for mobile devices and a carousel for larger screens.
 */
export async function renderHomeListings() {
  const switchContainer = document.getElementById("switchContainer");
  const carouselContainer = document.getElementById("carouselContainer");

  if (!switchContainer || !carouselContainer) {
    return;
  }

  try {
    const listings = await getListings(1, 30);

    if (window.matchMedia("(max-width: 767px)").matches) {
      displaySingleListingSwitch(listings);
      switchContainer.classList.remove("d-none");
      carouselContainer.classList.add("d-none");
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      displayCarouselListings(listings);
      switchContainer.classList.add("d-none");
      carouselContainer.classList.remove("d-none");
    }
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }
}

/**
 * Displays a single listing that updates every 5 seconds for mobile devices.
 * @param {Array} listings - An array of listings to display.
 */
function displaySingleListingSwitch(listings) {
  const switchContainer = document.getElementById("switchContainer");
  switchContainer.innerHTML = "";

  if (listings.length === 0) {
    switchContainer.innerHTML = "<p>No listings available.</p>";
    return;
  }

  let index = 0;

  function updateListing() {
    switchContainer.innerHTML = "";
    const listingCard = simpleListingCard(listings[index]);
    if (listingCard) {
      switchContainer.appendChild(listingCard);
    }
    index = (index + 1) % listings.length;
  }

  updateListing();
  setInterval(updateListing, 5000); 
}

/**
 * Displays listings in a carousel format for larger screens.
 * @param {Array} listings - An array of listings to display.
 */
function displayCarouselListings(listings) {
  const carouselContainer = document.getElementById("carouselContainer");
  carouselContainer.innerHTML = "";

  const carousel = document.createElement("div");
  carousel.classList.add("carousel", "slide", "m-auto");
  carousel.setAttribute("id", "carouselExample");
  carousel.setAttribute("data-bs-ride", "carousel");

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  let isActive = true;
  const itemsPerSlide = 2;

  for (let i = 0; i < listings.length; i += itemsPerSlide) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
  
    if (isActive) {
      carouselItem.classList.add("active");
      isActive = false;
    }
  
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("d-flex", "justify-content-center", "m-auto");
    rowContainer.style.width = "650px";
  
    for (let j = i; j < i + itemsPerSlide && j < listings.length; j++) {
      const listingCard = simpleListingCard(listings[j]);
      if (listingCard) {
        rowContainer.appendChild(listingCard);
      }
    }
  
    carouselItem.appendChild(rowContainer);
    carouselInner.appendChild(carouselItem);
  }

  carousel.appendChild(carouselInner);

  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#carouselExample");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `
    <i class="bi bi-arrow-left-circle"></i>
    <span class="visually-hidden">Previous</span>
  `;

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#carouselExample");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
    <i class="bi bi-arrow-right-circle"></i>
    <span class="visually-hidden">Next</span>
  `;

  // Append the buttons to the carousel
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  carouselContainer.appendChild(carousel);

  const carouselElement = document.getElementById("carouselExample");
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 7000,
    });
  }
}

// Add event listener to render listings on window resize
window.addEventListener("resize", renderHomeListings);
