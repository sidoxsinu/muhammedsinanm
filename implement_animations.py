from bs4 import BeautifulSoup

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# 1. GSAP ScrollTrigger check
head = soup.find("head")
has_st = False
for script in head.find_all("script"):
    if "ScrollTrigger" in script.get("src", ""):
        has_st = True
if not has_st:
    st_script = soup.new_tag("script", src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js")
    head.append(st_script)

# 2. Add Animations JS and Cursor HTML to body
body = soup.find("body")
if not body.find(id="cursorDot"):
    dot = soup.new_tag("div", id="cursorDot", **{'class': "cursor-dot"})
    ring = soup.new_tag("div", id="cursorRing", **{'class': "cursor-ring"})
    body.append(dot)
    body.append(ring)

if not body.find("script", src="animations.js"):
    anim_script = soup.new_tag("script", src="animations.js", defer=True)
    body.append(anim_script)

# 3. Add Reveal classes
for h in soup.find_all(["h2", "h3"]):
    h['class'] = h.get('class', []) + ['reveal-text']

for block in soup.find_all("p") + soup.find_all("div", class_="card") + soup.find_all("div", class_="event-item"):
    # Avoid adding to already styled specific small elements if needed, but safe to add generally
    if block.name == "p" and "quote-text" in block.get('class', []): continue
    block['class'] = block.get('class', []) + ['reveal-block']

for lst in soup.find_all("ul", class_=["cert-list", "language-list"]):
    lst['class'] = lst.get('class', []) + ['reveal-stagger']

# 4. Stats counter class
for stat in soup.find_all("span", class_="stat-number"):
    stat['class'] = stat.get('class', []) + ['count-up']

# 5. Transform Certificates Carousel to Fan Carousel
cert_section = soup.find(id="certifications")
if cert_section:
    old_carousel = cert_section.find(id="cert-carousel")
    if old_carousel:
        # Extract existing certs
        certs = old_carousel.find_all("a", class_="cert-card")
        
        # Build new Fan HTML
        fan_section = soup.new_tag("section", id="fan-carousel", **{'class': "fan-carousel-section"})
        header = soup.new_tag("div", **{'class': "fan-carousel-header"})
        
        # Find existing label / h3 to use as header
        existing_h3 = cert_section.find("h3", text="Certifications Gallery")
        if existing_h3:
            existing_h3.extract()
            # If it had a label, extract it too
            prev_label = cert_section.find("span", class_="section-label", text="// Certifications")
            if prev_label:
                prev_label.extract()
                prev_label['class'] = "fan-label"
                header.append(prev_label)
        
        title = soup.new_tag("h2", **{'class': "fan-title"})
        title.append("What I've ")
        em = soup.new_tag("em")
        em.string = "Earned"
        title.append(em)
        
        sub = soup.new_tag("p", **{'class': "fan-subtitle"})
        sub.string = "Scroll or drag to explore certificates and recognitions."
        
        header.append(title)
        header.append(sub)
        fan_section.append(header)
        
        stage = soup.new_tag("div", id="fanStage", **{'class': "fan-stage"})
        track = soup.new_tag("div", id="fanTrack", **{'class': "fan-track"})
        
        for idx, cert in enumerate(certs):
            img = cert.find("img")
            if not img: continue
            
            card = soup.new_tag("div", **{'class': "fan-card", "data-index": str(idx)})
            inner = soup.new_tag("div", **{'class': "fan-card-inner"})
            
            # Keep original link wrapper for functionality, or put it inside
            new_img = soup.new_tag("img", src=img.get('src'), alt=img.get('alt', f'Certificate {idx}'), loading="lazy")
            
            overlay = soup.new_tag("div", **{'class': "fan-card-overlay"})
            footer = soup.new_tag("div", **{'class': "fan-card-footer"})
            
            num = soup.new_tag("span", **{'class': "fan-card-num"})
            num.string = f"#{str(idx+1).zfill(2)}"
            
            name = soup.new_tag("span", **{'class': "fan-card-name"})
            # Extract name from href or just use a generic name
            # Example href: images/certificates/IE-HK-26-2027.pdf
            href = cert.get('href', '')
            cert_name = href.split('/')[-1].replace('.pdf', '').replace('.jpg', '').replace('.jpeg', '').replace('%20', ' ')
            if not cert_name: cert_name = "Certificate"
            name.string = cert_name
            
            footer.append(num)
            footer.append(name)
            
            inner.append(new_img)
            inner.append(overlay)
            inner.append(footer)
            card.append(inner)
            
            # Add click handler or wrap in a tag so it still opens the cert
            a_tag = soup.new_tag("a", href=href, target="_blank", style="display:block; width:100%; height:100%; text-decoration:none;")
            a_tag.append(card)
            
            track.append(a_tag)
            # Actually, to match the exact CSS structure, .fan-card shouldn't be wrapped in <a> otherwise the CSS selectors > break.
            # Let's add onclick to .fan-card
            card['onclick'] = f"window.open('{href}', '_blank')"
            track.append(card)
            a_tag.decompose()
            
        dots = soup.new_tag("div", id="fanDots", **{'class': "fan-dots"})
        hint = soup.new_tag("p", **{'class': "fan-drag-hint"})
        hint.string = "← Drag to explore →"
        
        stage.append(track)
        stage.append(dots)
        stage.append(hint)
        fan_section.append(stage)
        
        old_carousel.replace_with(fan_section)

# 6. Hero Classes
hero_name = soup.find(class_="hero-title")
if hero_name: hero_name['class'] = hero_name.get('class', []) + ['hero-name']
hero_pfp = soup.find(class_="hero-pfp")
if hero_pfp: hero_pfp['class'] = hero_pfp.get('class', []) + ['hero-portrait']
hero_roles = soup.find(class_="hero-roles")
if hero_roles: hero_roles['class'] = hero_roles.get('class', []) + ['hero-subtitle']

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
