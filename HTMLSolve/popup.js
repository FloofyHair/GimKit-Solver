document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("run-script-button").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("WHY")
      });
    });
  });

  chrome.scripting.insert