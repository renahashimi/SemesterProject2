import * as handlers from "./handlers/index.mjs";
import * as listener from "./listeners/index.mjs";

export default function router() {
  const path = window.location.pathname;

  handlers.setupScrollPosition();
  listener.allPageListener();

  switch (path) {
    case "/":
    case "/index.html":
      handlers.renderHomeListings();
      break;
    case "/feed/profile/":
      handlers.renderMyProfile();
      break;
    case "/feed/profile/profiles/":
      handlers.renderProfiles();
      break;
    case "/feed/profile/register/":
    case "/feed/profile/register/index.html":
      handlers.registerFormListener();
      break;
    case "/feed/profile/edit/":
      handlers.setUpdateProfileListener();
      break;
    case "/feed/listings/":
      handlers.renderAllListings();
      handlers.searchListings();
      handlers.placeBidListener();
      break;
    case "/feed/listings/create/":
      handlers.setupCreateListingForm();
      break;
    case "/feed/listings/edit/":
      handlers.setUpdateListingListener();
      break;
    case "/feed/listings/singleitem/":
      handlers.renderSingleItem();
      break;
    default:
      break;
  }
}