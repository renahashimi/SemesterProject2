import { authFetch } from "../api/authFetch.mjs";
import { API_AUCTION_URL } from "../api/constants.mjs";
import { load } from "../storage/index.mjs";
import { createListingCard } from "../templates/listingCardTemplate.mjs";
import { simpleListingCard } from "../templates/simpleCardTemplate.mjs";
import { formatDate } from "./date.mjs";
import { openLoginOverlay } from "./overlayUtils.mjs";

export async function renderSingleItem() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('listing');
  const singleListingContainer = document.getElementById('singleListings');
  singleListingContainer.classList.add("border", "border-4", "border-primary", "pb-4")
  const userSingleListingContainer = document.getElementById('userSingleListings');
  userSingleListingContainer.classList.add("d-block")
  const token = load("token");
  
  if (!token) {
    if (userSingleListingContainer) {
      userSingleListingContainer.classList.add("d-none")
    }
  
    if (singleListingContainer) {
      singleListingContainer.innerHTML = `
        <div class="profile-alert font-raleway bg-white align-items-center border-tealgreen text-center" style="max-width: 600px;" role="alert">
          <h1 class="alert-heading font-raleway-900 fs-6 text-tealgreen text-uppercase">Whoa there, adventurer!</h1>
          <p class="text-secondary">It seems you're not logged in. To see this listing and the magical wonders within, please log in using the overlay.</p>
          <p class="text-secondary">Don't worry, logging in is easier than finding a needle in a haystack!</p>
          <button id="profile-open-overlay-btn" class="m-auto text-center pt-3 border-0 font-tenor fs-4 text-uppercase bg-white">LOGIN</button>  
        </div>
      `;
      document.getElementById('profile-open-overlay-btn').addEventListener('click', openLoginOverlay);
    }
    return; 
  }
  
  try {
    const response = await fetch(`${API_AUCTION_URL}/listings/${listingId}?_seller=true&_bids=true&_listing=true`);
    if (!response.ok) {
      throw new Error(`Error fetching listing: ${response.statusText}`);
    }
    const { data: listing } = await response.json();

    const userContainer = document.createElement("div");
    userContainer.classList.add(
      "font-tenor", "m-auto", "my-3", "p-0", "pb-3", "w-75", "border-bottom", "border-4", "border-primary"
    );

    const userName = document.createElement("h1");
    userName.textContent = `${listing.seller.name || 'Unknown'}'s listing`;
    userName.classList.add("font-tenor", "text-uppercase", "text-primary", "fs-4");

    const userCreated = document.createElement("p");
    const formattedDate = listing.created ? formatDate(listing.created) : '';
    userCreated.textContent = `Created: ${formattedDate}`;
    userCreated.classList.add("text-secondary");

    const userUpdated = document.createElement("p");
    const formattedDateUp = listing.updated ? formatDate(listing.updated) : '';
    userUpdated.textContent = `Updated: ${formattedDateUp}`;
    userUpdated.classList.add("mt-n3", "text-secondary");

    const goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go back";
    goBackBtn.classList.add("btn", "btn-white", "d-flex", "fs-7", "border", "border-2", "border-secondary", "text-uppercase", "my-2", "px-3", "py-0", "text-center");
    goBackBtn.addEventListener("click", () => history.back());
   
    userContainer.appendChild(userName);
    userContainer.appendChild(userCreated);
    userContainer.appendChild(userUpdated);
    userContainer.appendChild(goBackBtn);

    singleListingContainer.innerHTML = '';
    const listingCard = createListingCard(listing);
    singleListingContainer.appendChild(userContainer);
    singleListingContainer.appendChild(listingCard);

    userSingleListingContainer.innerHTML = '';
    const singleHeader = document.createElement("h2");
    singleHeader.textContent = `Other listings from ${listing.seller.name}`;
    singleHeader.classList.add("font-raleway", "fs-5", "ps-2", "text-white");

    singleListingContainer.scrollIntoView({ behavior: 'smooth' });

    if (userSingleListingContainer) {
      const sellerName = listing.seller.name;
      const action = "?_listings=true&_wins=true";

      const userListingsResponse = await authFetch(`${API_AUCTION_URL}/profiles/${sellerName}${action}`);
      if (!userListingsResponse.ok) {
        throw new Error(`Error fetching user listings: ${userListingsResponse.statusText}`);
      }
      
      const userListingsData = await userListingsResponse.json();
      const userListings = userListingsData.data.listings || [];
      
      console.log('User Listings:', userListings);
      
      const listingContainer = document.createElement("div");
      listingContainer.classList.add("listing-scroll-container", "justify-content-start");
      
      if (Array.isArray(userListings) && userListings.length > 0) {
        console.log('User has listings:', userListings);
        userListings.forEach(listing => {
          if (listing.id !== listingId) {
            const singleListingCard = simpleListingCard(listing);
            listingContainer.appendChild(singleListingCard);
          }
        });
      } 
      if (userListings.length <= 1)  {
        console.log('No other listings from this user.'); 
        listingContainer.innerHTML = `
          <div class="noListingTxt d-block text-center text-white font-raleway-900 text-uppercase mt-5" style="height: 300px">
            <h2 class="fs-4">"No other listings from ${listing.seller.name}!"</h2>
          </div>`;
        singleHeader.style.display = "none";
        userSingleListingContainer.style.height = "200px";
        listingContainer.classList.add('no-scroll');
      }
      
      console.log('userSingleListingContainer content:', userSingleListingContainer.innerHTML);

      userSingleListingContainer.appendChild(singleHeader);
      userSingleListingContainer.appendChild(listingContainer);
      
    }
  } catch (error) {
    console.error('Error fetching and displaying listing:', error);
    singleListingContainer.innerHTML = '<p>Unable to load listing details. Please try again later.</p>';
  }
}