"use strict"



async function getAllVideos() {
    try {
        let response = await fetch("/videos/allVideos", {"mode": "no-cors"});
        return response.json();
    }
    catch(error) {
        console.log(error);
    }
}

function loadYouTubeIframe(videoId, container) {
    console.log(videoId);
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
}

async function displayVideos() {
    let allVideos = await getAllVideos();
    let videosBlock = document.getElementById("videos");
  
    for (let i = 0; i < allVideos.length; ++i) {
        let videoDiv = document.createElement("div");
        videoDiv.className = "videoDiv";
        videoDiv.dataset.videoId = allVideos[i].snippet.resourceId.videoId;
        let videoWrapper = document.createElement("div");
        videoWrapper.className = "videoWrapper";
        
        videoDiv.append(videoWrapper);
        videosBlock.append(videoDiv);
    
        loadYouTubeIframe(allVideos[i].snippet.resourceId.videoId, videoWrapper);
    }
}
  

  

displayVideos();
