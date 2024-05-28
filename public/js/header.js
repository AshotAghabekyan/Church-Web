

const toggleCheckbox = document.getElementById("toggle");

toggleCheckbox.onchange = function(event) {
    if (toggleCheckbox.checked) {
        const modalMenu = document.getElementById("myModal")
        const modalWrapper = document.getElementById("modalWrapper");
        modalMenu.style.display = "flex";
        modalWrapper.style.display = "flex";
    } 
    else {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modalWrapper").style.display = "none";
    }
}

document.getElementById("mobileNavToggle").addEventListener("click", function(event) {
    toggleCheckbox.onchange(event)
})

window.onclick = function(event) {
    if (event.target === document.getElementById("modalWrapper")) {
        toggleCheckbox.checked = false;
    }
};

let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    window.location.href = "/";
})