import { openImageModal } from "../handlers/modal.mjs";

export function simpleListingCard(listing) {
  const simpleListContainer = document.createElement("div");
  simpleListContainer.classList.add(
      "simpleListContainer", 
      "row",
      "m-auto", 
      "justify-content-center",
      "bg-white",
      "px-2",
      "border",
      "border-5",
      "border-tealgreen",
      "rounded-4"
  );
  simpleListContainer.style.maxWidth = "320px"; 
  
  //Postcard
  const postCard = document.createElement("div");
  postCard.classList.add(
      "postCard-simple", 
      "d-flex", 
      "rounded", 
      "bg-secondary",
      "my-2", 
      "m-auto"
  );
  postCard.style.flex = "1 1 250px";
  postCard.style.width = "100%";
  postCard.style.maxHeight = "100%";
  postCard.style.overflow = "hidden";
  postCard.style.flexShrink = "0";
  postCard.style.flexDirection = "column"; 
  postCard.style.alignItems = "center"; 
  postCard.style.justifyContent = "center"; 

  // Create a container for the image
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  imgContainer.style.width = "300px"; 
  imgContainer.style.height = "300px"; 
  imgContainer.style.overflow = "hidden"; 
  imgContainer.style.position = "relative";

  // Image
  const img = document.createElement("img");
  img.classList.add("postcard-simple-image", "py-1", "px-2", "border", "border-4", "border-secondary");
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.addEventListener("click", () => openImageModal(img.src, listing.media?.[0]?.alt || "Listing image"));

  if (listing.media && listing.media.length > 0) {
      img.src = listing.media[0].url;
      img.alt = listing.media[0].alt || "Listing image";
  } else {
      img.src = "/src/images/noimage.jpg";
      img.alt = "No image available";
  }
  
  imgContainer.appendChild(img);
  postCard.appendChild(imgContainer);
  
  //Title
  const title = document.createElement("h2");
  title.textContent = listing.title || "No title available";
  title.classList.add(
      "listingTitle", 
      "font-tenor", 
      "postcard-title",
      "fs-6",
      "w-100",
      "p-2",
      "text-center",
      "text-uppercase", 
      "text-white",
      "border",
      "border-2",
      "border-tealgreen",
      "rounded-pill"
  );
  title.style.marginTop = "5px";
  
  // Link Btn
  const goBtn = document.createElement("button");
  goBtn.classList.add(
      "btn",
      "btn-primary",
      "font-raleway-900",
      "fs-6", 
      "py-0",
      "px-2",
      "bg-white",
      "text-primary",
      "text-center",
      "border-0",
      "w-75",
      "rounded-pill"
  );
  goBtn.textContent = "GO TO LISTING";
  goBtn.style.width = "auto"; 
  goBtn.style.height = "50px"; 
  goBtn.style.margin = "10px auto"; 
  goBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `/feed/listings/singleitem/?listing=${listing.id}`;
  });

  postCard.appendChild(title);
  postCard.appendChild(goBtn); 
  simpleListContainer.appendChild(postCard);

  return simpleListContainer;
}

