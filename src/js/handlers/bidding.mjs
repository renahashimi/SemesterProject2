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