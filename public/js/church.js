
const textWrapper = document.getElementById("bibleTextContainer");
const toggleBtn = document.getElementById("more-less-btn")
const hiddenElements = document.querySelectorAll(".hiddenText");


toggleBtn.addEventListener("click", function() {
    if (textWrapper.classList.contains("collapsed")) {
        textWrapper.classList.remove("collapsed");
        
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('visible');
            elem.classList.remove("hiddenText");
        });
        toggleBtn.innerText = "Less";
    }
    else {
        textWrapper.classList.add("collapsed");
        hiddenElements.forEach(function(elem) {
            elem.classList.toggle('visible');
            elem.classList.add("hiddenText");
        });
        window.scroll({"top": 0, "behavior": "smooth"});
        toggleBtn.innerText = "More";
    }
});