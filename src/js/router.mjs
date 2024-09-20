import * as handlers from "./handlers/index.mjs";
import * as listener from "./listeners/index.mjs";

export default function router() {
  const path = window.location.pathname;
  console.log(`Current path: ${path}`);

  handlers.setupScrollPosition();
  listener.allPageListener();

  switch (path) {
    case "/":
    case "/index.html":
      console.log("Rendering homepage...");
      handlers.renderHomeListings();
      console.log("Homepage setup complete.");
      break;

    case "/feed/profile/":
      console.log("Rendering profile page...");
      handlers.renderMyProfile();
      console.log("Profile page setup complete.");
      break;

    case "/feed/profile/profiles/":
      console.log("Rendering profile page...");
      handlers.renderProfiles();
      console.log("Profile page setup complete.");
      break;

    case "/feed/profile/register/":
    case "/feed/profile/register/index.html":
      console.log("Rendering registration page...");
      handlers.registerFormListener();
      console.log("Registration page setup complete.");
      break;

    case "/feed/profile/edit/":
      console.log("Rendering edit page...");
      handlers.setUpdateProfileListener();
      console.log("Editing page setup complete.");
      break;

    case "/feed/listings/":
      console.log("Rendering listing page...");
      handlers.renderAllListings();
      handlers.searchListings();
      handlers.placeBidListener();
      console.log("Listing page setup complete.");
      break;

    case "/feed/listings/create/":
      console.log("Rendering create listing page...");
      handlers.setupCreateListingForm();
      console.log("Create listing page setup complete.");
      break;

    case "/feed/listings/edit/":
      console.log("Rendering create listing page...");
      handlers.setUpdateListingListener();
      console.log("Create listing page setup complete.");
      break;

    case "/feed/listings/singleitem/":
      console.log("Rendering single item page...");
      handlers.renderSingleItem();
      console.log("Single item page setup complete.");
      break;

    default:
      console.log("No matching path found.");
      break;
  }
}