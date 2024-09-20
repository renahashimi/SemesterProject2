// Function to initialize the "Back to Top" button
export function goBackUpBtn(buttonId, scrollThreshold) {
    const button = document.getElementById(buttonId);

    if (!button) {
        console.error(`Button with ID "${buttonId}" not found.`);
        return;
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > scrollThreshold) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    goBackUpBtn('goBackUpBtn', 300);
});