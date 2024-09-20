import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

const method = "POST";
const action = "/listings";

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
            console.log('Listing created successfully:', createdListing);
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