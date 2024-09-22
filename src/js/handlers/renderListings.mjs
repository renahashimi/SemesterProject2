import { getListings } from "../api/listings/get.mjs";
import { createListingCard } from "../templates/listingCardTemplate.mjs";
import { createLoadMoreButton } from "./loadMoreBtn.mjs";

let currentPage = 1;
const pageSize = 9;
let sortOption = "all";

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
      return JSON.parse(cachedListings).slice(0, pageSize); 
    }

    return [];
  }
}

/**
 * Renders all listings in the specified container, with optional appending.
 * @param {Array} listings - The listings to render.
 * @param {boolean} append - Whether to append to the existing listings.
 * @param {string} listingId - (Optional) A specific listing ID to render.
 */
export async function renderAllListings(listings = [], append = false, listingId) {
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
      let sortedListings;
      if (sortOption === "newToOld") {
        sortedListings = listingsData.sort((a, b) => new Date(b.created) - new Date(a.created));
      } else if (sortOption === "oldToNew") {
        sortedListings = listingsData.sort((a, b) => new Date(a.created) - new Date(b.created));
      } else {
        sortedListings = listingsData;
      }

      sortedListings.forEach(listing => {
        const card = createListingCard(listing);
        console.log("Listing created:", card);  

        if (card instanceof HTMLElement) {
          listingContainer.appendChild(card);

          // Log listing id and bid control elements
          console.log(`Listing ID: ${listing.id}`);
          const bidControls = document.getElementById(`bidControls-${listing.id}`);
          console.log("Bid Controls Element:", bidControls);

          if (bidControls) {
            const endTime = new Date(listing.endTime).getTime();
            const now = new Date().getTime();
            const isSold = listing.bidCount > 0 && now >= endTime;
            const isExpired = listing.bidCount === 0 && now >= endTime;

            console.log(`Bid Status - isSold: ${isSold}, isExpired: ${isExpired}`);

            if (isSold) {
              bidControls.style.display = "none";
              bidControls.innerHTML = '<p>"CLOSED / SOLD"</p>';
            } else if (isExpired) {
              bidControls.style.display = "none";
              bidControls.innerHTML = '<p>"No bidding available."</p>';
            }
          }
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

// Event listeners for filter buttons
document.getElementById('filterAll').addEventListener('click', async (e) => {
  e.preventDefault();
  const listings = await fetchListings();
  renderAllListings(listings);

  // Update the dropdown button text to "All Listings"
  document.getElementById('filterDropdown').innerText = "All Listings";
});

document.getElementById('filterNewToOld').addEventListener('click', async (e) => {
  e.preventDefault();
  const listings = await fetchListings();
  const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
  renderAllListings(sortedListings);

  // Update the dropdown button text to "Date: New to Old"
  document.getElementById('filterDropdown').innerText = "Date: New to Old";
});

document.getElementById('filterOldToNew').addEventListener('click', async (e) => {
  e.preventDefault();
  const listings = await fetchListings();
  const sortedListings = listings.sort((a, b) => new Date(a.created) - new Date(b.created));
  renderAllListings(sortedListings);

  // Update the dropdown button text to "Date: Old to New"
  document.getElementById('filterDropdown').innerText = "Date: Old to New";
});
