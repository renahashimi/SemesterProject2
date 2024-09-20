import { getProfile } from '../api/profile/get.mjs';
import getWins from '../api/profile/wins.mjs';
import { load, save } from '../storage/index.mjs';
import { profileTemplate } from '../templates/profileTemplate.mjs';
import { simpleListingCard } from '../templates/simpleCardTemplate.mjs';

export async function renderProfiles() {
    const token = load('token');

    const winsContainer = document.getElementById('userWins');
    const userContainer = document.getElementById("userProfileContainer");
    const userTitleElement = document.getElementById('userTitle'); 
   
    if (window.location.pathname === '/feed/profile/profiles/' && !token) {
        const userProfile = document.getElementById("userProfile");
        if (userProfile) userProfile.style.display = "none";
        if (userContainer) {
            userContainer.innerHTML = `
                <div class="profile-alert fonyt-raleway align-items-center border-tealgreen text-center" style="max-width: 600px;" role="alert">
                    <h1 class="alert-heading font-raleway-900 fs-6 text-tealgreen text-uppercase">Whoa there, adventurer!</h1>
                    <p class="text-secondary">It seems you're not logged in. To see your profile and the magical wonders within, please log in using the overlay.</p>
                    <p class="text-secondary">Don't worry, logging in is easier than finding a needle in a haystack!</p>
                    <button id="profile-open-overlay-btn" class="m-auto text-center pt-3 border-0 font-tenor fs-4 text-uppercase bg-white">LOGIN</button>  
                </div>
            `;
            document.getElementById('profile-open-overlay-btn').addEventListener('click', () => {
                openLoginOverlay();
            });
        }
        return; 
    }
    try {
        const url = new URL(location.href);
        const name = url.searchParams.get("name");

        console.log()
        if (!name) {
            console.error('No user name provided in the URL.');
            return; 
        }

        if (userTitleElement) {
            userTitleElement.textContent = `${name.toUpperCase()}'S PROFILE - MIDAS TOUCH`;
        }

        const userProfileData = await getProfile(name);
        console.log("User Profile Data:", userProfileData);

        if (userContainer) {
            const profileContainer = await profileTemplate(userProfileData);
            userContainer.innerHTML = "";
            userContainer.append(profileContainer);
        } else {
            console.error('Profile container not found.');
            return;
        }
        
        const listings = userProfileData.data.listings || [];
        console.log("Listings:", listings);
        
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
                <div class="noListingTxt d-block text-center font-raleway-900 text-uppercase mt-5">
                    <h2 class="text-tenor fs-4">No listings yet!</h2>
                </div>`;
            }
        } else {
            console.error('Listings container not found.');
        }

        // Fetch and render won listings
        if (winsContainer) {
            try {
                const wonListingsData = await getWins(name);
                console.log('Fetched Won Listings Data:', wonListingsData);

                const wonListings = wonListingsData.data || [];
                winsContainer.innerHTML = ''; 
                
                if (Array.isArray(wonListings) && wonListings.length > 0) {
                    wonListings.forEach((listing) => {
                        console.log('Won Listing object:', listing); 
                        const listingCard = simpleListingCard(listing);
                        winsContainer.appendChild(listingCard);
                    });
                } else {
                    winsContainer.innerHTML = `
                    <div class="noListingTxt d-block text-center font-raleway-900 text-uppercase mt-5">
                        <h2 class="text-tenor fs-4">No wins yet?</h2>
                    </div>`;
                }
            } catch (error) {
                console.error('Failed to load won listings:', error);
                winsContainer.innerHTML = `
                <div class="noListingTxt d-block text-center font-raleway-900 text-uppercase mt-5">
                    <h3 class="text-tenor fs-4">Error loading wins!</h3>
                </div>`;
            }
        }
    } catch (error) {
        console.error('Failed to load profile or listings:', error);
        if (userContainer) {
            userContainer.innerHTML = '<p>Failed to load profile. Please try again later.</p>';
        }
    }
}