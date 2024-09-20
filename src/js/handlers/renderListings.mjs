import { getListings } from '../api/listings/get.mjs';
import { createListingCard } from '../templates/listingCardTemplate.mjs';
import { createLoadMoreButton } from './loadMoreBtn.mjs';

let currentPage = 1;
const pageSize = 9;

export async function fetchListings(page = 1, limit = 9) {
  try {
    const token = localStorage.getItem('token');
    const listings = await getListings(page, limit, !!token);

    if (!listings || !Array.isArray(listings)) {
      throw new Error('No data received from the listings API');
    }

    localStorage.setItem('cachedListings', JSON.stringify(listings || []));
    return listings || [];
  } catch (error) {
    console.error('Failed to fetch listings:', error);

    const cachedListings = localStorage.getItem('cachedListings');
    if (cachedListings) {
      return JSON.parse(cachedListings).slice(0, pageSize); // Return only the first pageSize listings
    }

    return [];
  }
}

export async function renderAllListings(listings = [], append = false, listingId) {
  const listingContainer = document.getElementById('allListingsContainer');
  const loadMoreBtnContainer = document.getElementById('loadMoreBtnContainer');

  if (!listingContainer || !loadMoreBtnContainer) {
    console.error('Container elements not found.');
    return;
  }

  if (!append) {
    listingContainer.innerHTML = '';  
    loadMoreBtnContainer.innerHTML = ''; 
  }

  try {
    const listingsData = listings.length > 0 ? listings : await fetchListings(currentPage, pageSize);

    if (Array.isArray(listingsData)) {
      const sortedListings = listingsData.sort((a, b) => new Date(b.created) - new Date(a.created));

      sortedListings.forEach(listing => {
        const card = createListingCard(listing);  
        if (card instanceof HTMLElement) {
          listingContainer.appendChild(card);

          // Handle bidControls
          const bidControls = document.getElementById(`bidControls-${listingId}`);
          if (bidControls) {
            const endTime = new Date(listing.endTime).getTime();
            const now = new Date().getTime();
            const isSold = listing.bidCount > 0 && now >= endTime;
            const isExpired = listing.bidCount === 0 && now >= endTime;

            if (isSold) {
              bidControls.style.display = 'none';
              bidControls.innerHTML = '<p>"CLOSED / SOLD"</p>';
            } else if (isExpired) {
              bidControls.style.display = 'none';
              bidControls.innerHTML = '<p>"No bidding available."</p>';
            }
          }

        } else {
          console.error('Failed to create a valid listing card for:', listing);
        }
      });

      if (!document.querySelector('#loadMoreBtnContainer button')) {
        const loadMoreBtn = createLoadMoreButton();
        loadMoreBtnContainer.appendChild(loadMoreBtn);
      }

    } else {
      console.error('Data format is incorrect. Expected an array of listings.');
    }
  } catch (error) {
    console.error('Failed to fetch listings:', error);
  }
}