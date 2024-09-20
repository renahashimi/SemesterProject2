import * as handlers from "../handlers/index.mjs";

export function allPageListener() {
  handlers.checkAuthStatus();
  handlers.setupOverlayListeners();
  handlers.updateUIBasedOnAuth();
  handlers.highlightActiveLink()
  handlers.loadFooter();
  handlers.handlePageLoad();
  handlers.setupMobileMenu();
}