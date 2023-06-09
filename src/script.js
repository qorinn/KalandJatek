var healthStrVal = document.getElementById("hp").value;
var health = healthStrVal.split('/');

const pseudoHp = document.getElementById('hpIndicator');
pseudoHp.style.height = health[0] + '%';

function checkHealth() {
    var healthStrVal = document.getElementById("hp").value;
    var health = healthStrVal.split('/');
    var healthAmount = health[0]/health[1]*100
  
    const pseudoHp = document.getElementById('hpIndicator');
    pseudoHp.style.height = healthAmount + '%';
}


var prevoiusMap;
function toggleMap(){
    var stats = document.getElementById("statsContainer");
    var map = document.getElementById('map');
    var currentMap = map.getAttribute('src');
    var terkepPath = "/img/terkep.png";

    if (currentMap != terkepPath){
        prevoiusMap = map.getAttribute('src');
    }

    stats.classList.toggle('display-none');

    if (stats.classList.contains('display-none')) {
       map.setAttribute("src", terkepPath)
    } else {
        map.setAttribute("src", prevoiusMap);
    }

}


function getCardContent(cardID) {
    card = document.getElementsByClassName("cardBody")[0];
    cardNum = document.getElementById('cardNum');
    fetch("../json/cards.json")
        .then((res) => {
            return res.json();
        })
        .then((JsonData) => {card.innerHTML = JsonData[cardID].cardContent, cardNum.innerHTML = JsonData[cardID].cardID});
};


window.addEventListener('load', function() {
    getCardContent(1);
    console.log('Page loaded');
  });