answers = []
answer = undefined
var target, answer

document.addEventListener("click", function(event) {
  target = event.target;
});

function getPage() {
    page_question = document.getElementsByClassName("sc-kmbxGf kpRINU")
    page_win = document.getElementsByClassName("sc-cYTGjc fzhRdL flex-column maxAll")
    page_lose = document.getElementsByClassName("sc-cKtTJl ntAkj maxAll")
    if (page_question[0] != undefined) {
        return "question"
    } else if (page_win[0] != undefined) {
        return "win"
    } else if (page_lose[0] != undefined) {
        return "lose"
    }
}

function getAnswer(question) {
    let result = answers.indexOf(question)
    
    if (result == -1) {
        answer = ""
    } else {
        answer = answers[result+1]
    }
    return answer
}

function addAnswer(question, answer) {
    answers.push(question)
    answers.push(answer)
}

var observer = new MutationObserver(function(mutations) {
    if (mutations.length > 0) {
        console.log("main")



        page = getPage()

        if (page == "question") {
            text = document.getElementsByClassName("notranslate lang-en")
            question = text[0].innerHTML
            answer_1 = text[1].innerHTML
            answer_2 = text[2].innerHTML
            answer_3 = text[3].innerHTML
            answer_4 = text[4].innerHTML
            answer = getAnswer(question)
            if (answer == answer_1) {
                text[1].parentNode.parentNode.parentNode.parentNode.parentNode.style.borderColor = "rgb(255 179 0)"
                text[1].parentNode.parentNode.parentNode.parentNode.parentNode.click()
            } else if (answer == answer_2) {    
                text[2].parentNode.parentNode.parentNode.parentNode.parentNode.style.borderColor = "rgb(255 179 0)"
                text[2].parentNode.parentNode.parentNode.parentNode.parentNode.click()
            } else if (answer == answer_3) {
                text[3].parentNode.parentNode.parentNode.parentNode.parentNode.style.borderColor = "rgb(255 179 0)"
                text[3].parentNode.parentNode.parentNode.parentNode.parentNode.click()
            } else if (answer == answer_4) {
                text[4].parentNode.parentNode.parentNode.parentNode.parentNode.style.borderColor = "rgb(255 179 0)"
                text[4].parentNode.parentNode.parentNode.parentNode.parentNode.click()
            }
            
        }
    
        else if (page == "win") {
            answer = target.childNodes[0].childNodes[0].childNodes[0].innerHTML
            addAnswer(question, answer)
        }
    
        else if (page == "lose") {
            text = document.getElementsByClassName("notranslate lang-en")
            correct_answer = text[0].innerHTML
            addAnswer(question, correct_answer)
        }
    
    
    
    }
  });
  
  var targetNode = document.documentElement;
  
  var observerOptions = {
    childList: true,
    subtree: true
  };

  observer.observe(targetNode, observerOptions);