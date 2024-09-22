import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const listing = "/listings";
const action = "?_seller=true&_bids=true&sort=created&order=desc";

/**
 * Fetches listings from the API with optional pagination and authentication.
 *
 * @param {number} [page=1] - The page number to fetch (default is 1).
 * @param {number} [limit=9] - The number of listings to fetch per page (default is 9).
 * @param {boolean} [authenticated=false] - Whether to include authentication headers.
 * @returns {Promise<Array>} - A promise that resolves to an array of listings.
 * @throws {Error} - Throws an error if fetching listings fails.
 */
export async function getListings(page = 1, limit = 9, authenticated = false) {
  try {
    const token = localStorage.getItem('token');
    const listingsUrl = `${API_AUCTION_URL}${listing}${action}&page=${page}&limit=${limit}`;

    const headers = authenticated && token ? {
      'Authorization': `Bearer ${token}`
    } : {};

    const response = await authFetch(listingsUrl, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`);
    }

    const listings = await response.json();
    return listings.data || [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

/**
 * Fetches a single listing by its ID.
 *
 * @param {string} listingId - The ID of the listing to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the listing object.
 * @throws {Error} - Throws an error if the listing ID is not provided or if fetching fails.
 */
export async function getListing(listingId) {
  if (!listingId) {
    throw new Error("No listing ID provided");
  }

  try {
    const getListingURL = `${API_AUCTION_URL}/listings/${listingId}${action}`;

    const response = await authFetch(getListingURL);

    return await response.json();
  } catch (error) {
    throw new Error("Error getting listing: " + error.message);
  }
}
