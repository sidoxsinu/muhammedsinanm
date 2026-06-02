"""
Fully replaces the broken fan-carousel-section with a clean, properly-classed
3D concave carousel matching the reference design.
"""

import re

CERT_DATA = [
    ("images/certs/thumb_IE-HK-26-2027.jpg",                            "images/certificates/IE-HK-26-2027.pdf",                             "#01", "IEEE HK Section"),
    ("images/certs/thumb_MUHAMMED SINAN M.jpg",                         "images/certificates/MUHAMMED SINAN M.pdf",                          "#02", "Google Dev Cert"),
    ("images/certs/thumb_Muhammed Sinan M 2.jpg",                       "images/certificates/Muhammed Sinan M 2.pdf",                        "#03", "Dev Certificate"),
    ("images/certs/thumb_Muhammed Sinan M-Certificate.jpg",             "images/certificates/Muhammed Sinan M-Certificate.pdf",              "#04", "Achievement Cert"),
    ("images/certs/thumb_Muhammed Sinan M_certificate.jpg",             "images/certificates/Muhammed Sinan M_certificate.pdf",              "#05", "Merit Certificate"),
    ("images/certs/thumb_Muhammed Sinan_HackBattle_certificate.jpg",    "images/certificates/Muhammed Sinan_HackBattle_certificate.pdf",     "#06", "HackBattle Winner"),
    ("images/certs/thumb_Muhammed_Sinan_M_Spectrum_iv__1764229988.jpg", "images/certificates/Muhammed_Sinan_M_Spectrum_iv__1764229988.pdf", "#07", "Spectrum IV"),
    ("images/certs/thumb_YESS25_Certificate_YESS25AHNzclof.jpg",        "images/certificates/YESS25_Certificate_YESS25AHNzclof.pdf",         "#08", "YESS 2025"),
    ("images/certs/thumb_YIP_Certificate_Muhammed Sinan M_1161163.jpg", "images/certificates/YIP_Certificate_Muhammed Sinan M_1161163.pdf", "#09", "YIP Certificate"),
    ("images/certificates/PHOTO-2025-11-02-22-12-45.jpg",               "images/certificates/PHOTO-2025-11-02-22-12-45.jpg",                 "#10", "Achievement"),
    ("images/certificates/PHOTO-2025-11-02-22-13-55.jpg",               "images/certificates/PHOTO-2025-11-02-22-13-55.jpg",                 "#11", "Achievement"),
    ("images/certificates/PHOTO-2025-11-02-22-14-08.jpg",               "images/certificates/PHOTO-2025-11-02-22-14-08.jpg",                 "#12", "Achievement"),
    ("images/certificates/PHOTO-2025-11-02-22-14-55.jpg",               "images/certificates/PHOTO-2025-11-02-22-14-55.jpg",                 "#13", "Achievement"),
    ("images/certificates/PHOTO-2025-11-02-22-15-12.jpg",               "images/certificates/PHOTO-2025-11-02-22-15-12.jpg",                 "#14", "Achievement"),
    ("images/certificates/PHOTO-2025-12-02-19-56-54.jpg",               "images/certificates/PHOTO-2025-12-02-19-56-54.jpg",                 "#15", "Achievement"),
    ("images/certificates/PHOTO-2026-02-17-20-59-17.jpg",               "images/certificates/PHOTO-2026-02-17-20-59-17.jpg",                 "#16", "Achievement"),
    ("images/certificates/PHOTO-2026-03-13-22-21-42.jpg",               "images/certificates/PHOTO-2026-03-13-22-21-42.jpg",                 "#17", "Achievement"),
]

def make_card(thumb, link, num, name):
    return (
        f'<div class="cert-card" onclick="window.open(\'{link}\', \'_blank\')" role="button" tabindex="0">'
        f'<div class="cert-card-inner"><img src="{thumb}" alt="{name}" loading="lazy"/></div>'
        f'<div class="cert-card-footer"><span class="cert-card-num">{num}</span><span class="cert-card-name">{name}</span></div>'
        f'</div>'
    )

cards_html = "\n".join(make_card(*c) for c in CERT_DATA)

new_section = f"""<section class="cert-carousel-section" id="fan-carousel">
  <div class="cert-carousel-header">
    <span class="fan-label">// Certifications</span>
    <h2 class="fan-title">What I've <em>Earned</em></h2>
    <p class="fan-subtitle">Scroll or drag to explore certificates and recognitions.</p>
  </div>
  <div class="cert-carousel-stage">
    <div class="cert-viewport" id="cert-viewport">
      <div class="cert-track" id="cert-track">
{cards_html}
      </div>
    </div>
  </div>
</section>"""

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace the entire broken fan-carousel section
html = re.sub(
    r'<section class="fan-carousel-section" id="fan-carousel">.*?</section>',
    new_section,
    html,
    flags=re.DOTALL
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done! Carousel replaced successfully.")
