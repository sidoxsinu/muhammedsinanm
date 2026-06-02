from bs4 import BeautifulSoup
import re

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# 1. Section Labels
sections = {
    "about": "About",
    "journey": "Journey",
    "education": "Education",
    "projects": "Projects",
    "achievements": "Achievements",
    "experience": "Experience",
    "skills": "Skills",
    "clubs": "Clubs",
    "hackathons": "Hackathons",
    "certifications": "Certifications"
}
for sec_id, label_text in sections.items():
    sec = soup.find(id=sec_id)
    if sec:
        h3 = sec.find("h3")
        if h3 and not h3.find_previous_sibling("span", class_="section-label"):
            label = soup.new_tag("span")
            label['class'] = "section-label"
            label.string = f"// {label_text}"
            h3.insert_before(label)

# 2. Refactor Hackathons/Clubs event-cards to event-items inside event-content
for content in soup.find_all("div", class_="event-content"):
    for card in content.find_all("div", class_="event-card"):
        card['class'] = "event-list-item" # not event-item as parent uses event-item
        
        header = card.find("div", class_="event-header")
        if header:
            h4 = header.find("h4")
            if h4:
                h4['class'] = "event-name"
            
            badge = header.find("span", class_="badge")
            if badge:
                badge.name = "span"
                badge['class'] = "event-result"
                
                # Move h4 and badge to the event-list-item root
                card.insert(0, badge)
                card.insert(0, h4)
                
            header.decompose()
        
        # Remove meta, desc, team to make it clean as requested, or hide them
        meta = card.find("div", class_="event-meta")
        if meta: meta.decompose()
        desc = card.find("p", class_="event-desc")
        if desc: desc.decompose()
        team = card.find("div", class_="event-team")
        if team: team.decompose()

# 3. Certifications and Languages Grid Wrapper
certs_section = soup.find(id="certifications")
if certs_section:
    inner = certs_section.find("div", class_="section-inner")
    if inner:
        grid = inner.find("div", style=re.compile("display: grid"))
        if grid:
            grid['class'] = "certs-languages-wrapper"
            grid['style'] = "" # remove inline styles
            
            # Find the cert-list
            for lst in grid.find_all("div", class_="cert-list"):
                ul = soup.new_tag("ul")
                if "Certifications" in lst.find_previous_sibling("h3").string:
                    ul['class'] = "cert-list"
                else:
                    ul['class'] = "language-list"
                
                for p in lst.find_all("p"):
                    li = soup.new_tag("li")
                    li.string = p.string
                    ul.append(li)
                lst.replace_with(ul)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
