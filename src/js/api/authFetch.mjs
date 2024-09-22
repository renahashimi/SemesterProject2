import { load } from '../storage/index.mjs';
import { API_KEY } from './constants.mjs';

/**
 * Constructs headers for authenticated requests.
 * 
 * @returns {Object} - An object containing headers for the request.
 */
export function headers() {
  const token = load('token') || localStorage.getItem('token');
  
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-KEY": API_KEY
  };
}

/**
 * Performs a fetch request with authentication headers.
 * 
 * @param {string} url - The URL to send the request to.
 * @param {Object} [options] - Optional fetch options (e.g., method, body).
 * @returns {Promise<Response>} - The response from the fetch request.
 * @throws {Error} - Throws an error if the fetch fails.
 */
export async function authFetch(url, options) {
  return fetch(url, {
      ...options,
      headers: headers(),
  });
}
