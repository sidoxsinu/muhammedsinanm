import re
from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# We need to find the <script> block at the end of the body that starts with document.addEventListener("DOMContentLoaded"
# and remove all the corrupted junk.

clean_script = """<script>
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fast Entrance Animations
        gsap.from(".premium-nav", { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" });
        gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1 });
        gsap.from(".hero-pfp", { scale: 1.05, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.2 });
        gsap.from(".hero-socials a", { x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.3 });
        gsap.from(".hero-roles p", { x: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.3 });

        gsap.to(".hero-pfp", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-premium",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 3D Coverflow Effect for Carousels
    function updateCarousel3D(viewport) {
        const cards = viewport.querySelectorAll('.jtl-card, .cert-card');
        if (!cards.length) return;
        
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = cardCenter - viewportCenter;
            
            const maxRotation = 35;
            const rotationFactor = distance / (viewport.clientWidth / 1.5);
            let rotateY = rotationFactor * -maxRotation; 
            rotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));
            
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
    });

    document.querySelectorAll('.carousel-nav-btn, .btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });
    });

    const prevBtns = document.querySelectorAll('.carousel-nav-btn.prev');
    const nextBtns = document.querySelectorAll('.carousel-nav-btn.next');

    prevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = btn.closest('.carousel-stage');
            const viewport = container.querySelector('.carousel-viewport');
            if (viewport) viewport.scrollBy({ left: -300, behavior: 'smooth' });
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = btn.closest('.carousel-stage');
            const viewport = container.querySelector('.carousel-viewport');
            if (viewport) viewport.scrollBy({ left: 300, behavior: 'smooth' });
        });
    });
});
</script>"""

# Using regex to replace the entire <script> block containing DOMContentLoaded
new_html = re.sub(r'<script>\s*document\.addEventListener\("DOMContentLoaded".*?</script>', clean_script, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_html)

print("HTML script cleaned up and animations sped up!")
