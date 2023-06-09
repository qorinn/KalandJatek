function checkStat(id) {
    var dynamicVal = document.getElementById(id).textContent;
    if (id === "hp" || id === "compnum" || id === "compstren"){
        var tomb = dynamicVal.split('/');
        var statAmount = tomb[0]/tomb[1]*100;
        localStorage.setItem(id, tomb[0]);
    }
    else{
        var statAmount = dynamicVal/12*100;
        localStorage.setItem(id, dynamicVal);
    }
  
    const pseudoHp = document.getElementById(id+'Indicator');
    pseudoHp.style.height = statAmount + '%';
}

function handleChange(event, id) {
    var newValue = event.target.value;
    checkStat(id);
}

var skill = document.getElementById('skill');
skill.addEventListener('change', function(event) {
    handleChange(event, "skill");
});



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
    fetch("../json/output.json")
        .then((res) => {
            return res.json();
        })
        .then((JsonData) => {card.innerHTML = JsonData[cardID].cardContent, cardNum.innerHTML = JsonData[cardID].cardID + ". Kártya", localStorage.setItem('cardID', JsonData[cardID].cardID)});
};


window.addEventListener('load', function() {
    getCardContent(localStorage.getItem('cardID'));
    checkStat("skill");
    checkStat("hp");
    checkStat("luck");
    checkStat("compnum");
    checkStat("compstren");
    console.log('Page loaded');
  });

  console.log(localStorage);