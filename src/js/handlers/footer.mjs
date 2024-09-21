export function loadFooter() {
    fetch("/feed/helpers/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footerContainer").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
}