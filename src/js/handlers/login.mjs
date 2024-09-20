import { closeLoginOverlay, openLoginOverlay, setupOverlayListeners } from './overlayUtils.mjs';
import { updateBtnForLogIn, updateBtnForLogOut, updateButtons } from './updateBtn.mjs';
import { loginUser } from '../api/auth/login.mjs';

/**
 * Loads the login overlay into the page and sets up listeners.
 */
export function loadLoginOverlay() {
    const overlayContainer = document.getElementById('overlay-container');
    if (overlayContainer) {
        fetch('/feed/helpers/loginOverlay.html')
            .then(response => response.text())
            .then(data => {
                overlayContainer.innerHTML = data;
                console.log('Overlay loaded into container'); 
                setupOverlayListeners();
                loginFormListener();
            })
            .catch(error => console.error('Error loading overlay:', error));
    } else {
        console.error('Overlay container not found.');
    }
}

/**
 * Attaches an event listener to the login form for handling form submissions.
 */
export function loginFormListener() {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            try {
                const userData = await loginUser(profile);
                handleLoginSuccess(userData);

            } catch (error) {
                console.error("Login failed:", error.message);
                displayLoginError(error.message);
            }
        });
    } else {
        console.error('Form with ID "loginForm" not found.');
    }
}

/**
 * Handles successful login by updating the button state and storing user data.
 * 
 * @param {Object} userData - The data returned after a successful login.
 * @param {string} userData.token - The authentication token for the user.
 * @param {Object} userData.profile - The profile information of the user.
 */
export function handleLoginSuccess(userData) {
    updateBtnForLogIn(); 

    if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        localStorage.setItem('profile', JSON.stringify(userData.profile || {}));
    } else {
        console.error('Invalid userData:', userData);
    }

    closeLoginOverlay();
    console.log('User logged in:', userData);
}

/**
 * Displays an error message if login fails.
 * 
 * @param {string} [message="Login failed. Please check your credentials and try again."] - The error message to display.
 */
export function displayLoginError(message) {
    const errorContainer = document.querySelector("#loginError");
    if (errorContainer) {
        errorContainer.textContent = message || "Login failed. Please check your credentials and try again.";
        errorContainer.classList.remove("d-none");
    } else {
        console.error('Error container with ID "loginError" not found.');
    }
}