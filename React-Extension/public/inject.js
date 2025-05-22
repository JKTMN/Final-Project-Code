(function () {
    const iframeId = "accessibility-extension-modal";
  
    let iframe = document.getElementById(iframeId);
  
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = iframeId;
      iframe.src = chrome.runtime.getURL("index.html#/");
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.border = "none";
      iframe.style.zIndex = "999999";
      iframe.style.backgroundColor = "transparent";
      iframe.allow = "clipboard-read; clipboard-write";
  
      document.body.appendChild(iframe);
  
      // Add a listener to handle close messages from the iframe
      window.addEventListener("message", (event) => {
        if (event.data === "close-modal") {
          iframe.style.display = "none";
        }
      });
    } else {
      // If it already exists, toggle it back on if hidden
      iframe.style.display = "block";
    }
  })();
  