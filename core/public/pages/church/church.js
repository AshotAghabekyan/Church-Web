
const textWrapper = document.querySelector(".faith__container");
const toggleBtn = document.getElementById("more-less-btn")
const hiddenElements = document.querySelectorAll(".faith__section-hidden");

toggleBtn.addEventListener("click", function() {
    if (textWrapper.classList.contains("collapsed")) {
        textWrapper.classList.remove("collapsed");
        
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('faith__section-visible');
        });
        toggleBtn.innerText = "Փակել";
    }
    else {
        textWrapper.classList.add("collapsed");
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('faith__section-visible');
        });
        window.scroll({"top": "800", "behavior": "smooth"});
        toggleBtn.innerText = "Ավելին";
    }
});