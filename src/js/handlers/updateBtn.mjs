import { openLoginOverlay } from "./overlayUtils.mjs"; 
import { handleLogOut } from "./logOut.mjs"; 

/**
 * Updates button text, icon, and click handler for elements with the class 'open-btn'.
 * 
 * @param {string} buttonText - The text to set on the button.
 * @param {string} iconAdd - The icon class to add to the button.
 * @param {string} iconRemove - The icon class to remove from the button.
 * @param {Function} clickHandler - The function to handle button clicks.
 * @returns {void}
 * 
 * @example
 * // Update buttons to show login state
 * updateButtons("LOGIN", "bi-door-open", "bi-door-closed", openLoginOverlay);
 */
export function updateButtons(buttonText, iconAdd, iconRemove, clickHandler) {
    const buttons = document.querySelectorAll(".open-btn");
    buttons.forEach(button => {
        const icon = button.querySelector("i");
        const textElement = button.querySelector("p");

        if (textElement) {
            textElement.textContent = buttonText;
            if (icon) {
                icon.classList.remove(iconRemove);
                icon.classList.add(iconAdd);

                button.removeEventListener("click", openLoginOverlay);
                button.removeEventListener("click", handleLogOut); 
            }
            button.addEventListener("click", clickHandler); 
        } else {
            console.error("Icon or text element not found within the button.");
        }
    });
}

/**
 * Updates buttons for logging out state, setting the button to display "LOGIN".
 * 
 * @returns {void}
 * 
 * @example
 * // Call this function to update buttons to log out state
 * updateBtnForLogOut();
 */
export function updateBtnForLogOut() {
    updateButtons("LOGIN", "bi-door-open", "bi-door-closed", openLoginOverlay);
}

/**
 * Updates buttons for logging in state, setting the button to display "LOGOUT".
 * 
 * @returns {void}
 * 
 * @example
 * // Call this function to update buttons to log in state
 * updateBtnForLogIn();
 */
export function updateBtnForLogIn() {
    updateButtons("LOGOUT", "bi-door-closed", "bi-door-open", handleLogOut);
}
