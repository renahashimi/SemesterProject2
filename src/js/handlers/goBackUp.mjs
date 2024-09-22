/**
 * Initializes the "Back to Top" button functionality.
 * 
 * @param {string} buttonId - The ID of the button element to be used for scrolling back to the top.
 * @param {number} scrollThreshold - The scroll position (in pixels) at which the button should appear.
 */
export function goBackUpBtn(buttonId, scrollThreshold) {
    const button = document.getElementById(buttonId);

    if (!button) {
        console.error(`Button with ID "${buttonId}" not found.`);
        return;
    }

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > scrollThreshold) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    // Scroll to the top when the button is clicked
    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Initialize the button when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    goBackUpBtn("goBackUpBtn", 300);
});
