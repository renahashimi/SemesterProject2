import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const method = "DELETE";
const action = "/listings";
const user = load("profile")?.name;

/**
 * Removes a listing by its ID.
 * 
 * This function sends a DELETE request to the API to remove a specific listing based on its ID.
 * After successful deletion, the user is redirected to their profile page.
 * 
 * @async
 * @function removeListing
 * @param {string} listingId - The ID of the listing to be removed.
 * @returns {Promise<Object>} A promise that resolves to the deleted listing's response data.
 * @throws {Error} Throws an error if the listing ID is not provided or the deletion fails.
 * 
 * @example
 * removeListing("12345")
 *     .then(() => console.log("Listing deleted successfully"))
 *     .catch(error => console.error("Failed to delete listing:", error));
 */
export async function removeListing(listingId) {
    if (!listingId) {
        throw new Error("You have to provide a listing ID to delete posts.");
    }

    const removeListingUrl = `${API_AUCTION_URL}${action}/${listingId}`;

    try {
        const response = await authFetch(removeListingUrl, {
            method,
        });

        if (!response.ok) {
            throw new Error(`Failed to delete listing: ${response.statusText}`);
        }

        // Redirect to the user's profile after successful deletion
        window.location.href = `/feed/profile/?name=${user}`;
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting listing:', error);
    }
}