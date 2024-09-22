import * as handlers from "../handlers/index.mjs";

/**
 * Sets up event listeners and initializes handlers for the entire page.
 * This function is intended to be called on page load to ensure that 
 * all necessary UI updates and event listeners are applied.
 * 
 * It performs the following actions:
 * - Checks the authentication status of the user.
 * - Sets up listeners for overlay elements (e.g., modals).
 * - Updates the UI based on the user's authentication status.
 * - Highlights the active navigation link for better user experience.
 * - Loads the footer content dynamically.
 * - Handles any other necessary actions during page load.
 * - Sets up the mobile menu for responsive design.
 * 
 * @function allPageListener
 * @returns {void}
 */
export function allPageListener() {
  handlers.checkAuthStatus();
  handlers.setupOverlayListeners();
  handlers.updateUIBasedOnAuth();
  handlers.highlightActiveLink();
  handlers.loadFooter();
  handlers.handlePageLoad();
  handlers.setupMobileMenu();
}
