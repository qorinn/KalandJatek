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

waaa = open('../json/cards.json', 'r', encoding='utf-8')
cardsJsonArray = json.loads(waaa.read())
print(cardsJsonArray[22]["cardID"])


