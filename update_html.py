from bs4 import BeautifulSoup
import sys

with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Update <head>
head = soup.find('head')
if head:
    # Remove old fonts and three.js
    for link in head.find_all('link', href=True):
        if 'fonts.googleapis.com' in link['href'] or 'fonts.gstatic.com' in link['href']:
            link.decompose()
    for script in head.find_all('script'):
        if 'three.js' in script.get('src', ''):
            script.decompose()

    # Add new fonts and GSAP
    font_link = soup.new_tag('link', href="https://api.fontshare.com/v2/css?f[]=general-sans@500&f[]=space-grotesk@300,400,1&display=swap", rel="stylesheet")
    gsap_script = soup.new_tag('script', src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js")
    
    head.append(font_link)
    head.append(gsap_script)

# Update Nav
nav = soup.find('nav')
if nav:
    new_nav_html = """
    <nav class="premium-nav">
        <div class="nav-left">© Muhammed Sinan M</div>
        <div class="nav-center">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
        </div>
        <div class="nav-right">
            <a href="#contact">Contact</a>
        </div>
    </nav>
    """
    new_nav = BeautifulSoup(new_nav_html, "html.parser").nav
    nav.replace_with(new_nav)

# Update Hero
hero = soup.find('section', class_='hero')
if hero:
    new_hero_html = """
    <section class="hero-premium">
        <div class="hero-socials">
            <a href="#" class="social-icon">𝕏</a>
            <a href="#" class="social-icon">in</a>
            <a href="#" class="social-icon">IG</a>
        </div>
        <div class="hero-roles">
            <p>Computer Science Student</p>
            <p>Full-Stack Developer</p>
        </div>
        <div class="hero-content">
            <img class="hero-pfp" src="images/profile-picture/bg-removed-black&white-pfp.png" alt="Profile">
            <h1 class="hero-title">Muhammed<br>Sinan M</h1>
        </div>
    </section>
    """
    new_hero = BeautifulSoup(new_hero_html, "html.parser").section
    hero.replace_with(new_hero)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
