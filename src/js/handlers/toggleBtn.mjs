// Function to toggle bids section visibility on listings
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
export function setupMobileMenu() {
    const menuToggleButton = document.getElementById("mobile-menu-toggle");
    const fullscreenMenu = document.getElementById("mobile-fullscreen-menu");
    const closeMenuButton = document.getElementById("menu-close-btn");

    if (menuToggleButton && fullscreenMenu && closeMenuButton) {
        menuToggleButton.addEventListener("click", (e) => {
            e.stopPropagation()
            fullscreenMenu.classList.toggle("active");
            fullscreenMenu.classList.contains("d-none");
            fullscreenMenu.classList.add("d-flex");
            closeMenuButton.classList.add("d-block")
        });

        closeMenuButton.addEventListener("click", (e) => {
            e.stopPropagation()
            fullscreenMenu.classList.remove("active");
        });
    }
}
