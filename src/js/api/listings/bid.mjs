import { load, save } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const action = "/listings";

/**
 * Submits a bid for a specified listing.
 *
 * @param {string} listingId - The ID of the listing for which the bid is being placed.
 * @param {number} bidSum - The amount of the bid.
 * @returns {Promise<void>} - A promise that resolves when the bid is submitted.
 */
export async function submitBid(listingId, bidSum) {
  const bidUrl = `${API_AUCTION_URL}${action}/${listingId}/bids`;

  try {
    const response = await authFetch(bidUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: bidSum })
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert('You are not authorized to place a bid. Please log in.');
        window.location.href = "/feed/listings/index.html"; 
        return;
      }
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    alert('Bid placed successfully!');
  } catch (error) {
    console.error('Error submitting bid:', error);
    alert('Failed to place bid. Please try again.');
  }
}

/**
 * Handles the bid submission process.
 *
 * @param {string} listingId - The ID of the listing for which the bid is being placed.
 * @param {number} bidSum - The amount of the bid.
 */
export function handleBid(listingId, bidSum) {
  if (bidSum && !isNaN(bidSum) && bidSum > 0) {
    submitBid(listingId, bidSum);
  } else {
    alert("Please enter a valid bid amount.");
  }
}
