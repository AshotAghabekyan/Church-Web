

document.getElementById("mobileNavToggle").onclick = function() {
    document.getElementById("myModal").style.display = "flex";
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
};

document.getElementById("closeMobileNavBar").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
    const body = document.querySelector("body");
    body.style.overflow = "auto";
}) 

window.onclick = function(event) {
    if (event.target === document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
};

let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    window.location.href = "/";
})