chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "run-script") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "script.js"});
      });
    }
  });