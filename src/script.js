function checkStat(id) {
    localStorage.setItem(id, document.getElementById(id).textContent);
    var dynamicVal = localStorage.getItem(id);
    if (id === "hp" || id === "compnum" || id === "compstren") {
        var tomb = dynamicVal.split('/');
        var statAmount = tomb[0] / tomb[1] * 100;
        localStorage.setItem(id, dynamicVal);
    }
    else {
        var statAmount = dynamicVal / 12 * 100;
        localStorage.setItem(id, dynamicVal);
    }

    if (id !== "diary" && id !== "gold" && id !== "slaves") {
        const pseudoHp = document.getElementById(id + 'Indicator');
        pseudoHp.style.height = statAmount + '%';
    }
}

function calcStats(id, value){
    if (id === "hp" || id === "compnum" || id === "compstren"){
        let idVal = localStorage.getItem(id);
        let idBox = document.getElementById(id);
        let x = idVal.split('/');
        let calcId = Number(x[0]) + value;
        console.log(calcId);
        if (calcId < 0){ idBox.innerText = 0+"/"+x[1];}
        else if (calcId > x[1]){ idBox.innerText = x[1]+"/"+x[1];}
        else{ idBox.innerText = calcId+"/"+x[1];}
        checkStat(id);
    }
    else{
        let idVal = localStorage.getItem(id);
        let idBox = document.getElementById(id);
        let calcId = Number(idVal) + value;
        console.log(calcId);
        if (calcId < 0){ idBox.innerText = 0;}
        else if (calcId > 12){
            if (id === "skill" || id === "luck") {idBox.innerText = 12;}
            else{ idBox.innerText = calcId;}
        }
        else{ idBox.innerText = calcId;}
        checkStat(id);
    }
}


let globaldsz;
function ThrowDice(dsz) {
    for (let i = 1; i <= dsz; i++) {
        randomNum("szamTarolo" + i, "finalNumber" + i);
    }
    removeClick();
}
function removeClick(){
    var dices = document.querySelectorAll('.dice');
    dices.forEach(function(dice) {
        dice.removeEventListener('click', ThrowDice);
        dice.disabled = true;
    });
}
function diceClickHandler(){
    console.log(globaldsz);
    ThrowDice(globaldsz);
    globaldsz = 0;
}
function throwDice(dsz, id, lap, bool, calcId, calcVal){
    globaldsz = dsz;
    for (let i = 1; i <= dsz; i++) {
        let dice = document.getElementById('dice'+i);
        dice.classList.remove('display-none');
        dice.addEventListener('click', diceClickHandler);
    }
    if (id === "hp" || id === "compnum" || id === "compstren"){
        let idVal = localStorage.getItem(id);
        let x = idVal.split('/');
        let comaprison = x[0];
        console.log(comaprison+" comparison");
    }
    else{
        let comaprison = localStorage.getItem(id);
        console.log(comaprison+" comparison");
    }
    let eredmeny = document.getElementById('eredmeny');
    eredmeny.classList.remove('display-none');
    
}

//TOGGLE MAP

var prevoiusMap;
function toggleMap() {
    var stats = document.getElementById("statsContainer");
    var map = document.getElementById('map');
    var currentMap = map.getAttribute('src');
    var magnify = document.getElementById('magnifying');
    var terkepPath = "/img/terkep.png";

    if (currentMap != terkepPath) {
        prevoiusMap = map.getAttribute('src');
    }

    stats.classList.toggle('display-none');

    if (stats.classList.contains('display-none')) {
        map.setAttribute("src", terkepPath)
        magnify.style.right = '100px';
        magnify.classList.remove('fa-magnifying-glass-plus');
        magnify.classList.add('fa-magnifying-glass-minus');
    } else {
        map.setAttribute("src", prevoiusMap);
        magnify.style.right = '50px';
        magnify.classList.add('fa-magnifying-glass-plus');
        magnify.classList.remove('fa-magnifying-glass-minus');
    }

}

//LOCAL STORAGE AND CARD HANDLER

if (localStorage.getItem('cardID') === undefined) {
    localStorage.setItem('cardID', 1);
}

