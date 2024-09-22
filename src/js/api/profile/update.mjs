import { API_AUCTION_URL } from '../constants.mjs';
import { authFetch } from '../authFetch.mjs';

const method = 'PUT';
const action = '/profiles';

/**
 * Updates the user's profile with the provided data.
 *
 * @param {Object} profileData - The data to update the profile with.
 * @param {string} profileData.name - The name of the user (required).
 * @param {string} [profileData.email] - The email of the user (optional).
 * @param {string} [profileData.banner] - The URL of the banner image (optional).
 * @param {string} [profileData.avatar] - The URL of the avatar image (optional).
 * @param {string} [profileData.bio] - The bio of the user (optional).
 * @returns {Promise<Object>} - A promise that resolves to the updated profile data.
 * @throws {Error} - Throws an error if the name is not provided or if the update fails.
 */
export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error('Requires a name');
  }
  
  const updateProfileUrl = `${API_AUCTION_URL}/profiles/${profileData.name}`;
  
  const requestBody = {
    name: profileData.name,
    email: profileData.email,
    banner: profileData.banner ? { url: profileData.banner } : null,
    avatar: profileData.avatar ? { url: profileData.avatar } : null,
    bio: profileData.bio || null, 
  };
  
  // Send the PUT request
  const response = await authFetch(updateProfileUrl, {
    method: 'PUT',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Profile update failed');
  }
  
  window.location.href = '/feed/profile/';
  return await response.json();
}
