import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

//const action = "?_listings=true&_wins=true&sort=created&order=desc";
const action = "?_listings=true&_seller=true&_wins=true"
const name = load("profile")?.name;
/**
 * Fetches all profiles.
 * 
 * @async
 * @function getProfiles
 * @returns {Promise<Object>} A promise that resolves to an array of profiles.
 * @throws {Error} Throws an error if the request fails or if there is an issue with the response.
 * 
 * @example
 * getProfiles()
 *     .then(profiles => console.log('Profiles:', profiles))
 *     .catch(error => console.error('Error fetching profiles:', error));
 */

export async function getProfiles() {
    try {
        const getProfilesUrl = `${API_AUCTION_URL}/profiles${action}`;
        console.log(getProfilesUrl)

        const response = await authFetch(getProfilesUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch profiles: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export async function getProfile(name) {
    if (!name) {
        throw new Error("Requires a name");
    }
    
    console.log("Fetching profile for:", name);  // Add this for debugging
    
    const getProfileUrl = `${API_AUCTION_URL}/profiles/${name}${action}`;
    
    try {
        const response = await authFetch(getProfileUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error; 
    }
}