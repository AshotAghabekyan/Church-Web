

const donateAction = document.querySelector('.action--donate');
const likeAction = document.querySelector(".action--like");
const shareAction = document.querySelector(".action--share");
const toYoutubeAction = document.querySelector(".action--youtube");
const currUrl = new URL(window.location);

donateAction.addEventListener("click", () => window.location.href = "/donation")
toYoutubeAction.addEventListener("click", () => window.location.href = `https://www.youtube.com/@NewGeneration333TV`);


function shareVideoModal() {
    const shareModal = document.querySelector('.modal--share');
    const videoId = currUrl.pathname.split('/').at(-1);
    shareModal.style.display = "flex";
    shareModal.showModal();
    shareModal.classList.add("active");

    shareOnFacebookHandle(videoId);
    shareOnThreadHandle(videoId);
    shareOnTwitterHandle(videoId);
    
    const closeModalBtn = document.querySelector(".modal__close-btn");
    closeModalBtn.addEventListener("click", () => {
        shareModal.classList.remove("active");
        setTimeout(() => {
            shareModal.style.display = "none";
        }, 300);
        shareModal.close()
    })
}



function shareOnFacebookHandle(videoId) {
    const facebookShareButton = document.querySelector(".social-network--facebook");
    facebookShareButton.addEventListener("click", () => {
        const url = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(facebookUrl, '_blank');
    })
}


function shareOnThreadHandle(videoId) {
    const shareOnThreadButton = document.querySelector(".social-network--threads");
    shareOnThreadButton.addEventListener("click", () => {
        const url = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
        const threadUrl = `https://threads.net/intent/post?text=${url}`;
        window.open(threadUrl, '_blank');
    })
}



function shareOnTwitterHandle(videoId) {
    const shareOnTwitterButton = document.querySelector(".social-network--twitter");
    shareOnTwitterButton.addEventListener("click", () => {
        const url = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)
        const twitterUrl = `https://twitter.com/intent/tweet?text=${url}`
        window.open(twitterUrl, "_blank");
    })
}


async function likeVideo() {
    const response = await fetch('/auth', {
        mode: "cors",
    });
    console.log("res status", response.status);
    if (!response) {
        return alert("unauthorized");
    }
    
}


// likeAction.addEventListener("click", likeVideo)
shareAction.addEventListener("click", shareVideoModal)