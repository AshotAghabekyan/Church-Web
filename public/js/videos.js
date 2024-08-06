"use strict"



async function getAllVideos() {
    try {
        return new Promise((resolve, reject) => {
            fetch("/videos/4", {
                "mode": "no-cors",
            })
            .then((response) => response.json())
            .then(parsedResponse => resolve(parsedResponse))
            .catch((error) => reject())
        })
    }
    catch(error) {
        console.log(error);
        return null;
    }
}


function videosNotFoundHandler() {
    let videosBlock = document.getElementById("videos");
    videosBlock.style.minHeight = "min-content";
    videosBlock.style.maxHeight = "min-content";
    const errorText = `Vidoes not found, try again later`
    const textContainer = document.createElement("p");
    textContainer.style.fontSize = "30px";
    textContainer.style.color = "#3f4359";
    const errorTextDiv = document.createElement("div");
    errorTextDiv.style.display = "flex";
    errorTextDiv.style.justifyContent = "center";
    errorTextDiv.style.alignItems = "center";
    textContainer.innerText = errorText;
    errorTextDiv.appendChild(textContainer);
    videosBlock.appendChild(errorTextDiv);
}


function loadYouTubeIframe(videoId, container) {
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
}



async function displayVideos() {
    let allVideos = await getAllVideos();
    if (!allVideos) {
        return videosNotFoundHandler();
    }

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
