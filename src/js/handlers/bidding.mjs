/**
 * Sets up an event listener on the bid button to handle placing a bid
 * for a specific listing when clicked. The listener retrieves the bid
 * amount from the input field and calls the `handleBid` function.
 * 
 * @async
 * @function placeBidListener
 * @param {string} listingId - The ID of the listing for which the bid is placed.
 * @returns {void} 
 * 
 * @example
 * // Call this function to initialize the bid listener for a specific listing
 * placeBidListener("12345");
 */
export async function placeBidListener(listingId) {
  const bidBtn = document.getElementById("bidBtn");

  if (bidBtn) {
      bidBtn.addEventListener("click", async (event) => {
          event.preventDefault();

          const bidSum = parseFloat(document.getElementById("bidAmountInput").value);

          try {
              await handleBid(listingId, bidSum); 
              window.location.reload(); 
          } catch (error) {
              console.error("Error adding bid:", error);
          }
      });
  }
}
