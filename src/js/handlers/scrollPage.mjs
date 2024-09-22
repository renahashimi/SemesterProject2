import { load, remove, save } from "../storage/index.mjs";

/**
 * Sets up event listeners to save and restore the scroll position of the window.
 * 
 * Saves the current scroll position to local storage before the window is unloaded.
 * Restores the scroll position from local storage when the window is loaded,
 * scrolling to the saved position after a brief delay.
 * 
 * @returns {void}
 * 
 * @example
 * // Call this function to enable scroll position saving and restoring
 * setupScrollPosition();
 */
export function setupScrollPosition() {
  window.addEventListener("beforeunload", () => {
    const scrollPosition = window.scrollY;
    save("scrollPosition", scrollPosition);
  });

  window.addEventListener("load", () => {
    const savedScrollPosition = load("scrollPosition");
    
    if (savedScrollPosition !== null) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, savedScrollPosition); 
          remove("scrollPosition");
        }, 500); 
      });
    }
  });
}
