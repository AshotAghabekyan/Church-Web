
const toggleCheckbox = document.getElementById("toggle");
const toggleLabel = document.getElementById("toggleLabel");
const modalWrapper = document.getElementById("modalWrapper");


toggleCheckbox.onchange = function(event) {
    if (toggleCheckbox.checked) {
        const modalMenu = document.getElementById("myModal")
        toggleLabel.style.position = "fixed";
        modalMenu.style.display = "flex";
        modalWrapper.style.display = "flex";
    } 
    else {
        toggleLabel.style.position = "absolute";
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modalWrapper").style.display = "none";
    }
}


modalWrapper.addEventListener("click", (event) => {
    toggleCheckbox.checked = false;
    toggleCheckbox.onchange(event);
})



let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    window.location.href = "/";
})