import { getListing, updateListing } from "../api/listings/index.mjs";
import { mediaAddBtn } from "./addMoreImg.mjs";

/**
 * Sets up an event listener for updating a listing. 
 * This function retrieves the listing data when the page is loaded,
 * populates the form fields, and handles the submission of the form
 * to update the listing details.
 * 
 * @async
 * @function setUpdateListingListener
 * @returns {void}
 * 
 * @example
 * // Call this function to initialize the update listener for the listing
 * setUpdateListingListener();
 */
export async function setUpdateListingListener() {
    document.addEventListener("DOMContentLoaded", async () => {
        const form = document.querySelector("#editListing");

        if (!form) {
            console.error("Listing form not found");
            return;
        }

        const isUpdate = form.dataset.mode === "update"; 
        if (isUpdate) {
            const url = new URL(location.href);
            const id = url.searchParams.get("listing"); 

            if (!id) {
                console.error("No listing ID found in URL");
                return;
            }

            const button = form.querySelector("button[type='submit']");
            if (button) {
                button.disabled = true;

                try {
                    mediaAddBtn(); 
                    const response = await getListing(id);
                    const listing = response.data; 

                    form.querySelector("#title").value = listing.title || "";
                    form.querySelector("#description").value = listing.description || "";

                    if (listing.endsAt) {
                        const endsAt = new Date(listing.endsAt);
                        const formattedEndsAt = `${endsAt.getFullYear()}-${String(endsAt.getMonth() + 1).padStart(2, '0')}-${String(endsAt.getDate()).padStart(2, '0')}T${String(endsAt.getHours()).padStart(2, '0')}:${String(endsAt.getMinutes()).padStart(2, '0')}`;
                        form.querySelector("#endsAt").value = formattedEndsAt;
                        form.querySelector("#endsAt").disabled = true; 
                    }

                    form.querySelector("#tags").value = listing.tags ? listing.tags.join(", ") : "";

                    const mediaContainer = form.querySelector("#media-container");
                    if (!mediaContainer) {
                        console.error("Media container not found");
                        return;
                    }

                    mediaContainer.innerHTML = "";
                    if (listing.media && listing.media.length > 0) {
                        listing.media.forEach(mediaItem => {
                            const mediaDiv = document.createElement("div");
                            mediaDiv.className = "media-item d-flex justify-content-between my-2";

                            // Add preview image
                            if (mediaItem.url) {
                                const preview = document.createElement("img");
                                preview.src = mediaItem.url;
                                preview.alt = "Media preview";
                                preview.style.maxWidth = "50px"; 
                                preview.className = "ms-2";
                                mediaDiv.appendChild(preview);
                            }
                            const input = document.createElement("input");
                            input.classList.add("form-control", "w-100");
                            input.type = "url";
                            input.name = "media[]";
                            input.value = mediaItem.url || "";

                            mediaDiv.appendChild(input);

                            // Clear URL Button
                            const clearBtn = document.createElement("button");
                            clearBtn.type = "button";
                            clearBtn.classList.add("btn", "btn-white", "border-danger", "rounded-circle", "p-0", "m-2", "mt-3");
                            clearBtn.style.width = "40px"; 
                            clearBtn.style.height = "40px"; 
                            clearBtn.style.display = "flex";  
                            clearBtn.style.justifyContent = "center"; 
                            clearBtn.style.alignItems = "center"; 
                            clearBtn.onclick = () => {
                                input.value = "";  
                            };

                            const clearBtnIcon = document.createElement("i");
                            clearBtnIcon.classList.add("bi", "bi-trash-fill", "text-primary");

                            clearBtn.appendChild(clearBtnIcon);
                            mediaDiv.appendChild(clearBtn);
                            mediaContainer.appendChild(mediaDiv);
                        });
                    }
                } catch (error) {
                    console.error("Error fetching listing data:", error);
                    alert("Error loading listing data.");
                } finally {
                    button.disabled = false;
                }
            }

            form.addEventListener("submit", async (event) => {
                event.preventDefault();

                const title = form.querySelector("#title").value.trim();
                const description = form.querySelector("#description").value.trim();
                const tags = (form.querySelector("#tags").value || "").split(",").map(tag => tag.trim());

                const mediaInputs = Array.from(form.querySelectorAll("input[name='media[]']"));
                const media = mediaInputs.map(input => ({
                    url: input.value.trim(),
                    type: 'image' 
                })).filter(mediaItem => mediaItem.url); 

                const listingData = {
                    title,
                    description,
                    tags,
                    media,
                };

                if (!listingData.title || listingData.title.length < 3) {
                    alert("Title is required and must be at least 3 characters long.");
                    return;
                }
                if (!listingData.description || listingData.description.length < 8) {
                    alert("Description is required and must be at least 8 characters long.");
                    return;
                }

                try {
                    await updateListing(id, listingData);
                    alert("Listing updated successfully.");
                    window.location.href = "/feed/profile/";
                } catch (error) {
                    console.error("Error updating listing:", error);
                    alert("Failed to update the listing.");
                }
            });
        }
    });
}
