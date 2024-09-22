// COUNTDOWN - ENDTIME

/**
 * Starts a countdown timer that updates the specified HTML element with the remaining time
 * until the specified end time. Disables the bid button and input field when the time is up.
 *
 * @param {string} endTime - The end time of the countdown in a format recognized by the Date constructor.
 * @param {string} elementId - The ID of the HTML element where the countdown will be displayed.
 * @param {number} bidCount - The current count of bids made on the listing.
 * @param {string} bidButtonId - The ID of the bid button to be disabled when the countdown ends.
 * @param {string} listingId - The ID of the listing to locate the bid amount input field.
 */
export function countdown(endTime, elementId, bidCount, bidButtonId, listingId) {
    const countdownElement = document.getElementById(elementId);
    const bidButton = document.getElementById(bidButtonId);
    const bidAmountInput = document.querySelector(`#bidAmountInput-${listingId}`);

    if (!countdownElement) {
        console.error(`Countdown element with id ${elementId} not found.`);
        return;
    }

    /**
     * Updates the countdown display every second and checks if the time has expired.
     */
    function updateCountdown() {
        const now = new Date();
        const end = new Date(endTime);
        const remainingTime = end - now;

        if (remainingTime <= 0) {
            if (bidButton) {
                bidButton.disabled = true; 
                bidButton.textContent = "CLOSED";
                bidButton.style.opacity = '0.5';
                bidButton.style.backgroundColor = '#ccc'; 
                bidButton.classList.add("timeOverBtn");
                bidButton.style.pointerEvents = 'none'; 
            }

            if (bidAmountInput) {
                bidAmountInput.disabled = true; 
                bidAmountInput.style.opacity = '0.5';
                bidAmountInput.style.pointerEvents = 'none';
            }

            if (bidCount > 0) {
                countdownElement.innerHTML = `<p class="font-prata text-secondary fs-4 p-0 mt-n2">SOLD!</p>`;
            } else {
                countdownElement.innerHTML = `<p class="font-prata text-primary fs-4 p-0 mt-n2">EXPIRED!</p>`;
            }
            return;
        }

        const hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-container justify-content-center mb-3">
                <span class="countdown-unit countdown-hour">${hours}h</span>
                <span class="countdown-unit countdown-minute mx-1">${minutes}m</span>
                <span class="countdown-unit countdown-second">${seconds}s</span>
            </div>
        `;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}
