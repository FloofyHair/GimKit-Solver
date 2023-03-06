answers = []
moneyPerQuestionPrices = [10, 100, 1000, 10000, 75000, 300000, 1000000, 10000000, 100000000]
streakBonusPrices = [20, 200, 2000, 20000, 200000, 2000000, 20000000, 200000000, 2000000000]
multiplierPrices = [50, 300, 2000, 12000, 85000, 700000, 6500000, 65000000, 1000000000]
insurancePrices = [10, 250, 1000, 25000, 100000, 5000000, 25000000, 500000000]

moneyPerQuestionTier = 0
streakBonusTier = 0
multiplierTier = 0
insuranceTier = 0

answer = undefined
var target, answer, run

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

function updateStatus() {
    run = false
    bar = document.getElementsByClassName("sc-ddKZzx hYpoju")[0];
    money = parseInt(bar.childNodes[3].childNodes[1].childNodes[0].childNodes[0].innerHTML.replace(/\D/g, ""))
    
    if (money>=moneyPerQuestionPrices[moneyPerQuestionTier]) {
        mpqs = true
    } else {
        mpqs = false
    }
    if (money>=streakBonusPrices[streakBonusTier]) {
        sbs = true
    } else {
        sbs = false
    }
    if (money>=multiplierPrices[multiplierTier]) {
        ms = true
    } else {
        ms = false
    }
    if (money>=insurancePrices[insuranceTier]) {
        is = true
    } else {
        is = false
    }
    
    moneyPerQuestionStatus.innerHTML = "<div style=\"font-weight: 900; font-weight: 900; font-size: 22px\">O</div>"
    streakBonusStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
    multiplierStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
    insuranceStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"

    bar.childNodes[5] = moneyPerQuestionStatus
    bar.childNodes[7] = streakBonusStatus
    bar.childNodes[9] = multiplierStatus
    bar.childNodes[11] = insuranceStatus

    green = "<div style=\"font-weight: 900; font-size: 22px; color: chartreuse;\">O</div>"
    red = "<div style=\"font-weight: 900; font-size: 22px; color: red;\">O</div>"

    if (mpqs == false) {
        moneyPerQuestionStatus.innerHTML = red
    } else {
        moneyPerQuestionStatus.innerHTML = green
    }
    if (sbs == false) {
        streakBonusStatus.innerHTML = red
    } else {
        streakBonusStatus.innerHTML = green
    }
    if (ms == false) {
        multiplierStatus.innerHTML = red
    } else {
        multiplierStatus.innerHTML = green
    }
    if (is == false) {
        insuranceStatus.innerHTML = red
    } else {
        insuranceStatus.innerHTML = green
    }

    bar.childNodes[5] = moneyPerQuestionStatus
    bar.childNodes[7] = streakBonusStatus
    bar.childNodes[9] = multiplierStatus
    bar.childNodes[11] = insuranceStatus
}

function getStatus() {
    try {
        question = document.getElementsByClassName("sc-goETIM epGMEu")[0].childNodes[0].childNodes[0].childNodes[0].innerHTML
        tiers = document.getElementsByClassName("sc-dfaysv jLIiLL")
        tiersPurchased = -1;
        for (i=0; i<tiers.length; i++) {
            if (tiers[i].childNodes[0].outerHTML == "<div style=\"color: gray; margin-right: 3px;\"><i class=\"fas fa-circle\"></i></div>") {
                tiersPurchased++
            }
        }
        if (question == "Money Per Question") {
            moneyPerQuestionTier = tiersPurchased
        } if (question == "Streak Bonus") {
            streakBonusTier = tiersPurchased
        } if (question == "Multiplier") {
            multiplierTier = tiersPurchased
        } if (question == "Insurance") {
            insuranceTier = tiersPurchased
        }
    }
    catch{return undefined;}
}

function main() {
    console.log(moneyPerQuestionTier, streakBonusTier, multiplierTier, insuranceTier)
    updateStatus()

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

        label = document.getElementsByClassName("sc-wtwbJ FGFoL")[0].childNodes[0].childNodes[0].childNodes[0].innerHTML
        if (mpqs || sbs || ms) {
            document.getElementsByClassName("sc-wtwbJ FGFoL")[0].childNodes[0].childNodes[0].childNodes[0].innerHTML = "<center>"+label+"<br><p style=\"font-size:40px\"> (Upgrade Available!) </p></center>"
        }
        
    }

    else if (page == "lose") {
        text = document.getElementsByClassName("notranslate lang-en")
        correct_answer = text[0].innerHTML
        addAnswer(question, correct_answer)
    }
}

var bar = document.getElementsByClassName("sc-ddKZzx hYpoju")[0];
var money = bar.childNodes[3].childNodes[1].childNodes[0].childNodes[0].innerHTML

var moneyPerQuestion = document.createElement('div');
var moneyPerQuestionStatus = document.createElement('div');
//moneyPerQuestion.innerHTML = "<div style=\"font-weight: 900; font-size: 22px; width: auto; padding: 5px; padding-left: 15px\">Money&#160;Per&#160;Question</div>"
moneyPerQuestionStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
mpqs = false
bar.appendChild(moneyPerQuestion);
bar.appendChild(moneyPerQuestionStatus);

var streakBonus = document.createElement('div');
var streakBonusStatus = document.createElement('div');
//streakBonus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px; width: auto; padd    ing: 5px\">Streak&#160;Bonus</div>"
streakBonusStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
sbs = false
bar.appendChild(streakBonus);
bar.appendChild(streakBonusStatus);

var multiplier = document.createElement('div');
var multiplierStatus = document.createElement('div');
//multiplier.innerHTML = "<div style=\"font-weight: 900; font-size: 22px; width: auto; padding: 5px\">Multiplier</div>"
multiplierStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
ms = false
bar.appendChild(multiplier);
bar.appendChild(multiplierStatus);

var insurance = document.createElement('div');
var insuranceStatus = document.createElement('div');
//insurance.innerHTML = "<div style=\"font-weight: 900; font-size: 22px; width: auto; padding: 5px\">Insurance</div>"
insuranceStatus.innerHTML = "<div style=\"font-weight: 900; font-size: 22px\">O</div>"
is = false
bar.appendChild(insurance);
bar.appendChild(insuranceStatus);


var observer = new MutationObserver(function(mutations) {
    if (mutations.length > 0) {
        getStatus()
        if (run == true) {
            try {
            main()
            }catch{}
        } else {
            run = true
        }
    }
  });
  
  var targetNode = document.documentElement;
  
  var observerOptions = {
    childList: true,
    subtree: true
  };

  observer.observe(targetNode, observerOptions);