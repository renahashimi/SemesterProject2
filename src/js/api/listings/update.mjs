import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const method = "PUT";
const action = "?_seller=true&_bids=true";

/**
 * Updates an existing listing.
 * 
 * @async
 * @function updateListing
 * @param {string} listingId - The ID of the listing to update.
 * @param {Object} listingData - The data to update the listing with.
 * @returns {Promise<Object>} The updated listing data.
 * @throws {Error} Throws an error if the request fails or if there is an issue with the response.
 * 
 * @example
 * updateListing("12345", { title: "New Title", description: "Updated Description" })
 *     .then(updatedListing => console.log('Listing updated successfully:', updatedListing))
 *     .catch(error => console.error('Error updating listing:', error));
 */
export async function updateListing(listingId, listingData) {
    const updateUrl = `${API_AUCTION_URL}/listings/${listingId}${action}`;

    try {
        const response = await authFetch(updateUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                ...listingData,
                media: listingData.media || [],
            }),
        });

        if (response.ok) {
            const updatedListing = await response.json();
            
            // Redirect to the edit page or any other page you need
            window.location.href = `/feed/listings/edit/?listing=${listingId}`;

            console.log('Listing updated successfully:', updatedListing);
            return updatedListing;
        } else {
            const errorText = await response.text();
            console.error('Response Status:', response.status);
            console.error('Response Text:', errorText);
            throw new Error(`Failed to update listing: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating listing:', error);
        throw error;
    }
}