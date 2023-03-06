chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "main-script") {
      chrome.tabs.executeScript({
        file: "main.js"
      });
    }
    if (request.type === "classic-script") {
      chrome.tabs.executeScript({
        file: "classic.js"
      });
    }
  });