import { getListings } from "../api/listings/get.mjs";
import { createListingCard } from "../templates/listingCardTemplate.mjs";
import { renderAllListings } from "./renderListings.mjs";

/**
 * Filters listings based on the search query.
 * 
 * @param {string} query - The search query string.
 * @returns {Promise<Object[]>} A promise that resolves to an array of filtered listings.
 */
export async function searchListings(query) {
    try {
        const result = await getListings(1, 100);
        console.log('API result:', result);

        // Ensure result is an array (adjust this based on your API response)
        if (!result || !Array.isArray(result)) {
            console.error('Listings data is missing or incorrect:', result);
            return [];
        }

        const listings = result; 

        if (!query || typeof query !== 'string') {
            return [];
        }

        return listings.filter(listing => {
            if (!listing) {
                console.error('Listing is undefined:', listing);
                return false;
            }

            const title = listing.title ? listing.title.toLowerCase() : '';
            const username = listing.seller && listing.seller.name ? listing.seller.name.toLowerCase() : '';
            const description = listing.description ? listing.description.toLowerCase() : '';

            return title.includes(query.toLowerCase()) ||
                username.includes(query.toLowerCase()) ||
                description.includes(query.toLowerCase());
        });
    } catch (error) {
        console.error('Error searching listings:', error.message, error.stack);
        return [];
    }
}

/**
 * Handles form submission for searching listings.
 * 
 * @param {Event} event - The form submit event.
 */
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    const searchResultContainer = document.getElementById('searchresult');
    const clearSearchResultBtn = document.getElementById('clearSearchResultBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (query) {
        searchListings(query).then(filteredListings => {
            searchResultContainer.innerHTML = '';
            if (Array.isArray(filteredListings) && filteredListings.length > 0) {
                filteredListings.forEach(listing => {
                    const listingCard = createListingCard(listing);
                    searchResultContainer.appendChild(listingCard);
                });
                searchResultContainer.classList.add('has-results'); 
                searchResultContainer.style.display = 'block';
                clearSearchResultBtn.style.display = 'block'; 
                clearSearchBtn.style.display = 'block'; 
            } else {
                searchResultContainer.innerHTML = '<p>No results found for your search.</p>'; 
                searchResultContainer.classList.remove('has-results'); 
                searchResultContainer.classList.add('no-results'); 
                searchResultContainer.style.display = 'block'; 
                clearSearchResultBtn.style.display = 'block'; 
            }
        });
    } else {
        renderAllListings(); 
        searchResultContainer.classList.remove('has-results'); 
        searchResultContainer.style.display = 'none'; 
        clearSearchResultBtn.style.display = 'block';
        clearSearchBtn.style.display = 'block'; 
    }
}


/**
 * Clears the search input and search results.
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultContainer = document.getElementById('searchresult');
    const clearSearchResultBtn = document.getElementById('clearSearchResultBtn');

    if (searchInput && searchResultContainer) {
        searchInput.value = '';
        searchResultContainer.innerHTML = '';
        searchResultContainer.classList.remove('has-results'); 
        searchResultContainer.style.display = 'none'; 
        renderAllListings(); 
        clearSearchResultBtn.style.display = 'none'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#searchForm');
    const clearSearchResultBtn = document.getElementById('clearSearchResultBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    if (clearSearchResultBtn) {
        clearSearchResultBtn.addEventListener('click', clearSearch);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
});