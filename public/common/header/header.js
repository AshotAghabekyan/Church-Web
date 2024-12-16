


document.addEventListener("DOMContentLoaded", function() {
    const toggleInput = document.getElementById('toggle');  
    const modalWrapper = document.getElementById('modalWrapper');  
    
    toggleInput.addEventListener('change', function() {
        if (toggleInput.checked) {
            modalWrapper.classList.remove("slideOut")
            modalWrapper.classList.add("slideIn");
            modalWrapper.style.display = 'flex';  
        } else {
            modalWrapper.classList.remove("slideIn")
            modalWrapper.classList.add("slideOut")
            setTimeout(() => modalWrapper.style.display = "none", 500);
        }
    });


    modalWrapper.addEventListener('click', function(event) {
        if (event.target === modalWrapper) {  
            toggleInput.checked = false;  
            modalWrapper.style.display = 'none';  
        }
    });
});
