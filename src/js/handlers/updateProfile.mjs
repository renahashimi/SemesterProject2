import { getProfile, updateProfile as apiUpdateProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";
import { renderMyProfile } from "./renderMyProfile.mjs";

/**
 * Sets up the profile update form by populating it with existing user data
 * and adding an event listener to handle form submissions.
 */
export async function setUpdateProfileListener() {
    const form = document.querySelector("#editProfile");

    if (form) {
        const { name, email } = load("profile");
        if (!name || !email) {
            console.error("Profile name or email is missing.");
            return;
        }

        form.name.value = name;
        form.email.value = email;

        const button = form.querySelector("button[type='submit']");
        if (button) {
            button.disabled = true;

            try {
                const profile = await getProfile(name);
                if (profile && profile.data) {
                    form.banner.value = profile.data.banner?.url || '';
                    form.avatar.value = profile.data.avatar?.url || '';
                    form.bio.value = profile.data.bio || '';  
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                button.disabled = false;
            }

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedProfile = Object.fromEntries(formData.entries());
            
                updatedProfile.name = name;
                updatedProfile.email = email;
            
                if (!updatedProfile.banner) updatedProfile.banner = null;
                if (!updatedProfile.avatar) updatedProfile.avatar = null;
                if (!updatedProfile.bio) updatedProfile.bio = null;  
            
                const errors = validateProfile(updatedProfile);
                if (errors.length > 0) {
                    alert(errors.join('\n'));
                    return;
                }
            
                try {
                    await apiUpdateProfile(updatedProfile);
                    alert('Profile updated successfully'); 
                    await renderMyProfile();
                } catch (error) {
                    console.error('Error updating profile:', error);
                    alert('Failed to update profile. Please try again.');
                }
            });
            
        } else {
            console.error('Submit button element not found within the form.');
        }
    } else {
        console.error('Form with ID "editProfile" not found.');
    }
}

/**
 * Validates the updated profile data.
 * 
 * @param {Object} profile - The profile data to validate.
 * @returns {string[]} An array of validation error messages.
 */
function validateProfile(profile) {
    const errors = [];

    if (profile.banner && !isValidURL(profile.banner)) {
        errors.push('Banner URL is not valid.');
    }

    if (profile.avatar && !isValidURL(profile.avatar)) {
        errors.push('Avatar URL is not valid.');
    }

    // Validate Bio (Optional, no specific requirements)
    if (profile.bio && typeof profile.bio !== 'string') {
        errors.push('Bio must be a string.');
    }

    return errors;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}