/**
 * Loads the footer HTML from an external file and injects it into the footer container.
 * 
 * @returns {Promise<void>} A promise that resolves when the footer is loaded and injected.
 * @throws {Error} Throws an error if the footer fails to load.
 */
export function loadFooter() {
    return fetch("/feed/helpers/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("footerContainer").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
}
