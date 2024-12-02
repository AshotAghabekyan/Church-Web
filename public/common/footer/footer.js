


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/public/common/footer/footer.html")
    const htmlFooter = await response.text();
    document.body.insertAdjacentHTML('beforeend', htmlFooter);
});
