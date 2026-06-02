from bs4 import BeautifulSoup
import re

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

print("Parsed HTML")
