from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

projects_section = soup.find(id="projects")
if projects_section:
    cards = projects_section.find_all("div", class_="split-card")
    for idx, card in enumerate(cards):
        img_container = card.find("div", class_="split-card-image")
        if img_container:
            # Clear placeholder
            img_container.clear()
            
            # Create a stylized number and title for the empty space
            number_div = soup.new_tag("div")
            number_div['class'] = "project-number-fill"
            number_div.string = f"( 2024 )"
            
            large_text = soup.new_tag("div")
            large_text['class'] = "project-acronym-fill"
            
            # Find the title to make an acronym or just use the first letter
            header = card.find(["h4", "h3"])
            title = header.get_text() if header else f"P{idx+1}"
            words = title.split()
            acronym = words[0][:2].upper() if words else "PR"
            
            large_text.string = acronym
            
            img_container.append(number_div)
            img_container.append(large_text)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
