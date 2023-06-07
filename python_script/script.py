import docx2txt
result = docx2txt.process("asd.docx")
f = open("text.txt", "r+", encoding='utf-8')
for n in range(40):
    result = result.replace("\n\n","\n")
print(result)
f.write(result)
f.close()
