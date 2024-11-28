


document.addEventListener("DOMContentLoaded", () => {
    fetch("/public/views/components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        })
        .catch(error => console.error("footer load error:", error));
});
