from bs4 import BeautifulSoup
import re

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Remove inline styles
for style in soup.find_all("style"):
    style.decompose()

# Update Projects to look like Image 2 split cards
projects_section = soup.find(id="projects")
if projects_section:
    projects_list = projects_section.find(class_="projects")
    if projects_list:
        for card in projects_list.find_all(class_="card"):
            card['class'] = card.get('class', []) + ['split-card']
            
            # Wrap content in left side
            content_div = soup.new_tag("div")
            content_div['class'] = "split-card-content"
            
            for child in list(card.children):
                content_div.append(child)
            
            card.append(content_div)
            
            # Add right side placeholder for image (or actual image if exists)
            image_div = soup.new_tag("div")
            image_div['class'] = "split-card-image"
            
            # Fake an image from the placeholder (since there was no img, we put a dark box with text)
            # The user might add their own later, or we can use a cool pattern
            img = soup.new_tag("div")
            img['class'] = "placeholder-img"
            image_div.append(img)
            
            card.append(image_div)

# Change About me to look like the large typography in Image 1
about_section = soup.find(id="about")
if about_section:
    desc = about_section.find(class_="section-desc")
    if desc:
        desc['class'] = "large-intro-text"
        # highlight some words to match the red text in Image 1
        text = desc.string
        if text:
            words = text.split()
            if len(words) > 5:
                desc.clear()
                for i, w in enumerate(words):
                    if i in [3, 4, 7, 8]:
                        span = soup.new_tag("span")
                        span['class'] = "highlight-text"
                        span.string = w + " "
                        desc.append(span)
                    else:
                        desc.append(w + " ")

# Ensure buttons have span wrapper and are not hidden
for btn in soup.find_all("button", class_="carousel-nav-btn"):
    if not btn.find("span"):
        text = btn.string
        if text:
            btn.string = ""
            span = soup.new_tag("span")
            span.string = text
            btn.append(span)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
