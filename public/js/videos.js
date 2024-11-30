"use strict";

// Fetch videos from the backend
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



// Handle case where no videos are found
function notFoundHandler(videosBlock) {
    videosBlock.innerHTML = ""; // Clear existing content
    videosBlock.style.minHeight = "min-content";
    videosBlock.style.maxHeight = "min-content";

    const errorTextDiv = document.createElement("div");
    errorTextDiv.style.display = "flex";
    errorTextDiv.style.justifyContent = "center";
    errorTextDiv.style.alignItems = "center";

    const textContainer = document.createElement("p");
    textContainer.style.fontSize = "30px";
    textContainer.style.color = "#3f4359";
    textContainer.innerText = "Videos not found, try again later";

    errorTextDiv.appendChild(textContainer);
    videosBlock.appendChild(errorTextDiv);
}



// Create a single video item
function createVideoItem(youtubeVideoData) {
    const videoId = youtubeVideoData.snippet.resourceId.videoId;
    const thumbnailUrl = youtubeVideoData.snippet.thumbnails.maxres.url;

    const videoDiv = document.createElement("div");
    videoDiv.className = "videoDiv";
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




// Display videos on the page
async function displayVideos(videos, container) {
    container.innerHTML = ""; // Clear any previous content

    if (!videos || videos.length === 0) {
        return notFoundHandler(container);
    }

    videos.forEach(video => {
        const videoItem = createVideoItem(video);
        container.appendChild(videoItem);
    });
}







// Initialize and display videos
document.addEventListener("DOMContentLoaded", async () => {
    const videoCount = 4;
    const allVideos = await fetchVideos(videoCount);
    const videoContainer = document.getElementById('videos');
    displayVideos(allVideos, videoContainer);
});


