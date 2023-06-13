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
var defaultLuck;


function setStatValue(id){
    let stat = document.getElementById(id);
    console.log("setStatValue "+localStorage.getItem(id)) // 8/8
    stat.innerText = localStorage.getItem(id);
    console.log("2");
}

function checkStat(id) {
    var dynamicVal = localStorage.getItem(id);
    if (id === "hp" || id === "compnum" || id === "compstren") {
        var tomb = dynamicVal.split('/');
        var statAmount = tomb[0] / tomb[1] * 100;
    }
    else {
        var statAmount = dynamicVal / 12 * 100;
    }

    if (id !== "diary" && id !== "gold" && id !== "slaves") {
        const pseudoBg = document.getElementById(id + 'Indicator');
        pseudoBg.style.height = statAmount + '%';
    }
}

function calcStats(id, value, nulladik){
    let idVal = localStorage.getItem(id);
    let idBox = document.getElementById(id);
    if (id === "hp" || id === "compnum" || id === "compstren"){
        let x = idVal.split('/');
        if (nulladik) {
            if (id === "hp"){
                console.log("setting " + id);
                x[0] = parseInt(x[0]) + 12;
                x[1] = x[0];
            }
            else{
                console.log("setting " + id);
                x[0] = parseInt(x[0]) + 6;
                x[1] = x[0];
            }
            let calcSlash = x[0]+"/"+x[1];
            localStorage.setItem(id, calcSlash);
            console.log(id+" is set to: "+localStorage.getItem('hp')); // 20/20
        }
        else{
            x[0] = Number(x[0]) + value;
        }
        if (x[0] < 0){ localStorage.setItem(id, "0"+"/"+x[1]); console.log("meghaltál");}
        else if (x[0] > x[1]){ localStorage.setItem(id, x[1]+"/"+x[1]);}
        else{ localStorage.setItem(id, x[0]+"/"+x[1]);}
        setStatValue(id);
        checkStat(id);
    }
    else{
        if (nulladik) {
            console.log("setting " + id);
            var calcId = parseInt(idVal) + 6;
            console.log(id+" is set to: "+calcId);
        }
        else{
            var calcId = Number(idVal) + value;
            console.log(id+" is set to: "+calcId);
        }
        if (calcId < 0){ localStorage.setItem(id, "0");}
        if (id === "luck") {
            defaultLuck = calcId;
            if (calcId > defaultLuck) {
                idBox.innerText = defaultLuck;
            }
            else{
                idBox.innerText = calcId;
            }
        }
        if (calcId > 12){
            if (id === "skill") {localStorage.setItem(id, "12");}
        }
        else{ localStorage.setItem(id, calcId);}
        setStatValue(id);
        checkStat(id);
    }
    var noti1 = document.getElementById('noti1');
    var noti2 = document.getElementById('noti2');
    noti1.innerText = id;
    noti2.innerText = value;
    noti1.style.transition = ".3s";
    noti2.style.transition = ".3s";
    noti1.style.left = "50%";
    noti2.style.right = "50%";
    setTimeout(function(){
        noti1.style.transform = "translate(-100%, -100%)";
        noti2.style.transform = "translate(100%, -100%)";
        setTimeout(function(){
            noti1.style.transition = "0s";
            noti2.style.transition = "0s";
            noti1.style.transform = "translate(-100%, 0%)";
            noti2.style.transform = "translate(100%, 0%)";
            noti1.style.left = "0";
            noti2.style.right = "0";
        }, 300);
    }, 5000);
    if (value < 0){
        noti1.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        noti2.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
    else{
        noti1.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        noti2.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    }
}

var nulladik = false;
var globaldszkl = 0;
var globaldszk;
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
        setTimeout(delayOpacity, 3000);
    });
}
function delayOpacity(){
    var dices = document.querySelectorAll('.dice');
    dices.forEach(function(dice) {
        dice.style.opacity = 0.5;
    });
    var eredmeny = document.getElementById('eredmeny');
    eredmeny.classList.remove("glowAnimation");
    void eredmeny.offsetWidth; // Re-flow: szükséges a stílusfrissítéshez
    eredmeny.classList.add("glowAnimation");
  
    BtnEnable();
}
function BtnEnable(){
    var btns = document.querySelectorAll('.choices button');
    btns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = 1;
    });
}
function diceClickHandler(){
    ThrowDice(globaldszk[globaldszkl]);
    globaldszkl++;
    if (globaldszkl <= globaldszk.length) {
        setTimeout(function(){
            throwDice(globaldszkl, globaldszk);
        }, 3001);
    }
    if (nulladik) {
        setTimeout(function(){
            let eredmenyBox = document.getElementById('eredmeny').textContent;
            let x = eredmenyBox.split(": ");
            if (keyToIdMap[globaldszkl] === "hp" || keyToIdMap[globaldszkl] === "compnum" || keyToIdMap[globaldszkl] === "compstren") {
                localStorage.setItem(keyToIdMap[globaldszkl], x[1]+"/"+x[1]);
                console.log("1");
                console.log(localStorage.getItem(keyToIdMap[globaldszkl])+" bemener");
            } else {
                console.log("1");
                localStorage.setItem(keyToIdMap[globaldszkl], x[1]);
                console.log(localStorage.getItem(keyToIdMap[globaldszkl])+" bemenet")
            }
            calcStats(keyToIdMap[globaldszkl], 0, true);
        }, 3001);
    }
}
function throwDice(index, dszk){
    for (let i = 1; i <= dszk[index]; i++) {
        console.log(i+" kocka");
        let dice = document.getElementById('dice'+i);
        dice.disabled = false;
        dice.style.opacity = 1;
        dice.addEventListener('click', diceClickHandler);
    }
    console.log("throwing available");
    /*
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
    */
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

            if (jsonData[cardID].cardID === 0){
                nulladik = true;
            }
            else{
                nulladik = false;
            }

            Object.keys(jsonData[cardID]).forEach((key) => {
                if (key === 'map') {
                    var map = document.getElementById('map');
                    map.setAttribute('src', "img/locations/" + jsonData[cardID][key] + ".png");
                    localStorage.setItem("map", jsonData[cardID][key] + ".png");
                }
            });


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

                if (key === 'throw'){
                    kisseged = 'throw';
                }
                if (kisseged === 'throw') {
                    
                    var eredmeny = document.getElementById('eredmeny');
                    eredmeny.disabled = false;
                    eredmeny.style.opacity = 1;

                    globaldszkl = 0;
                    var item = jsonData[cardID].throw;
                    var dobasszamok = [];
                    for (let i = 0; i < jsonData[cardID].throw.length; i++){
                        dobasszamok.push(item[i]);
                    }
                    globaldszk = dobasszamok;
                    throwDice(globaldszkl, dobasszamok);
                }
                else{
                    var eredmeny = document.getElementById('eredmeny');
                    var dices = document.querySelectorAll('.dice');
                    dices.forEach(dice => {
                        dice.disabled = true;
                        dice.style.opacity = 0.5;
                    });
                    eredmeny.disabled = true;
                    eredmeny.style.opacity = 0.5;
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
                        if (key !== 'btndisabled') {
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
                    getCardContent(1);
                    localStorage.clear();
                    console.log('Restarting game');
                });
                container.appendChild(restartBtn);
                restartBtn.appendChild(restartBg);
            };




            localStorage.setItem('cardID', jsonData[cardID].cardID);
        });
}

function enableBtn(button) {
    console.log("asd");
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
    if (localStorage.getItem('cardID')){
        console.log(localStorage.getItem('cardID')+". betöltése");
        getCardContent(localStorage.getItem('cardID'));
        var map = document.getElementById('map');
        map.setAttribute("src", "img/locations/" + localStorage.getItem('map'));
        setStatValue('skill');
        setStatValue('hp');
        setStatValue('luck');
        setStatValue('compnum');
        setStatValue('compstren');
        setStatValue('diary');
        setStatValue('gold');
        setStatValue('slaves');
        checkStat('skill');
        checkStat('hp');
        checkStat('luck');
        checkStat('compnum');
        checkStat('compstren');
        checkStat('diary');
        checkStat('gold');
        checkStat('slaves');
    }else{
        console.log("0. betöltése");
        getCardContent(0);
    }
    console.log('Page loaded');
});

console.log(localStorage);