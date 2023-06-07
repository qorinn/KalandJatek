var previousNumber;
var calc = 0;

function randomNum(szamtarid, finalnumid) {
  var diceBox = document.getElementById(szamtarid);
  previousNumber = document.getElementById(finalnumid).textContent;

  while (diceBox.firstChild) {
    diceBox.removeChild(diceBox.firstChild);
  }

  var p = document.createElement("p");
  p.textContent = previousNumber;
  diceBox.appendChild(p);
  for (let i = 0; i < 9; i++) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    var p = document.createElement("p");
    if (i == 8) {
        p.id = finalnumid;
    } else {
        p.id = "n" + i;
    }
    p.textContent = randomNumber;
    diceBox.appendChild(p);
  }
  previousNumber = document.getElementById(finalnumid).textContent;


  diceBox.classList.remove("roll-animation");
  void diceBox.offsetWidth; // Re-flow: szükséges a stílusfrissítéshez
  diceBox.classList.add("roll-animation");

  diceBox.style.animationPlayState = "running";
  calc = 0;
  setTimeout(() => delayedFunction(szamtarid, finalnumid), 3000);
}

function delayedFunction(szamtarid, finalnumid){
  var diceBox = document.getElementById(szamtarid);
  diceBox.style.transform = "translateY(-900px)";
  var eredmeny = document.getElementById("eredmeny");
  calc += Number(document.getElementById(finalnumid).textContent);
  eredmeny.innerText = "Eredmény: "+calc;
}