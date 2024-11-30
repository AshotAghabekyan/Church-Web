


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/public/views/components/footer.html")
    const htmlFooter = await response.text();
    document.body.insertAdjacentHTML('beforeend', htmlFooter);
});
