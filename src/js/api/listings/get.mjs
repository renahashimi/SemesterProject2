import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const listing = "/listings";
const action = "?_seller=true&_bids=true&sort=created&order=desc";

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
    console.log("Fetched listings:", listings);
    return listings.data || [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export async function getListing(listing) {
  if (!listing) {
    throw new Error("No listing ID provided");
  }

  try {
    const getListingURL = `${API_AUCTION_URL}/listings/${listing}${action}`;

    const response = await authFetch(getListingURL);

    return await response.json();
  } catch (error) {
    throw new Error("Error getting listing: " + error.message);
  }
}