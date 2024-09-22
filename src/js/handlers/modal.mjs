export function openImageModal(src, alt) {
    const existingModal = document.getElementById("imageModal");
    if (existingModal) {
      existingModal.remove();
    }
  
    const modalHTML = `
      <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body p-0">
              <img src="${src}" alt="${alt}" style="width: 100%; height: auto;"/>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
    imageModal.show();
  
    document.getElementById("imageModal").addEventListener("hidden.bs.modal", () => {
      document.getElementById("imageModal").remove();
    });
  }
  