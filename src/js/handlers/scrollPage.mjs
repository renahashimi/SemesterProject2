import { load, remove, save } from "../storage/index.mjs";

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