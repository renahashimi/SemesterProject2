// Function to toggle bids section visibility on listings
/**
 * Toggles the visibility of the bids section for a given listing.
 * 
 * @param {string} listingId - The ID of the listing for which to toggle the bids visibility.
 * @returns {void}
 * 
 * @example
 * // Toggle visibility for listing with ID '123'
 * toggleBidsVisibility('123');
 */
export function toggleBidsVisibility(listingId) {
    const bidsContainer = document.querySelector(`#bidsContainer-${listingId}`);
    
    if (bidsContainer) {
        if (bidsContainer.classList.contains("d-none")) {
            bidsContainer.classList.remove("d-none");
        } else {
            bidsContainer.classList.add("d-none");
        }
    }
}

// Header NAV
/**
 * Sets up the mobile menu toggle functionality.
 * 
 * Listens for click events on the mobile menu toggle button and the close menu button.
 * Toggles the visibility of the fullscreen mobile menu when the toggle button is clicked.
 * 
 * @returns {void}
 * 
 * @example
 * // Call this function to set up the mobile menu functionality
 * setupMobileMenu();
 */
export function setupMobileMenu() {
    const menuToggleButton = document.getElementById("mobile-menu-toggle");
    const fullscreenMenu = document.getElementById("mobile-fullscreen-menu");
    const closeMenuButton = document.getElementById("menu-close-btn");

    if (menuToggleButton && fullscreenMenu && closeMenuButton) {
        menuToggleButton.addEventListener("click", (e) => {
            e.stopPropagation();
            fullscreenMenu.classList.toggle("active");
            fullscreenMenu.classList.contains("d-none");
            fullscreenMenu.classList.add("d-flex");
            closeMenuButton.classList.add("d-block");
        });

        closeMenuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            fullscreenMenu.classList.remove("active");
        });
    }
}
