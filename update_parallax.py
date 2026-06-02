from bs4 import BeautifulSoup
import sys

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Add ScrollTrigger script to head
head = soup.find('head')
has_scrolltrigger = any("ScrollTrigger" in str(s) for s in head.find_all('script'))
if not has_scrolltrigger:
    st_script = soup.new_tag('script', src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js")
    head.append(st_script)

# Find the script tag at the bottom and replace it
for script in soup.body.find_all("script", recursive=False):
    if not script.has_attr("src") and "gsap.from" in script.string:
        script.decompose()

new_script = soup.new_tag("script")
new_script.string = """
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".premium-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    
    // Hero Entrance Animations
    gsap.from(".hero-title", { 
        y: 100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power4.out", 
        delay: 0.2 
    });
    
    gsap.from(".hero-pfp", { 
        scale: 1.1, 
        opacity: 0, 
        duration: 2, 
        ease: "power2.out" 
    });
    
    gsap.from(".hero-socials a", { 
        x: -20, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.1,
        ease: "power2.out", 
        delay: 1 
    });
    
    gsap.from(".hero-roles p", { 
        x: 20, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.1,
        ease: "power2.out", 
        delay: 1 
    });

    // Parallax Effect for Profile Picture
    gsap.to(".hero-pfp", {
        yPercent: 20, // Moves down slightly as user scrolls down
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-premium",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Fade-in elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-up, .card, .jtl-card, .event-card").forEach(el => {
        gsap.set(el, { y: 50, opacity: 0 }); // Initial state
        observer.observe(el);
    });
});
"""
soup.body.append(new_script)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
