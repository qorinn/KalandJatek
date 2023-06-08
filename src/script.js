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
  