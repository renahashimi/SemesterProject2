import { createListing } from "../api/listings/create.mjs";
import { save } from "../storage/index.mjs";
import { mediaAddBtn } from "./addMoreImg.mjs";

/**
 * Sets up the event listeners and functionality for the "Create Listing" form.
 */
export function setupCreateListingForm() {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("createPost");

        if (!form) {
            console.error("Create listing form not found");
            return;
        }

        const mediaContainer = document.getElementById("media-preview-container");
        mediaAddBtn(); 

        /**
         * Updates the media preview section based on the current media input values.
         */
        const updateMediaPreviews = () => {
            const mediaInputs = form.querySelectorAll("input[name='media[]']");
            mediaContainer.innerHTML = ""; 

            mediaInputs.forEach(input => {
                const url = input.value.trim();
                if (url) {
                    const mediaDiv = document.createElement("div");
                    mediaDiv.className = "media-item d-flex justify-content-between";
                    mediaDiv.style.height = "80px";

                    const preview = document.createElement("img");
                    preview.src = url;
                    preview.alt = "Media preview";
                    preview.style.maxWidth = "100px"; 
                    preview.style.height = "auto"; 

                    mediaDiv.appendChild(preview);
                    mediaContainer.appendChild(mediaDiv);
                }
            });
        };

        form.addEventListener("input", (event) => {
            if (event.target.name === "media[]") {
                updateMediaPreviews();
            }
        });

        updateMediaPreviews();

        form.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            const formData = new FormData(form);
            const listingData = {
                title: formData.get("title"),
                description: formData.get("description"),
                endsAt: formData.get("endsAt"),
                tags: (formData.get("tags") || "").split(",").map(tag => tag.trim()),
                media: Array.from(form.querySelectorAll("input[name='media[]']")).map(input => ({
                    url: input.value.trim(),
                    type: 'image'
                })).filter(mediaItem => mediaItem.url)
            };

            if (!listingData.title || listingData.title.length < 3) {
                alert("Title is required and must be at least 3 characters long.");
                return;
            }
            if (!listingData.description || listingData.description.length < 5) {
                alert("Description is required and must be at least 5 characters long.");
                return;
            }
            if (!listingData.endsAt || new Date(listingData.endsAt) <= new Date()) {
                alert("End date is required and must be a future date.");
                return;
            }

            try {
                const createdListing = await createListing(listingData);
                save("Listing", JSON.stringify(listingData));

                console.log("Listing created successfully:", createdListing);

                mediaContainer.innerHTML = ""; 
                listingData.media.forEach(mediaItem => {
                    if (mediaItem.url) {
                        const mediaDiv = document.createElement("div");
                        mediaDiv.className = "media-item d-flex justify-content-between";
                        mediaDiv.style.height = "80px";

                        const preview = document.createElement("img");
                        preview.src = mediaItem.url;
                        preview.alt = "Media preview";
                        preview.style.maxWidth = "100px";

                        mediaDiv.appendChild(preview);
                        mediaContainer.appendChild(mediaDiv);
                    }
                });

                alert("Listing created successfully");
                window.location.href = "/feed/profile/";
            } catch (error) {
                console.error("Error creating listing:", error);
                alert("Failed to create listing. Please check the console for details.");
            }
        });
    });
}
