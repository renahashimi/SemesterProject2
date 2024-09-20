export function mediaAddBtn() {
    const addMediaBtn = document.getElementById("addMediaBtn");
    const mediaContainer = document.getElementById("media-container");

    if (addMediaBtn && mediaContainer) {
        addMediaBtn.addEventListener("click", function() {
            const newMediaDiv = document.createElement("div");
            newMediaDiv.classList.add("form-group", "my-2");
            newMediaDiv.innerHTML = `
                <label for="media">Media</label>
                <input class="form-control" name="media[]" type="url">
            `;
            mediaContainer.appendChild(newMediaDiv);
        });
    } else {
        console.warn("Add Media button or Media container not found. Skipping event listener setup.");
    }
}