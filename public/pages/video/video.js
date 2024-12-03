



async function fetchVideos(videoCount) {
    try {
        const response = await fetch(`/videos/${videoCount}`, {
            mode: "no-cors",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch videos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching videos:", error.message);
        return null;
    }
}



function createVideoItem(youtubeVideoData) {
    const videoId = youtubeVideoData.snippet.resourceId.videoId;
    const thumbnailUrl = youtubeVideoData.snippet.thumbnails.maxres.url;

    const videoDiv = document.createElement("div");
    videoDiv.className = "videoItem";
    videoDiv.dataset.videoId = videoId;

    const videoWrapper = document.createElement("div");
    videoWrapper.className = "videoWrapper";
    videoWrapper.style.background = `url(${thumbnailUrl}) no-repeat`;
    videoWrapper.style.backgroundSize = "cover";

    videoWrapper.addEventListener("click", () => {
        window.location.href = `/videos/id/${videoId}`;
    });

    videoDiv.append(videoWrapper);
    return videoDiv;
}



function findVideoById(id, vidoes) {
    const targetVideo = vidoes.find((video) => {
        return video.snippet.resourceId.videoId == id;
    })
    return targetVideo || null;
}


function loadYouTubeIframe(videoId, container) {
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}/?autoplay=1`;
    iframe.allow = "autoplay; fullscreen";
    container.appendChild(iframe);
}


function displayRecomendationVideos(videos) {
    const videosContainer = document.getElementById("otherVideos");

    if (!videos) {
        return;
    } 

    videos.map((video) => {
        const videoItem = createVideoItem(video);
        videosContainer.append(videoItem);
    })
}




function displayVideoById(video) {
    const videoWrapper = document.getElementById('video');
    if (!video) {
        return;
    }
    const thumbnailUrl = video.snippet.thumbnails.maxres.url;
    const id = video.snippet.resourceId.videoId


    videoWrapper.style.background = `url(${thumbnailUrl}) no-repeat center`;
    videoWrapper.style.backgroundSize = 'cover';

    videoWrapper.addEventListener('click', (event) => {
        if (videoWrapper.classList.contains('videoLoaded')) {
            return;
        }
        videoWrapper.classList.add('videoLoaded');
        loadYouTubeIframe(id, videoWrapper);
    })

    const titleElem = document.getElementById('title');
    titleElem.innerHTML = video.snippet.title;
}





document.addEventListener("DOMContentLoaded", async () => {
    const currUrl = new URL(window.location);
    const id = currUrl.pathname.split('/').at(-1);
    const videos = await fetchVideos(4);
    const targetVideo = findVideoById(id, videos);
    displayVideoById(targetVideo);
    displayRecomendationVideos(videos.filter((video) => video.snippet.resourceId.videoId != id))
})