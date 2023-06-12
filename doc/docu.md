
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
### 2. Funkcionalitás, JS scriptelés
```js

```
