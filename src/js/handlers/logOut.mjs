import { closeLoginOverlay, openLoginOverlay } from "./overlayUtils.mjs";
import { updateBtnForLogIn, updateBtnForLogOut } from "./updateBtn.mjs";

/**
 * Handles the logout process. 
 * Prompts the user to confirm logout, clears storage, updates UI, 
 * and redirects to the homepage if confirmed.
 */
export function handleLogOut() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.clear();
        sessionStorage.clear();

        updateBtnForLogOut(); 
        openLoginOverlay()
      
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
    } else {
       closeLoginOverlay()
       updateBtnForLogIn()
    }
}