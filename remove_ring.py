from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

ring = soup.find(id="cursorRing")
if ring:
    ring.decompose()

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
