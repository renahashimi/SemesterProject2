import { registerUser } from '../api/auth/register.mjs';
import { validateForm } from './validation.mjs';

export function registerFormListener() {
    const formElement = document.getElementById('registerForm');
    if (formElement) {
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Clear previous error messages
            clearErrors();

            // Validate form
            const { isValid } = validateForm();
            if (!isValid) {
                return;
            }

            const formData = new FormData(formElement);
            const profile = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const response = await registerUser(profile);
                console.log('Registration successful', response);
                formElement.reset();
               // window.location.href = '/index.html';
            } catch (error) {
                console.error('Registration failed', error);
                displayError('generalError', 'Registration failed. Please try again later.');
            }
        });
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = "";
        error.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    });
}

/**
 * Displays an error message in the specified error container.
 * 
 * @param {string} errorId - The ID of the error container element.
 * @param {string} message - The error message to display.
 */
function displayError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
  }
}
