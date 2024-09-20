import { load } from '../storage/index.mjs';
import { API_KEY } from './constants.mjs';


export function headers() {
  const token = load('token') || localStorage.getItem('token');
  
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-KEY": API_KEY
  };
}

export async function authFetch(url, options) {
  return fetch(url, {
      ...options,
      headers: headers(),
  })
}