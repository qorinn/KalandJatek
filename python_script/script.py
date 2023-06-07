
f = open("text.txt", "r+", encoding='utf-8')
result = f.read()
for x in range(500):
    result = result.replace(f"\n{str(x)}.\n", "\nasd--\n")
ggg = result.split("asd--")
print(ggg[1])
f.close()
