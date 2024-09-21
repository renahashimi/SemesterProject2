import { loadLoginOverlay, setupMobileMenu, updateBtnForLogIn } from "./index.mjs";
import { load } from "../storage/index.mjs";
import { closeLoginOverlay, openLoginOverlay } from "./overlayUtils.mjs";
import { handleLogOut } from "./logOut.mjs";

/**
 * Initializes the header by loading the header HTML, highlighting the active link,
 * and setting up the login overlay and authentication status.
 */
document.addEventListener("DOMContentLoaded", function() {
    fetch("/feed/helpers/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            highlightActiveLink();
            loadLoginOverlay();
            checkAuthStatus(); 
            setupMobileMenu()
        });
});

/**
 * Highlights the navigation links based on the current path.
 */
export function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const pageLinks = {
        "/": ["mobile-home-link"],
        "/index.html": ["mobile-home-link"],
        "/feed/listings/": ["mobile-listings-link"],
        "/feed/profile/": ["mobile-profile-link"],
        "/feed/contact/": ["mobile-contact-link"],
    };
    const pageLinks2 = {
        "/": ["desktop-home-link"],
        "/index.html": ["desktop-home-link"],
        "/feed/listings/": ["desktop-listings-link"],
        "/feed/profile/": ["desktop-profile-link"],
        "/feed/contact/": ["desktop-contact-link"],
    };

    const activeLinkIds = pageLinks[currentPath];
    if (activeLinkIds) {
        activeLinkIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add("activ1");
            }
        });
    }

    const activeLinkIds2 = pageLinks2[currentPath];
    if (activeLinkIds2) {
        activeLinkIds2.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add("activ");
            }
        });
    }
}

/**
 * Loads the login overlay HTML into the overlay container and initializes button listeners.
 * Also updates the login button state.
 */
function loadHeaderOverlay() {
    const overlayContainer = document.getElementById("overlay-container");
    if (overlayContainer) {
        fetch("/feed/helpers/loginOverlay.html")
            .then((response) => response.text())
            .then((data) => {
                overlayContainer.innerHTML = data;
                setTimeout(() => {
                    updateLoginButtonState();
                }, 0);

                import("../../js/handlers/login.mjs")
                    .then((module) => {
                        if (module.setupButtonListeners) {
                            module.setupButtonListeners();
                        } else {
                            console.error("setupButtonListeners not found in module");
                        }
                    })
                    .catch((error) => console.error("Error importing module:", error));

                updateLoginButtonState();
            })
            .catch((error) => console.error("Error loading overlay:", error));
    } else {
        console.error("Element with ID 'overlay-container' not found.");
    }
}

/**
 * Updates the login button state based on the user"s login status.
 */
function updateLoginButtonState() {
    const button = document.getElementById("open-overlay-btn");
    if (button) {
        const isLoggedIn = !!localStorage.getItem("profile");

        const icon = button.querySelector("i");
        const textElement = button.querySelector("p");

        if (textElement && icon) {
            if (isLoggedIn) {
                icon.classList.replace("bi-door-open", "bi-door-closed");
                textElement.textContent = "LOGOUT";
            } else {
                icon.classList.replace("bi-door-closed", "bi-door-open");
                textElement.textContent = "LOGIN";
            }
        } else {
            console.error("Icon or text element not found within the button.");
        }
    } else {
        console.error("Button with ID 'open-overlay-btn' not found.");
    }
}

/**
 * Toggles the visibility of authentication buttons based on the user"s login status.
 * Adds event listeners for login or logout actions.
 * 
 * @param {boolean} isLoggedIn - Indicates if the user is logged in.
 */
function toggleAuthButtons(isLoggedIn) {
    const loginButtonDesktop = document.getElementById("desktop-open-overlay-btn");
    const logoutButtonDesktop = document.getElementById("desktop-logout-btn");
    const loginButtonMobile = document.getElementById("mobile-open-overlay-btn");
    const logoutButtonMobile = document.getElementById("mobile-logout-btn");

    if (loginButtonDesktop && logoutButtonDesktop && loginButtonMobile && logoutButtonMobile) {
        if (isLoggedIn) {
            loginButtonDesktop.style.display = "none";
            logoutButtonDesktop.style.display = "block";
            loginButtonMobile.style.display = "none";
            logoutButtonMobile.style.display = "block";

            logoutButtonDesktop.addEventListener("click", handleLogOut);
            logoutButtonMobile.addEventListener("click", handleLogOut);
        } else {
            loginButtonDesktop.style.display = "block";
            logoutButtonDesktop.style.display = "none";
            loginButtonMobile.style.display = "block";
            logoutButtonMobile.style.display = "none";

            loginButtonDesktop.addEventListener("click", openLoginOverlay);
            loginButtonMobile.addEventListener("click", openLoginOverlay);
        }
    }
}

/**
 * Checks the authentication status of the user.
 * Updates the UI and login overlay based on whether the user is logged in or not.
 */
export function checkAuthStatus() {
    const token = load("token"); 
    const profile = load("profile");
    if (token && profile) {
        updateBtnForLogIn(); 
        closeLoginOverlay();
    } else {
        openLoginOverlay();
    }
}


/**
 * Updates the UI based on the user"s authentication status.
 */
export function updateUIBasedOnAuth() {
    const token = load("token");
    toggleAuthButtons(!!token);
}
