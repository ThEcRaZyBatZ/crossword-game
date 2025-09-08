with open("temp.txt","w") as file:
  for i in range(16):
    for j in range(16):
      index_i=str(i) if i>9 else "0"+str(i)
      index_j=str(j) if j>9 else "0"+str(j)
      file.write(f'<button id="{index_i}{index_j}">1</button>')
    file.write("<br>")