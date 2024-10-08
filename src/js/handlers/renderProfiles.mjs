import { getProfile } from '../api/profile/get.mjs';
import getWins from '../api/profile/wins.mjs';
import { load, save } from '../storage/index.mjs';
import { profileTemplate } from '../templates/profileTemplate.mjs';
import { simpleListingCard } from '../templates/simpleCardTemplate.mjs';
/**
 * Renders the user's profile, including their listings and wins.
 * 
 * This function first checks if the user is logged in by verifying the presence
 * of a token. If the user is not logged in, an alert is displayed prompting
 * them to log in. If the user is logged in, the function fetches the user's
 * profile data, updates the profile container with the user's information,
 * and displays their listings and wins.
 * 
 * @async
 * @function renderProfiles
 * @throws {Error} Will throw an error if the profile or listings fail to load.
 * 
 * @example
 * // Call the function to render the user's profile
 * renderProfiles();
 */
export async function renderProfiles() {
    const token = load("token");

    const winsContainer = document.getElementById("userWins");
    const userContainer = document.getElementById("userProfileContainer");
    const userTitleElement = document.getElementById("userTitle"); 
   
    if (window.location.pathname === "/feed/profile/profiles/" && !token) {
        const userProfile = document.getElementById("userProfile");
        if (userProfile) userProfile.style.display = "none";
        if (userContainer) {
            userContainer.innerHTML = `
                            <div class="profile-alert font-prata bg-white align-items-center border-tealgreen text-center" style="max-width: 600px;" role="alert">
                                <h1 class="alert-heading font-raleway-900 fs-6 mb-3 text-tealgreen text-uppercase">Whoa there, adventurer!</h1>
                                <p class="text-secondary">It seems you're not logged in. To see this listing and the magical wonders within, please log in to your account.</p>
                                <p class="text-secondary">Don't worry, logging in is easier than finding a needle in a haystack!</p>
                                <button id="profile-open-overlay-btn" class="m-auto bg-secondary text-center border-0 font-tenor fs-4 text-uppercase text-white my-4 px-3">LOGIN</button>  
                            
                                <div class="profile-register-alert font-prata bg-secondary align-items-center border-tealgreen text-center w-100 p-3 mt-5" style="max-width: 600px;" role="alert">
                                    <p class="text-white">If you don't have an account, you can create one by clicking the link below:</p>
                                    <a href="/feed/profile/register/" class="m-auto text-center border-0 bg-white font-tenor fs-4 text-uppercase text-secondary my-3 px-3">REGISTER NOW</a>
                                </div>
                            </div>
                        `;
            document.getElementById("profile-open-overlay-btn").addEventListener("click", () => {
                openLoginOverlay();
            });
        }
        return; 
    }
    try {
        const url = new URL(location.href);
        const name = url.searchParams.get("name");

        if (!name) {
            console.error("No user name provided in the URL.");
            return; 
        }

        if (userTitleElement) {
            userTitleElement.textContent = `${name.toUpperCase()}"S PROFILE - MIDAS TOUCH`;
        }

        const userProfileData = await getProfile(name);

        if (userContainer) {
            const profileContainer = await profileTemplate(userProfileData);
            userContainer.innerHTML = "";
            userContainer.append(profileContainer);
        } else {
            console.error("Profile container not found.");
            return;
        }
        
        const listings = userProfileData.data.listings || [];
        
        const listContainer = document.getElementById("userListings");
        if (listContainer) {
            listContainer.innerHTML = "";
            if (Array.isArray(listings) && listings.length > 0) {
                listings.forEach(listing => {
                    const listingCard = simpleListingCard(listing);   
                    listContainer.append(listingCard);
                });
            } else {
                listContainer.innerHTML = `
                <div class="noListingTxt d-block m-auto justify-content-center text-center font-raleway-900 text-uppercase mt-5">
                    <h2 class="text-tenor fs-4">No listings yet!</h2>
                </div>`;
            }
        } else {
            console.error("Listings container not found.");
        }

        if (winsContainer) {
            try {
                const wonListingsData = await getWins(name);

                const wonListings = wonListingsData.data || [];
                winsContainer.innerHTML = ""; 
                
                if (Array.isArray(wonListings) && wonListings.length > 0) {
                    wonListings.forEach((listing) => {
                        const listingCard = simpleListingCard(listing);
                        winsContainer.appendChild(listingCard);
                    });
                } else {
                    winsContainer.innerHTML = `
                    <div class="noListingTxt d-block m-auto justify-content-center text-center font-raleway-900 text-uppercase mt-5">
                        <h2 class="text-tenor fs-4">No wins yet?</h2>
                    </div>`;
                }
            } catch (error) {
                console.error("Failed to load won listings:", error);
                winsContainer.innerHTML = `
                <div class="noListingTxt d-block m-auto justify-content-center text-center font-raleway-900 text-uppercase mt-5">
                    <h3 class="text-tenor fs-4">Error loading wins!</h3>
                </div>`;
            }
        }
    } catch (error) {
        console.error("Failed to load profile or listings:", error);
        if (userContainer) {
            userContainer.innerHTML = "<p>Failed to load profile. Please try again later.</p>";
        }
    }
}
