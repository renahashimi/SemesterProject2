import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const method = "POST";
const action = "/listings";

/**
 * Creates a new listing with the provided data.
 *
 * @param {Object} listingData - The data for the new listing.
 * @param {string} listingData.title - The title of the listing.
 * @param {string} listingData.description - The description of the listing.
 * @param {string} listingData.endsAt - The expiration date of the listing.
 * @param {Array<Object>} [listingData.media] - An array of media objects associated with the listing.
 * @returns {Promise<Object>} - A promise that resolves to the created listing object.
 * @throws {Error} - Throws an error if the listing creation fails.
 */
export async function createListing(listingData) {
    const createUrl = `${API_AUCTION_URL}${action}`;

    try {
        const response = await authFetch(createUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...listingData,
                media: listingData.media || [],
            }),
        });
    
        if (response.ok) {
            const createdListing = await response.json();
            return createdListing;
        } else {
            const errorText = await response.text();
            console.error('Response Status:', response.status);
            console.error('Response Text:', errorText);
            throw new Error(`Failed to create listing: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating listing:', error);
        throw error;
    }
}
