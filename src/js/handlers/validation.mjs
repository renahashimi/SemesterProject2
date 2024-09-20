/**
 * Validates the form inputs.
 * 
 * @returns {Object} Validation result.
 */
export function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const banner = document.getElementById("banner").value;
    const avatar = document.getElementById("avatar").value;
  
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const bannerError = document.getElementById("bannerError");
    const avatarError = document.getElementById("avatarError");
  
    let formIsValid = true;
  
    const namePattern = /^[\w]+$/;
    if (!namePattern.test(name)) {
      nameError.textContent = "Name can only contain letters, numbers, and underscores.";
      nameError.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
      formIsValid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    }
  
    const emailPattern = /^[\w\-.]+@stud\.noroff\.no$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Please use a valid @stud.noroff.no email address.";
      emailError.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
      formIsValid = false;
    } else {
      emailError.textContent = "";
      emailError.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    }
  
    if (password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters long.";
      passwordError.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
      formIsValid = false;
    } else {
      passwordError.textContent = "";
      passwordError.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    }
  
    if (banner && !/^https?:\/\/.+/.test(banner)) {
      bannerError.textContent = "Banner URL must be a valid URL.";
      bannerError.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
      formIsValid = false;
    } else {
      bannerError.textContent = "";
      bannerError.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    }
  
    if (avatar && !/^https?:\/\/.+/.test(avatar)) {
      avatarError.textContent = "Avatar URL must be a valid URL.";
      avatarError.classList.add("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
      formIsValid = false;
    } else {
      avatarError.textContent = "";
      avatarError.classList.remove("d-block", "text-center", "text-danger", "border", "border-danger", "border-2", "font-raleway", "fs-7", "px-2");
    }
  
    return { isValid: formIsValid };
  
  }