
const textWrapper = document.getElementById("bibleTextContainer");
const toggleBtn = document.getElementById("more-less-btn")
const hiddenElements = document.querySelectorAll(".hiddenText");

toggleBtn.addEventListener("click", function() {
    if (textWrapper.classList.contains("collapsed")) {
        textWrapper.classList.remove("collapsed");
        
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('visible');
        });
        toggleBtn.innerText = "Փակել";
    }
    else {
        textWrapper.classList.add("collapsed");
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('visible');
        });
        window.scroll({"top": "500", "behavior": "smooth"});
        toggleBtn.innerText = "Ավելին";
    }
});