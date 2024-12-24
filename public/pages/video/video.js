

function loadVideo() {
    const videoContainer = document.querySelector('.video__player');
    const iframe = document.createElement('iframe');
    const playIcon = document.querySelector('.video__play-icon');
    const videoId = window.location.href.split('/').at(-1)
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.allow = 'autoplay; fullscreen';
    playIcon.remove();
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
}



document.querySelector(".video__play-icon").addEventListener("click", loadVideo);
