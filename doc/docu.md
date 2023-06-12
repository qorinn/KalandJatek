
# Vértengerek
### 1. Forrás formázás, feldolgozás
> Az első forrás kifelytő python script
> docx formátumba konvertálás külső webalkalmazás használatával, .pdf formátumból. 
> Nyers text formátumú kinyerés docx formátumból.
```py
import docx2txt
result = docx2txt.process("asd.docx")
f = open("text.txt", "r+", encoding='utf-8')
for n in range(40):
    result = result.replace("\n\n","\n")
print(result)
f.write(result)
f.close()
```
***
> Szöveg egyszerűsítése
```py
f = open("text.txt", "r+", encoding='utf-8')
result = f.read()
for x in range(500):
    result = result.replace(f"\n{str(x)}.\n", "\nasd--\n")
ggg = result.split("asd--")
print(ggg[1])
f.close()
```
***
> Szöveg formázása, egyszerűsítése json adattározáshoz kártyánként.
```py
import json
f = open("text.txt", "r+", encoding='utf-8')
result = f.read()
f.seek(0)
lines = f.readlines()
f.close()
van = []
for line in lines:
    for asd in range(500):
        if line == f"{str(asd)}.\n":
            van.append(asd)
for n in range(420):
    if n not in van and n != 0 and n < len(van):
        print(n)
for x in range(500):
    result = result.replace(f"\n{str(x)}.\n", "\n------cardBreak------\n")
cardsArray = result.split("\n------cardBreak------\n")
cardsArray.pop(0)
cardIndex = 1
preWriteCardsArray = []
for cardData in cardsArray:
    preWriteCardsArray.append({
        "cardID": cardIndex,
        "cardContent":cardData
    })
    cardIndex+=1
jsonCardsFile = open('cards.json', 'w', encoding='utf-8')
jsonCardsFile.write(json.dumps(preWriteCardsArray, ensure_ascii=False, sort_keys=False, indent = 2))
jsonCardsFile.close()

waaa = open('cards.json', 'r', encoding='utf-8')
cardsJsonArray = json.loads(waaa.read())
print(cardsJsonArray[22]["cardID"])
```
***
> A kapott fájleredmény az alábbi sémára hasonlít:
```json
[
  {
    "cardID": 1,
    "cardContent": "A megadott napon, amikor kezdetét veszi a verseny, Kísértet nevű hajóddal elindulsz Tak városának magas gránitfallal körülvett kikötőjéből, és a Beltenger felé tartasz. Abdulnak, a Mészárosnak Haveldar nevű hajója szép nyugodtan szeli melletted a vizet. Jókora távolságban, keletre fekszik az ellenséges, de gazdag Lagash kikötője; nyugatra a Scythera-sivatag, amelyen keresztül karavánutak vezetnek Kish, Calah és Assur városaiba. Délre van a hegyekben bővelkedő Enraki-sziget. Merre mész? Veszélyes és vakmerő portyára indulsz Lagash felé a partot őrző hajók ellen? Lapozz az 55-re. Elindulsz a Scythera-sivatagba, hogy kifoszd a gazdag nyugati karavánokat? Lapozz a 20-ra. A Beltengeren cirkálsz az Enraki-sziget felé? Lapozz a 76-ra.",
  },
  {
    "cardID": 2,
    "cardContent": "A kerék túl gyors, te pedig túl lassú vagy. Pörgő pengéivel beléd döf; kalandod véres véget ér.",
  },
  {
    "cardID": 3,
    "cardContent": "„Végre az enyém! rikácsolja hiteleződ. Legközelebb ne fogadj olyan pénzbe, amivel nem rendelkezel!” Matrózaival felmegy a hajódra, hogy átvegye jogos nyereményét. Hajó nélkül nem tudod folytatni az utadat. Kalandod itt véget ér.",
  }
] // "cardID": 4,...
```
***
### 2. Funkcionalitás, JS scriptelés
>checkStat(id) függvény:

