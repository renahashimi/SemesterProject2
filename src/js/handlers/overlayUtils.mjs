/**
 * Opens the login overlay by setting its display style to "flex".
 * @function openLoginOverlay
 */
export function openLoginOverlay() {
    const overlay = document.getElementById("login-overlay");
    if (overlay) {
        overlay.style.display = "flex";
    } 
}

/**
 * Closes the login overlay by setting its display style to "none".
 * @function closeLoginOverlay
 */
export function closeLoginOverlay() {
    const overlay = document.getElementById("login-overlay");
    if (overlay) {
        overlay.style.display = "none";
    } 
}

/**
 * Sets up event listeners for opening and closing the login overlay.
 * Listeners are added to various buttons to handle the overlay's visibility.
 * @function setupOverlayListeners
 */
export function setupOverlayListeners() {
    const openDesktopButton = document.getElementById("desktop-open-overlay-btn");
    const openMobileButton = document.getElementById("mobile-open-overlay-btn");
    const openRegisterLogin = document.getElementById("register-open-overlay-btn");
    const closeButton = document.getElementById("close-overlay-btn");
    const openProfileButton = document.getElementById("profile-open-overlay-btn");
    const openBidButton = document.getElementById("bid-open-overlay-btn");

    if (openProfileButton) {
        openProfileButton.addEventListener("click", openLoginOverlay);
    }

    if (openBidButton) {
        openBidButton.addEventListener("click", openLoginOverlay);
    }

    if (openDesktopButton) {
        openDesktopButton.addEventListener("click", openLoginOverlay);
    } 
    
    if (openRegisterLogin) {
        openRegisterLogin.addEventListener("click", openLoginOverlay);
    } 
    
    if (openMobileButton) {
        openMobileButton.addEventListener("click", openLoginOverlay);
    } 
    
    if (closeButton) {
        closeButton.addEventListener("click", closeLoginOverlay);
    } 

    document.addEventListener("click", (event) => {
        const overlay = document.getElementById("login-overlay");
        if (overlay && event.target === overlay) {
            closeLoginOverlay();
        }
    });
}
