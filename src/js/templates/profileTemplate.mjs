export async function profileTemplate(profileData) {
    if (!profileData || !profileData.data) {
        console.error("Invalid profile data");
        return document.createTextNode("Profile data is unavailable.");
    }
  
    const profileContent = document.createElement("div");
    profileContent.classList.add(
      "profileContent", 
      "container-fluid", 
      "m-auto", 
      "p-0", 
      "m-0"
    );
  
    // BANNER, AVATAR
    const imgContainer = document.createElement("div");
    imgContainer.classList.add(
      "imgContainer", 
      "container-fluid", 
      "m-auto",
      "p-0", 
      "mb-5"
    );
    imgContainer.style.position = "relative";
  
    const profileBanner = document.createElement("img");
    profileBanner.src = profileData.data.banner?.url || "/src/images/blackgavel.jpg";
    profileBanner.alt = profileData.data.banner?.alt || `${profileData.data.name} Banner Image`;
    profileBanner.style.height = "220px";
    profileBanner.style.width = "100%";
    profileBanner.style.objectFit = "cover";
    profileBanner.classList.add(
      "profileBanner",
      "border", 
      "border-3", 
      "border-primary",
      "m-auto",
      "shadowBorder10"
    );
    //profileBanner.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 70%, 0% 100%)";
    imgContainer.appendChild(profileBanner);
  
    const profileAvatar = document.createElement("img");
    profileAvatar.src = profileData.data.avatar?.url || "../../images/blackgavel.jpg";
    profileAvatar.alt = profileData.data.avatar?.alt || `${profileData.data.name} Avatar Image`;
    profileAvatar.style.height = "140px";
    profileAvatar.style.width = "140px";
    profileAvatar.classList.add(
      "profileAvatar", 
      "rounded-circle", 
      "border", 
      "border-3", 
      "border-primary",
      "shadowBorder20"
    );
    profileAvatar.style.zIndex = "10";
    profileAvatar.style.position = "absolute";
    profileAvatar.style.top = "40%";
    profileAvatar.style.left = "25%";
    profileAvatar.style.transform = "translate(-50%, 12%)";
    imgContainer.appendChild(profileAvatar);
  
    // NAME, EMAIL
    const profileInfo = document.createElement("div");
    profileInfo.style.maxWidth = "700px";
    profileInfo.style.position = "relative";
    profileInfo.style.zIndex = "10";
    profileInfo.style.marginTop = "80px";
    profileInfo.classList.add(
      "profileInfo", 
      "container-sm", 
      "border-bottom", 
      "border-3", 
      "border-tealgreen", 
      "mb-4", 
      "py-3", 
      "bg-white", 
    );
   
    const profileName = document.createElement("h1");
    profileName.classList.add(
      "m-auto", 
      "fs-4", 
      "font-tenor", 
      "text-center", 
      "text-uppercase"
    );
    profileName.textContent = profileData.data.name || "Name not available";
  
    const profileEmail = document.createElement("p");
    profileEmail.classList.add(
      "m-auto", 
      "text-teallight",
      "fs-6",
      "font-righteous", 
      "text-center"
    );
    profileEmail.textContent = profileData.data.email || "Email not available";
  
    // CREDITS, LISTING & WINS COUNT
    const profileUnitContainer = document.createElement("div");
    profileUnitContainer.style.maxWidth = "500px";
    profileUnitContainer.classList.add(
      "profile-unit-container", 
      "d-flex", 
      "justify-content-between", 
      "m-auto",
      "p-2",
    );
  
    const profileCreditContainer = document.createElement("div");
    profileCreditContainer.classList.add("profile-credit-container", "d-block", "border-start", "border-end", "border-2", "border-primary", "px-1", "my-2");
    const profileCreditsText = document.createElement("p");
    profileCreditsText.textContent = `Credits`;
    profileCreditsText.classList.add(
      "m-auto", 
      "fs-6", 
      "font-raleway-900", 
      "text-center", "p-0", 
      "text-uppercase"
    );
    const profileCredits = document.createElement("p");
    profileCredits.textContent = `$${profileData.data.credits || 0}`;
    profileCredits.classList.add(
      "m-auto", 
      "fs-4", 
      "font-raleway", 
      "text-center", 
      "p-0", 
      "mt-n2"
    );
    profileCreditContainer.appendChild(profileCreditsText);
    profileCreditContainer.appendChild(profileCredits);
    
    // Create the profile wins container
    const profileWinsContainer = document.createElement("div");
    profileWinsContainer.classList.add("profile-wins-container", "d-block", "border-start", "border-end", "border-2", "border-tealgreen", "px-1", "my-2");
  
    // Create the link element for Wins
    const profileWinsText = document.createElement("a");
    profileWinsText.textContent = `Wins`;
    profileWinsText.href = "#myWins"; 
    profileWinsText.classList.add(
      "m-auto", 
      "fs-6", 
      "font-raleway-900", 
      "text-center", 
      "p-0", 
      "text-uppercase",
    );
  
    // Create the profile wins count
    const profileWins = document.createElement("p");
    profileWins.textContent = `${profileData.data._count?.wins || 0}`;
    profileWins.classList.add(
      "m-auto", 
      "fs-4", 
      "font-raleway", 
      "text-center", 
      "p-0", 
      "mt-n2"
    );
  
    // Append elements to the container
    profileWinsContainer.appendChild(profileWinsText);
    profileWinsContainer.appendChild(profileWins);
  
    // Append the container to the desired section
    const winsSection = document.getElementById('myWins');
    if (winsSection) {
      winsSection.appendChild(profileWinsContainer);
    }
  
    const profileListingContainer = document.createElement("div");
    profileListingContainer.classList.add("profile-listing-container", "d-block", "border-start", "border-end", "border-2", "border-secondary", "px-1", "my-2");
    
    // Create the link element for Listings
    const profileListingText = document.createElement("a");
    profileListingText.textContent = `Listings`;
    profileListingText.href = "#myListings";
    profileListingText.classList.add(
      "m-auto", 
      "fs-6", 
      "font-raleway-900", 
      "text-center", 
      "p-0", 
      "text-uppercase",
    );
    
    // Create the profile listings count
    const profileListing = document.createElement("p");
    profileListing.textContent = `${profileData.data._count?.listings || 0}`;
    profileListing.classList.add(
      "m-auto", 
      "fs-4", 
      "font-raleway", 
      "text-center", 
      "p-0", 
      "mt-n2"
    );
    
    // Append elements to the container
    profileListingContainer.appendChild(profileListingText);
    profileListingContainer.appendChild(profileListing);
    
    // Append the container to the desired section
    const profileSection = document.getElementById('myListings');
    if (profileSection) {
      profileSection.appendChild(profileListingContainer);
    }
    
    profileUnitContainer.appendChild(profileCreditContainer);
    profileUnitContainer.appendChild(profileWinsContainer);
    profileUnitContainer.appendChild(profileListingContainer);
  
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.maxWidth = "300px";
    buttonsContainer.classList.add(
      "buttonContainer",
      "m-auto",
      "d-flex",
      "mt-4",
      "m-0",
      "p-0"
    )
  
    const createBtn = document.createElement("a");
    createBtn.href = "/feed/listings/create/"
    createBtn.innerHTML = `<i class="bi bi-plus-circle"></i>`;
    createBtn.classList.add(
      "editBtn",
      "bg-white",
      "text-primary",
      "font-raleway-900",
      "text-primary",
      "text-center",
      "m-auto",
      "p-0"
    );
  
    const createBtnTxt = document.createElement("p");
    createBtnTxt.textContent = "New listing";
    createBtnTxt.classList.add(
      "createBtnTxt",
      "font-raleway",
      "text-teallight",
      "m-0",
    );
    createBtn.appendChild(createBtnTxt)
    buttonsContainer.appendChild(createBtn);
  
    const editBtn = document.createElement("a");
    editBtn.href = "/feed/profile/edit/"
    editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    editBtn.classList.add(
      "editBtn",
      "d-block",
      "bg-white",
      "font-raleway-900",
      "text-primary",
      "text-center",
      "m-auto",    
    );
    const editBtnTxt = document.createElement("p");
    editBtnTxt.textContent = "Edit profile";
    editBtnTxt.classList.add(
      "editBtnText",
      "font-raleway",
      "text-teallight",
      "m-0",
    );
    editBtn.appendChild(editBtnTxt)
    buttonsContainer.appendChild(editBtn);
  
  
  
    // BIO
    const profileBioContainer = document.createElement("p");
    profileBioContainer.style.maxWidth = "700px";
    profileBioContainer.classList.add(
      "fs-6", 
      "font-raleway", 
      "justify-content-center", 
      "d-block", 
      "bg-tealgreen",
      "text-white",
      "m-auto", 
      "pb-4",
      "border-bottom", 
      "border-2", 
      "border-secondary",
    );
  
    const profileBioText = document.createElement("p");
    profileBioText.classList.add(
      "m-auto", 
      "fs-5", 
      "font-raleway-900", 
      "text-uppercase", 
      "text-white", 
      "text-start", 
      "p-3",
    );
    profileBioText.textContent = `Biography of ${profileData.data.name || "this user"}`;
  
    const profileBio = document.createElement("p");
    profileBio.classList.add("m-auto", "fs-", "font-raleway", "text-start", "font-italic", "ps-3");
    const bioText = profileData.data.bio ? profileData.data.bio : "-No biography provided";
    profileBio.textContent = bioText;
    profileBioContainer.appendChild(profileBioText);
    profileBioContainer.appendChild(profileBio);
  
    // APPENDINGS
    profileInfo.appendChild(profileName);
    profileInfo.appendChild(profileEmail);
    profileInfo.appendChild(profileUnitContainer);
    profileInfo.appendChild(buttonsContainer);
  
    profileContent.appendChild(imgContainer);
    profileContent.appendChild(profileInfo);
    profileContent.appendChild(profileBioContainer);
  
    return profileContent;
  }