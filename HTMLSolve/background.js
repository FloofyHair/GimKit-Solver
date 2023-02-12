chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "run-script") {
      chrome.tabs.executeScript({
        file: "main.js"
      });
    }
  });