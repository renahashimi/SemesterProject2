import { load, remove, save } from "../storage/index.mjs";

export function setupScrollPosition() {
  window.addEventListener("beforeunload", () => {
    const scrollPosition = window.scrollY;
    console.log("Saving scroll position:", scrollPosition);
    save('scrollPosition', scrollPosition);
  });

  window.addEventListener("load", () => {
    const savedScrollPosition = load('scrollPosition');
    console.log("Loaded scroll position:", savedScrollPosition);
    
    if (savedScrollPosition !== null) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, savedScrollPosition); 
          remove('scrollPosition');
        }, 500); 
      });
    }
  });
}