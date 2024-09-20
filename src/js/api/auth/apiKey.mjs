import { authFetch } from "../authFetch.mjs";
import { API_KEY_URL, API_URL_BASE } from "../constants.mjs";

export async function getApiKey() {
    try {
        const response = await authFetch(API_URL_BASE + API_KEY_URL, {
            method: "POST",
            body: JSON.stringify({ name: "apiKey" }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            // Log the error message if the response is not ok
            const errorData = await response.json();
            console.error("Error:", errorData);
            throw new Error("Something went wrong");
        }
    } catch (error) {
        console.error("Exception:", error);
        throw error; // Re-throw the error for further handling
    }
}