from bs4 import BeautifulSoup
import sys

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Add the 3D carousel logic inside the DOMContentLoaded block
js_logic = """
    // 3D Coverflow Effect for Carousels
    function updateCarousel3D(viewport) {
        const cards = viewport.querySelectorAll('.jtl-card, .cert-card');
        if (!cards.length) return;
        
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = cardCenter - viewportCenter;
            
            // Calculate rotation based on distance from center
            const maxRotation = 35;
            const rotationFactor = distance / (viewport.clientWidth / 1.5);
            let rotateY = rotationFactor * -maxRotation; 
            rotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));
            
            // Push side items back and scale them down
            const zTranslate = Math.abs(rotationFactor) * -200;
            const scale = Math.max(0.7, 1 - Math.abs(rotationFactor) * 0.2);
            
            card.style.transform = `perspective(1200px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`;
        });
    }

    document.querySelectorAll('.carousel-viewport').forEach(viewport => {
        updateCarousel3D(viewport);
        viewport.addEventListener('scroll', () => {
            requestAnimationFrame(() => updateCarousel3D(viewport));
        });
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => updateCarousel3D(viewport));
        });
    });
"""

for script in soup.body.find_all("script", recursive=False):
    if "DOMContentLoaded" in script.string and "gsap.registerPlugin" in script.string:
        if "updateCarousel3D" not in script.string:
            script.string = script.string.replace("});\n", js_logic + "\n});\n")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
