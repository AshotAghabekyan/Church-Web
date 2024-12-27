
const textWrapper = document.querySelector(".faith__container");
const toggleBtn = document.getElementById("more-less-btn")
const hiddenElements = document.querySelectorAll(".faith__section-hidden");

toggleBtn.addEventListener("click", function() {
    if (textWrapper.classList.contains("collapsed")) {
        textWrapper.classList.remove("collapsed");
        
        hiddenElements.forEach(function(elem) {
            elem.classList.remove('faith__section-hidden');
            elem.classList.add('faith__section-visible');
        });
        toggleBtn.innerText = "Փակել";
    }
    else {
        textWrapper.classList.add("collapsed");
        hiddenElements.forEach(function(elem) {
            elem.classList.remove('faith__section-visible');
            elem.classList.add('faith__section-hidden')
        });
        window.scroll({"top": "500", "behavior": "smooth"});
        toggleBtn.innerText = "Ավելին";
    }
});