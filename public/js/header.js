

document.getElementById("mobileNavToggle").onclick = function() {
    const modalMenu = document.getElementById("myModal")
    const modalWrapper = document.getElementById("modalWrapper");
    modalMenu.style.display = "flex";
    modalWrapper.style.display = "flex";
};

document.getElementById("closeMobileNavBar").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("modalWrapper").style.display = "none";
}) 

window.onclick = function(event) {
    if (event.target === document.getElementById("modalWrapper")) {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modalWrapper").style.display = "none";
    }
};

let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    window.location.href = "/";
})