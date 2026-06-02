from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

js_logic = """
    // Button Ripple Effect
    document.querySelectorAll('.carousel-nav-btn, .btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
        });
    });

    // Carousel Navigation
    const prevBtns = document.querySelectorAll('.carousel-nav-btn.prev');
    const nextBtns = document.querySelectorAll('.carousel-nav-btn.next');

    prevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = btn.closest('.carousel-stage');
            const viewport = container.querySelector('.carousel-viewport');
            viewport.scrollBy({ left: -300, behavior: 'smooth' });
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = btn.closest('.carousel-stage');
            const viewport = container.querySelector('.carousel-viewport');
            viewport.scrollBy({ left: 300, behavior: 'smooth' });
        });
    });
"""

for script in soup.body.find_all("script", recursive=False):
    if "DOMContentLoaded" in script.string and "updateCarousel3D" in script.string:
        if "Button Ripple Effect" not in script.string:
            script.string = script.string.replace("});\n", js_logic + "\n});\n")

# Ensure buttons have span wrappers for z-index
for btn in soup.find_all("button", class_="carousel-nav-btn"):
    if not btn.find("span"):
        text = btn.string
        btn.string = ""
        span = soup.new_tag("span")
        span.string = text
        btn.append(span)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
