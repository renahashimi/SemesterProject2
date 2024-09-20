import * as storage from "../../storage/index.mjs";
import { API_URL_BASE, API_LOGIN } from "../constants.mjs";

/**
 * Logs in a user by sending their profile credentials to the authentication API.
 * 
 * This function sends a POST request to the API with the user"s credentials. 
 * If the login is successful, it saves the received token and user profile 
 * in local storage and redirects the user to their profile page. 
 * If the login fails, it displays an error message.
 *
 * @async
 * @function loginUser
 * @param {Object} profile - The user profile containing login credentials.
 * @param {string} profile.username - The username of the user.
 * @param {string} profile.password - The password of the user.
 * 
 * @throws {Error} Throws an error if the login request fails or if the response is not okay.
 * 
 */

export async function loginUser(profile) {
    try {
        const response = await fetch(`${API_URL_BASE}${API_LOGIN}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(profile)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            throw new Error("Login failed. Please check your credentials.");
        }

        const { accessToken, ...user } = (await response.json()).data;
        storage.save("token", accessToken); 
        storage.save("profile", user);     

        // Save current path before redirecting
        const currentPath = window.location.pathname;
        storage.save("redirectAfterLogin", currentPath);

        // Reload the page
        window.location.reload();

    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
}