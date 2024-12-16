

function loadVideo() {
    const videoContainer = document.getElementById('video');
    const iframe = document.createElement('iframe');
    const videoId = window.location.href.split('/').at(-1)
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.allow = 'autoplay; fullscreen';

    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
}



document.getElementById("videoPlayIcon").addEventListener("click", loadVideo);

