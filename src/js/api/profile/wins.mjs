import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export default async function getWins(profileName) {
  if (!profileName) {
    throw new Error("Profile name is not available.");
  }
  const winsEndpoint = "/wins?_seller=true&_bids=true";

  const winsUrl = `${API_AUCTION_URL}/profiles/${profileName}${winsEndpoint}`;

  try {
    const response = await authFetch(winsUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting wins:", error);
    throw new Error(`Error getting wins: ${error.message}`);
  }
}