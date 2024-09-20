import { fetchListings } from "./renderListings.mjs";
import { renderAllListings } from "./renderListings.mjs";

let currentPage = 1; 
const limit = 9; 

export function createLoadMoreButton() {
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.classList.add(
        "loadMoreBtn",
        "btn", 
        "btn-secondary", 
        "font-tenor",
        "d-flex",
        "text-white",
        "m-auto",
        "text-uppercase",
        "fs-5", 
        "mt-5",
        "px-5",
        "rounded-pill"
    );

    const loadMoreBtnTxt = document.createElement("p");
    loadMoreBtnTxt.textContent = "Load More";
    loadMoreBtnTxt.classList.add(
        "p-0",
        "px-2",
        "m-auto",
        "text-center",
        "justify-content-center",
        "align-items-center",         
    )
    loadMoreBtn.appendChild(loadMoreBtnTxt)

    loadMoreBtn.addEventListener("click", async () => {
        loadMoreBtn.disabled = true; 
        loadMoreBtn.textContent = "Loading..."; 
        
        try {
            currentPage++;
            const listings = await fetchListings(currentPage, limit);
            
            console.log("Loading more listings:", listings);
            
            if (Array.isArray(listings) && listings.length > 0) {
                renderAllListings(listings, true); 
                loadMoreBtn.disabled = false; 
                loadMoreBtn.textContent = "Load More";
            } else {
                loadMoreBtn.textContent = "No More Listings";
                loadMoreBtn.disabled = true;
            }
        } catch (error) {
            console.error("Error loading more listings:", error);
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = "Load More"; 
        }
    });
    
    return loadMoreBtn;
}