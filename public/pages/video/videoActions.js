

const donateAction = document.getElementById('donateAction');
const likeAction = document.getElementById("likeAction");
const shareAction = document.getElementById("shareAction");
const toYoutubeAction = document.getElementById("toYoutubeAction");
const currUrl = new URL(window.location);
const videoId = currUrl.pathname.split('/').at(-1);

donateAction.addEventListener("click", () => window.location.href = "/donation")
toYoutubeAction.addEventListener("click", () => window.location.href = `https://www.youtube.com/@NewGeneration333TV`);


function shareVideoModal() {
    const shareModal = document.getElementById('videoShareModal');
    shareModal.style.display = "flex";
    shareModal.showModal();
    shareModal.classList.add("active");

    const closeModalBtn = document.getElementById("closeShareModal");
    closeModalBtn.addEventListener("click", () => {
        shareModal.classList.remove("active");
        setTimeout(() => {
            shareModal.style.display = "none";
        }, 300);
        shareModal.close()
    })
}



async function likeVideo() {
    const response = await fetch('/auth');
    console.log("res status", response.status);
    if (!response) {
        return alert("unauthorized");
    }
    
    console.log('auth', response);
}


likeAction.addEventListener("click", async () => {
    await likeVideo();
})


shareAction.addEventListener("click", shareVideoModal)