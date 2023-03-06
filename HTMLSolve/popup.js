document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("run-button").addEventListener("click", function() {
      if (document.getElementById("classic").checked) {
        chrome.runtime.sendMessage({type: "classic-script"});
      } else {
        chrome.runtime.sendMessage({type: "main-script"});
      }
      document.getElementById("run-button").style.backgroundColor = "rgb(109, 38, 145)"
    });


    var optionElements = document.getElementsByClassName("option");

    for (var i = 0; i < optionElements.length; i++) {
      optionElements[i].addEventListener("click", function() {
        var checkbox = this.childNodes[0];
        if (checkbox.hasAttribute("checked")) {
          checkbox.removeAttribute("checked"); 
        } else {
          checkbox.setAttribute("checked", "checked"); 
        }
      });
    }


    document.getElementById("drop-button").addEventListener("click", function() {
    var button = document.getElementById("drop-button");
    var content = document.getElementById("drop-content");
    if (buttonState == false) {
      buttonState = true;
      content.style.display = "contents";
      button.classList.toggle('drop-up');
      button.classList.toggle('drop-down');
    } else {
      buttonState = false;
      content.style.display = "none"
      button.classList.toggle('drop-up');
      button.classList.toggle('drop-down');
    }
    });
  });
  var buttonState = false;