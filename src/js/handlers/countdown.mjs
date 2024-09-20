// COUNTDOWN - ENDTIME
export function countdown(endTime, elementId, bidCount, bidButtonId, listingId) {
    const countdownElement = document.getElementById(elementId);
    const bidButton = document.getElementById(bidButtonId);
    const bidAmountInput = document.querySelector(`#bidAmountInput-${listingId}`);
  
    if (!countdownElement) {
      console.error(`Countdown element with id ${elementId} not found.`);
      return;
    }
  
    function updateCountdown() {
        const now = new Date();
        const end = new Date(endTime);
        const remainingTime = end - now;
        
        if (remainingTime <= 0) {
            // Disable the bid button and hide or disable the bid input
            if (bidButton) {
                bidButton.disabled = true; // Disable each bid button
                bidButton.textContent = "CLOSED";
                bidButton.style.opacity = '0.5';
                bidButton.style.backgroundColor = '#ccc'; // Change button appearance to reflect disabled state
                bidButton.classList.add("timeOverBtn");
                bidButton.style.pointerEvents = 'none'; // Disable pointer events
            }
  
            if (bidAmountInput) {
                bidAmountInput.disabled = true; // Disable input
                bidAmountInput.style.opacity = '0.5'; // Optional: reduce opacity to visually indicate it's disabled
                bidAmountInput.style.pointerEvents = 'none'; // Disable pointer events for the input
            }
  
            if (bidCount > 0) {
                countdownElement.innerHTML = `<p class="font-raleway-900 text-primary fs-3 p-0 mt-n2">SOLD!</p>`;
            } else {
                countdownElement.innerHTML = `<p class="font-raleway-900 text-primary fs-3 p-0 mt-n2">EXPIRED!</p>`;
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