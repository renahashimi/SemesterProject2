import { API_AUCTION_URL } from '../constants.mjs'
import { authFetch } from '../authFetch.mjs'

const method = 'put'
const action = '/profiles'

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