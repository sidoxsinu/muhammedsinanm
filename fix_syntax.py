with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the broken line
old_broken_line = 'gsap.from(".premium-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" \n    // 3D Coverflow Effect for Carousels'
new_fixed_line = '/* nav entrance disabled for invert */\n    // 3D Coverflow Effect for Carousels'

if old_broken_line in content:
    content = content.replace(old_broken_line, new_fixed_line)
else:
    # Let's try regex if whitespace is slightly different
    import re
    content = re.sub(r'gsap\.from\("\.premium-nav", \{ y: -50, opacity: 0, duration: 1, ease: "power3\.out" \s*// 3D Coverflow Effect for Carousels', new_fixed_line, content)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
