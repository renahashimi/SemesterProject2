/**
 * Checks if the user is authenticated by verifying the presence of a token
 * and a profile in local storage.
 * 
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  const profile = localStorage.getItem("profile");
  return !!token && !!profile;
}
