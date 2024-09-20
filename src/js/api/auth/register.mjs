import { API_REGISTER, API_URL_BASE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { openLoginOverlay } from "../../handlers/overlayUtils.mjs";

/**
 * Registers a new user by sending their details to the registration API.
 * 
 * @async
 * @function registerUser
 * @param {Object} user - The user details to register.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.password - The password for the user"s account.
 * @param {string} [user.avatar] - (Optional) The URL of the user"s avatar.
 * @returns {Promise<Object>} The registered user data.
 * @throws {Error} Throws an error if registration fails or if the user already exists.
 */
export async function registerUser({ name, email, password }) {
  const userInfo = {
    name,
    email,
    password
  };

  const registerUrl = `${API_URL_BASE}${API_REGISTER}`;

  try {
    const response = await fetch(registerUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessages = errorData.errors.map(error => error.message).join(", ");

      if (errorMessages.includes("Profile already exists")) {
        alert("This email is already in use. Please choose a different one.");
      } else if (errorMessages.includes("Name is required")) {
        alert("Name is required.");
      } else if (errorMessages.includes("Password is required")) {
        alert("Password is required.");
      } else {
        alert("Registration failed. Please check your details and try again.");
      }
      
      throw new Error(errorMessages || "Failed to register your account");
    }

    const userData = await response.json();
    const user = userData.data;

    storage.save("profile", user);
    storage.save("userEmail", user.email);
   
    alert("Registration successful! Welcome, " + user.name);
    openLoginOverlay();

    return userData;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
}