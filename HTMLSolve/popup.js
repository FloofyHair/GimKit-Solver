document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("run-button").addEventListener("click", function() {
      chrome.runtime.sendMessage({type: "run-script"});
    });
  });