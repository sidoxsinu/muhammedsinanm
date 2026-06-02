import re
from bs4 import BeautifulSoup

# 1. Update HTML
with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

fan_section = soup.find("section", id="fan-carousel")
if fan_section:
    # Build new structure
    # <div class="carousel-container" id="cert-carousel">
    #   <div class="carousel-stage">
    #     <div class="carousel-viewport concave-viewport" id="cert-viewport">
    #       <div class="carousel-track" id="cert-track">
    
    container = soup.new_tag("div", class_="carousel-container")
    container['id'] = "cert-carousel"
    container['style'] = "padding: 50px 0; overflow: hidden;"
    
    stage = soup.new_tag("div", class_="carousel-stage")
    viewport = soup.new_tag("div", class_="carousel-viewport concave-viewport", id="cert-viewport")
    track = soup.new_tag("div", class_="carousel-track", id="cert-track")
    track['style'] = "align-items: center;"
    
    for old_card in fan_section.find_all("div", class_="fan-card"):
        card = soup.new_tag("div", class_="cert-card")
        card['onclick'] = old_card.get('onclick', '')
        
        inner = soup.new_tag("div", class_="cert-card-inner")
        img = old_card.find("img")
        if img:
            new_img = soup.new_tag("img", src=img['src'], alt=img.get('alt', ''))
            inner.append(new_img)
            
        footer = soup.new_tag("div", class_="cert-card-footer")
        old_num = old_card.find("span", class_="fan-card-num")
        old_name = old_card.find("span", class_="fan-card-name")
        
        new_num = soup.new_tag("span", class_="cert-card-num")
        new_num.string = old_num.string if old_num else ""
        
        new_name = soup.new_tag("span", class_="cert-card-name")
        new_name.string = old_name.string if old_name else ""
        
        footer.append(new_num)
        footer.append(soup.new_tag("br"))
        footer.append(new_name)
        
        card.append(inner)
        card.append(footer)
        track.append(card)
        
    viewport.append(track)
    stage.append(viewport)
    container.append(stage)
    
    # Replace the old fanStage with this new container
    old_stage = fan_section.find(id="fanStage")
    if old_stage:
        old_stage.replace_with(container)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))


# 2. Update JS in index.html to include concave logic
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

concave_js = """
    function updateConcaveCarousel3D(viewport) {
        const cards = viewport.querySelectorAll('.cert-card');
        if (!cards.length) return;
        
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = cardCenter - viewportCenter;
            
            const maxRotation = 45;
            const rotationFactor = distance / (viewport.clientWidth / 2);
            let rotateY = rotationFactor * -maxRotation; 
            rotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));
            
            // Concave effect: edges are larger and closer
            const scale = 1 + Math.abs(rotationFactor) * 0.25;
            const zTranslate = Math.abs(rotationFactor) * 100;
            
            card.style.transform = `perspective(1200px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`;
        });
    }

    document.querySelectorAll('.concave-viewport').forEach(viewport => {
        updateConcaveCarousel3D(viewport);
        viewport.addEventListener('scroll', () => {
            requestAnimationFrame(() => updateConcaveCarousel3D(viewport));
        });
    });
"""

# Insert JS before "// 3D Coverflow Effect for Carousels"
if "function updateConcaveCarousel3D" not in html:
    html = html.replace("// 3D Coverflow Effect for Carousels", concave_js + "\n    // 3D Coverflow Effect for Carousels")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