> A függvénynek egy id bemeneti paramétere van.
> Először eltárolja a localStorage-ban az id-vel megegyező elem értékét, amit a document.getElementById(id).textContent segítségével nyer ki.
> Ezután dynamicVal változóba menti a localStorage-ban található értéket.
> Ha az id értéke "hp", "compnum" vagy "compstren", akkor:
> Az id értékét "/" karakterrel elválasztott részekre bontja (split('/')).
> Kiszámítja a statAmount változóban az arányt (tomb[0] / tomb[1] * 100).
> Az id értékét és az eredeti dynamicVal értéket eltárolja újra a localStorage-ban.
> Egyébként:
> Kiszámítja a statAmount változóban az arányt (dynamicVal / 12 * 100).
> Az id értékét és az eredeti dynamicVal értéket eltárolja újra a localStorage-ban.
> Ha az id értéke nem "diary", "gold" vagy "slaves", akkor:
> Kiválasztja az id + 'Indicator' azonosítójú elemet (pseudoHp).
> Beállítja az elem magasságát a statAmount százalékában.
> calcStats(id, value) függvény:
> 
> A függvénynek két bemeneti paramétere van: id és value.
> Az id értékének függvényben belül végrehajtott ellenőrzésével meghatározza, hogy az id értéke "hp", "compnum" vagy "compstren".
> Ha az id értéke ezek közé tartozik, akkor:
> Lekéri az id értéknek megfelelő értéket a localStorage-ból (localStorage.getItem(id)), és eltárolja az idVal változóban.
> Kiválasztja az id értéknek megfelelő elemet (document.getElementById(id)), és eltárolja az idBox változóban.
> A idVal értékét "/" karakterrel elválasztott részekre bontja (idVal.split('/')), és az első részét és az value változót összeadja (Number(x[0]) + value).
> Ha az eredmény kisebb, mint 0, akkor az idBox tartalmát beállítja "0/x[1]"-re.
> Ha az eredmény nagyobb, mint x[1], akkor az idBox tartalmát beállítja "x[1]/x[1]"-re.
> Egyébként az idBox tartalmát beállítja "calcId/x[1]"-re.
> Végül meghívja a checkStat(id) függvényt.
> Egyébként:
> Lekéri az id értéknek megfelelő értéket a localStorage-ból (localStorage.getItem(id)), és eltárolja az idVal változóban.
> Kiválasztja az id értéknek megfelelő elemet (document.getElementById(id)), és eltárolja az idBox változóban.
> Az idVal értékét és az value változót összeadja (Number(idVal) + value).
> Ha az eredmény kisebb, mint 0, akkor az idBox tartalmát beállítja 0-ra.
> Ha az eredmény nagyobb, mint 12, akkor:
> Ha az id értéke "skill" vagy "luck", akkor az idBox tartalmát beállítja 12-re.
> Egyébként az idBox tartalmát beállítja az eredményre.
> Egyébként az idBox tartalmát beállítja az eredményre.
> Végül meghívja a checkStat(id) függvényt.
> ThrowDice(dsz) függvény:
> 
> A függvénynek egy dsz bemeneti paramétere van.
> Egy ciklusban 1-től dsz-ig iterálva meghívja a randomNum("szamTarolo" + i, "finalNumber" + i) függvényt.
> Végül meghívja a removeClick() függvényt.
> removeClick() függvény:
> 
> Kiválasztja az összes .dice osztályú elemet (var dices = document.querySelectorAll('.dice')).
> Egy ciklusban végigmegy az elemeken, és minden elemről eltávolítja a 'click' eseményfigyelőt (dice.removeEventListener('click', ThrowDice)).
> Az elemeket letiltja (dice.disabled = true).
> diceClickHandler() függvény:
> 
> Kiírja a konzolra a globaldsz változó értékét.
> Meghívja a ThrowDice(globaldsz) függvényt.
> A globaldsz változót 0-ra állítja.
> throwDice(dsz, id, lap, bool, calcId, calcVal) függvény:
> 
> A függvénynek hat bemeneti paramétere van: dsz, id, lap, bool, calcId, calcVal.
> A globaldsz változónak értéket ad a dsz változóból.
> Egy ciklusban 1-től dsz-ig iterálva:
> Kiválasztja a 'dice' + i id-jú elemet (document.getElementById('dice'+i)), és eltávolítja az 'display-none' osztályt (dice.classList.remove('display-none')).
> Hozzáad egy 'click' eseményfigyelőt a dobókockához, és beállítja a diceClickHandler függvényt eseménykezelőként (dice.addEventListener('click', diceClickHandler)).
> Ha az id értéke "hp", "compnum" vagy "compstren":
> Lekéri az id értéknek megfelelő értéket a localStorage-ból (localStorage.getItem(id)), és eltárolja az idVal változóban.
> Az idVal értékét felbontja / karakterek mentén, és eltárolja az x változóban (let x = idVal.split('/')).
> A lap tömb első elemét elosztja a második elemével, majd megszorozza 100-cal, és az eredményt eltárolja a calcId változóban (let calcId = Number(x[0]) + value).
> Ha a calcId kisebb, mint 0, akkor az idBox tartalmát beállítja "0+"/"+x[1]"-re.
> Ha a calcId nagyobb, mint x[1], akkor az idBox tartalmát beállítja "x[1]+"/"+x[1]"-re.
> Egyébként az idBox tartalmát beállítja "calcId+"/"+x[1]"-re.
> Végül meghívja a checkStat(id) függvényt.
> Egyébként:
> Lekéri az id értéknek megfelelő értéket a localStorage-ból (localStorage.getItem(id)), és eltárolja az idVal változóban.
> Kiválasztja az id értéknek megfelelő elemet (document.getElementById(id)), és eltárolja az idBox változóban.
> Az idVal értékét és az value változót összeadja (Number(idVal) + value).
> Ha az eredmény kisebb, mint 0, akkor az idBox tartalmát beállítja 0-ra.
> Ha az eredmény nagyobb, mint 12, akkor:
> Ha az id értéke "skill" vagy "luck", akkor az idBox tartalmát beállítja 12-re.
> Egyébként az idBox tartalmát beállítja az eredményre.
> Egyébként az idBox tartalmát beállítja az eredményre.
> Végül meghívja a checkStat(id) függvényt.
>

```js

```
***

### 3. UI, oldal grafikus megjelenése
> Első UI dizájn, alap elrendezés koncepciós terve:
![](/doc/tervek/ui.png)

```html

```
