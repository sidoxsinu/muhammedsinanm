from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

for script in soup.find_all("script"):
    if not script.has_attr("src"):
        script.decompose()

new_script = soup.new_tag("script")
new_script.string = """
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger if we decide to use it via CDN, but for now we just use GSAP basic
    
    gsap.from(".premium-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    
    // Hero Animations
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

    // Fade-in elements on scroll using IntersectionObserver
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

    document.querySelectorAll(".fade-in-up, .card, .jtl-card").forEach(el => {
        gsap.set(el, { y: 50, opacity: 0 }); // Initial state
        observer.observe(el);
    });
});
"""
soup.body.append(new_script)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
