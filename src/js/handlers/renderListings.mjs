import { getListings } from "../api/listings/get.mjs";
import { createListingCard } from "../templates/listingCardTemplate.mjs";
import { createLoadMoreButton } from "./loadMoreBtn.mjs";

let currentPage = 1;
const pageSize = 9;

/**
 * Fetches listings from the API, or retrieves them from local storage if unavailable.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of listings to fetch per page.
 * @returns {Promise<Array>} A promise that resolves to an array of listings.
 */
export async function fetchListings(page = 1, limit = 9) {
  try {
    const token = localStorage.getItem("token");
    const listings = await getListings(page, limit, !!token);

    if (!listings || !Array.isArray(listings)) {
      throw new Error("No data received from the listings API");
    }

    localStorage.setItem("cachedListings", JSON.stringify(listings || []));
    return listings || [];
  } catch (error) {
    console.error("Failed to fetch listings:", error);

    const cachedListings = localStorage.getItem("cachedListings");
    if (cachedListings) {
      return JSON.parse(cachedListings); 
    }

    return [];
  }
}

/**
 * Renders all listings in the specified container, with optional appending.
 * @param {Array} listings - The listings to render.
 * @param {boolean} append - Whether to append to the existing listings.
 */
export async function renderAllListings(listings = [], append = false) {
  const listingContainer = document.getElementById("allListingsContainer");
  const loadMoreBtnContainer = document.getElementById("loadMoreBtnContainer");

  if (!listingContainer || !loadMoreBtnContainer) {
    console.error("Container elements not found.");
    return;
  }

  if (!append) {
    listingContainer.innerHTML = "";  
    loadMoreBtnContainer.innerHTML = ""; 
  }

  try {
    const listingsData = listings.length > 0 ? listings : await fetchListings(1, 100);

    if (Array.isArray(listingsData)) {
      const displayedListings = listingsData.slice(0, pageSize); 

      displayedListings.forEach(listing => {
        const card = createListingCard(listing);  

        if (card instanceof HTMLElement) {
          listingContainer.appendChild(card);
        } else {
          console.error("Failed to create a valid listing card for:", listing);
        }
      });

      if (!document.querySelector("#loadMoreBtnContainer button")) {
        const loadMoreBtn = createLoadMoreButton();
        loadMoreBtnContainer.appendChild(loadMoreBtn);
      }
    } else {
      console.error("Data format is incorrect. Expected an array of listings.");
    }
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }
}

/**
 * Filters and sorts the listings based on the specified option.
 * @param {Array} listings - The listings to filter.
 * @param {string} option - The sorting option ("all", "newToOld", "oldToNew").
 * @returns {Array} The filtered and sorted listings.
 */
function filterListings(listings, option) {
  switch (option) {
    case "newToOld":
      return listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    case "oldToNew":
      return listings.sort((a, b) => new Date(a.created) - new Date(b.created));
    default:
      return listings; // No sorting for "all"
  }
}

// Event listeners for filter buttons
document.addEventListener("DOMContentLoaded", () => {
  const listingContainer = document.getElementById("allListingsContainer");

  if (listingContainer) {
    document.getElementById('filterAll')?.addEventListener('click', async (e) => {
      e.preventDefault();
      const listings = await fetchListings(); 
      renderAllListings(listings);
      document.getElementById('filterDropdown').innerText = "All Listings";
    });

    document.getElementById('filterNewToOld')?.addEventListener('click', async (e) => {
      e.preventDefault();
      const listings = await fetchListings(); 
      const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
      renderAllListings(sortedListings); 
      document.getElementById('filterDropdown').innerText = "New to Old";
    });

    document.getElementById('filterOldToNew')?.addEventListener('click', async (e) => {
      e.preventDefault();
      const listings = await fetchListings(); 
      const sortedListings = listings.sort((a, b) => new Date(a.created) - new Date(b.created));
      renderAllListings(sortedListings); 
      document.getElementById('filterDropdown').innerText = "Old to New";
    });
  }
});

