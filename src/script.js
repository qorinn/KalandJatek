function checkStat(id) {
    var dynamicVal = document.getElementById(id).textContent;
    if (id === "hp" || id === "compnum" || id === "compstren") {
        var tomb = dynamicVal.split('/');
        var statAmount = tomb[0] / tomb[1] * 100;
        localStorage.setItem(id, tomb[0]);
    }
    else {
        var statAmount = dynamicVal / 12 * 100;
        localStorage.setItem(id, dynamicVal);
    }

    const pseudoHp = document.getElementById(id + 'Indicator');
    pseudoHp.style.height = statAmount + '%';
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
            let stats = {
                3: document.getElementById("luck"),
                4: document.getElementById("compnum"),
                5: document.getElementById("compstren"),
                6: document.getElementById("diary"),
                7: document.getElementById("gold"),
                8: document.getElementById("slave")
            }
            Object.keys(jsonData[cardID]).forEach((key) => {
                let statsToUpdate = jsonData[cardID].statupdate;
                if (key === 'statupdate') {
                    console.log("behatolás");
                    for (var i = 0; i < statsToUpdate.length; i++) {
                        var item = statsToUpdate[i];
                        Object.keys(item).forEach(function (key) {
                            var value = item[key];
                            switch (key) {
                                case "1":
                                    document.getElementById("skill").textContent += value;
                                case "2":
                                    let hps = document.getElementById("hp").textContent.split('/')
                                    document.getElementById("hp").textContent = hps[1] + "/" + hp[0] + value;
                            }
                        });
                    }
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
                    setTimeout(() => enableBtn(optionElement), 2000);
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
    console.log('Page loaded');
});

console.log(localStorage);