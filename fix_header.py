with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Remove the GSAP animation for .premium-nav to fix mix-blend-mode stacking context issue
content = content.replace('gsap.from(".premium-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });', '')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