function getCardContent(cardID) {
    var card = document.getElementsByClassName("cardBody")[0];
    var cardNum = document.getElementById('cardNum');
    fetch("../json/cards2.json")
        .then((res) => {
            return res.json();
        })
        .then((jsonData) => {
            card.innerHTML = "<p>" + jsonData[cardID].cardContent + "</p>";
            cardNum.innerHTML = jsonData[cardID].cardID + ". Kártya";

            Object.keys(jsonData[cardID]).forEach((key) => {
                if (key === 'map') {
                    var map = document.getElementById('map');
                    map.setAttribute('src', "img/locations/" + jsonData[cardID][key] + ".png");
                    localStorage.setItem("map", jsonData[cardID][key] + ".png");
                }
            });

            const keyToIdMap = {
                "1": "skill",
                "2": "hp",
                "3": "luck",
                "4": "compnum",
                "5": "compstren",
                "6": "diary",
                "7": "gold",
                "8": "slaves"
            };
            Object.keys(jsonData[cardID]).forEach((key) => {
                if (key === 'statupdate') {
                    jsonData[cardID].statupdate.forEach(function (item) {
                        Object.keys(item).forEach(function (key) {
                            var value = item[key];
                            var segedId = keyToIdMap[key];
                            console.log(segedId, value);
                            calcStats(segedId, value);
                        });
                    });
                }
            });

            var kisseged;
            Object.keys(jsonData[cardID]).forEach((key) => {
                var item;
                var dobasszam;
                var kulcs;
                var lapozz;
                var bool = false;
                var calcId;
                var calcVal;

                if (key === 'throw'){
                    kisseged = 'throw';
                }
                if (kisseged === 'throw') {

                    var dices = document.querySelectorAll('.dice');
                    dices.forEach(dice => {
                        dice.disabled = false;
                        dice.style.opacity = 1;
                    });
                    item = jsonData[cardID].throw;
                    dobasszam = item[0];
                    kulcs = keyToIdMap[item[1]];
                    lapozz = [];
                    for (let i = 2; i < jsonData[cardID].throw.length; i++){
                        lapozz.push(item[i]);
                    }
                    throwDice(dobasszam, kulcs, lapozz, bool, calcId, calcVal);
                }
                else{
                    var dices = document.querySelectorAll('.dice');
                    dices.forEach(dice => {
                        dice.disabled = true;
                        dice.style.opacity = 0.5;
                    });
                }
                if (key === 'valami'){
                    console.log(key[0]);
                    bool = true;
                    calcId = key[0];
                    calcVal = key[1];
                    throwDice(dobasszam, kulcs, lapozz, bool, calcId, calcVal);
                    console.log(dobasszam, kulcs, lapozz, bool, calcId, calcVal);
                }
            });
              

            var container = document.getElementById('choices');
            container.innerHTML = '';
            if (jsonData[cardID].cardTo.length > 0) {
                jsonData[cardID].cardTo.forEach((option) => {
                    if (jsonData[cardID].cardTo.length === 1) {
                        container.classList.remove("choicesGrid");
                        container.classList.add("choicesFlex");
                    }
                    else {
                        container.classList.remove("choicesFlex");
                        container.classList.add("choicesGrid");
                    }
                    var optionElement = document.createElement('button');
                    var optionBg = document.createElement('div');
                    optionBg.classList = 'btn-bg';
                    optionElement.id = option;
                    optionElement.innerText = option;
                    optionElement.disabled = true;
                    optionElement.style.opacity = "0.5";

                    Object.keys(jsonData[cardID]).forEach((key) => {
                        if (key === 'btndisabled') {
                            if (jsonData[cardID].btndisabled !== true) {
                                setTimeout(() => enableBtn(optionElement), 2000);
                            }
                        }
                    });

                    optionElement.addEventListener('click', function () {
                        getCardContent(option);
                        console.log('Heading to ' + option);
                    });
                    container.appendChild(optionElement);
                    optionElement.appendChild(optionBg);
                });
            } else {
                container.classList.remove("choicesGrid");
                container.classList.add("choicesFlex");
                var restartBtn = document.createElement('button');
                var restartBg = document.createElement('div');
                restartBg.classList = 'btn-bg-re';
                restartBtn.id = 'restart';
                restartBtn.innerText = 'Újrakezdés';
                restartBtn.disabled = true;
                restartBtn.style.opacity = "0.5";
                setTimeout(() => enableBtn(restartBtn), 1000);
                restartBtn.addEventListener('click', function () {
                    getCardContent(0);
                    console.log('Restarting game');
                });
                container.appendChild(restartBtn);
                restartBtn.appendChild(restartBg);
            };



            localStorage.setItem('cardID', jsonData[cardID].cardID);
        });
}

function enableBtn(button) {
    button.disabled = false;
    button.style.opacity = "1";
}

var backwards = document.getElementById('backwards');
backwards.addEventListener("click", function () {
    let thisCard = parseInt(localStorage.getItem('cardID'));
    let prevCard = thisCard - 1; //csak hogy olvashatóbb legyen
    getCardContent(prevCard);
});

var forwards = document.getElementById('forwards');
forwards.addEventListener("click", function () {
    let thisCard = parseInt(localStorage.getItem('cardID'));
    let nextCard = thisCard + 1;
    getCardContent(nextCard);
});



window.addEventListener('load', function () {
    getCardContent(localStorage.getItem('cardID'));
    var map = document.getElementById('map');
    map.setAttribute("src", "img/locations/" + localStorage.getItem('map'));
    checkStat('skill');
    checkStat('hp');
    checkStat('luck');
    checkStat('compnum');
    checkStat('compstren');
    checkStat('diary');
    checkStat('gold');
    checkStat('slaves');
    console.log('Page loaded');
});

console.log(localStorage);