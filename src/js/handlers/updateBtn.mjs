import { openLoginOverlay } from './overlayUtils.mjs'; 
import { handleLogOut } from './logOut.mjs'; 

export function updateButtons(buttonText, iconAdd, iconRemove, clickHandler) {
    const buttons = document.querySelectorAll('.open-btn');
    buttons.forEach(button => {
        const icon = button.querySelector('i');
        const textElement = button.querySelector('p');

        if (textElement) {
            textElement.textContent = buttonText;
        if (icon) {
            icon.classList.remove(iconRemove);
            icon.classList.add(iconAdd);

            button.removeEventListener('click', openLoginOverlay);
            button.removeEventListener('click', handleLogOut); 
        }
            button.addEventListener('click', clickHandler); 
        } else {
            console.error('Icon or text element not found within the button.');
        }
    });
}

export function updateBtnForLogOut() {
    updateButtons('LOGIN', 'bi-door-open', 'bi-door-closed', openLoginOverlay);
}

export function updateBtnForLogIn() {
    updateButtons('LOGOUT', 'bi-door-closed', 'bi-door-open', handleLogOut);
}