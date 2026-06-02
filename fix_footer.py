from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

footer = soup.find("footer")
if footer:
    footer['class'] = "site-footer"
    
    first_div = footer.find("div")
    if first_div and first_div.has_attr("style"):
        # Remove the conflicting inline background and adjust padding
        style = first_div['style']
        style = style.replace("background: var(--footer-bg, #001F3F);", "background: #0a0a0a; border-top: 1px solid rgba(255,255,255,0.05);")
        first_div['style'] = style

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
