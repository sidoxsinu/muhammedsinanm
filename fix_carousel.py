"""
Updates the certificate carousel with correctly scanned names.
"""

import re

CERT_DATA = [
    ("images/certs/thumb_IE-HK-26-2027.jpg",                            "images/certificates/IE-HK-26-2027.pdf",                             "#01", "IEDC District Hackathon"),
    ("images/certs/thumb_MUHAMMED SINAN M.jpg",                         "images/certificates/MUHAMMED SINAN M.pdf",                          "#02", "AI Cyber Security Workshop"),
    ("images/certs/thumb_Muhammed Sinan M 2.jpg",                       "images/certificates/Muhammed Sinan M 2.pdf",                        "#03", "Agentic AI Boot Camp"),
    ("images/certs/thumb_Muhammed Sinan M-Certificate.jpg",             "images/certificates/Muhammed Sinan M-Certificate.pdf",              "#04", "YIP 8.0 VOS Training"),
    ("images/certs/thumb_Muhammed Sinan M_certificate.jpg",             "images/certificates/Muhammed Sinan M_certificate.pdf",              "#05", "HackQuest '25"),
    ("images/certs/thumb_Muhammed Sinan_HackBattle_certificate.jpg",    "images/certificates/Muhammed Sinan_HackBattle_certificate.pdf",     "#06", "HackBattle VIT"),
    ("images/certs/thumb_Muhammed_Sinan_M_Spectrum_iv__1764229988.jpg", "images/certificates/Muhammed_Sinan_M_Spectrum_iv__1764229988.pdf", "#07", "Spectrum Softtech IV"),
    ("images/certs/thumb_YESS25_Certificate_YESS25AHNzclof.jpg",        "images/certificates/YESS25_Certificate_YESS25AHNzclof.pdf",         "#08", "IEEE YESS'25"),
    ("images/certs/thumb_YIP_Certificate_Muhammed Sinan M_1161163.jpg", "images/certificates/YIP_Certificate_Muhammed Sinan M_1161163.pdf", "#09", "YIP 8.0 Idea Submission"),
    ("images/certificates/PHOTO-2025-11-02-22-12-45.jpg",               "images/certificates/PHOTO-2025-11-02-22-12-45.jpg",                 "#10", "CSI Webathon 2nd Prize"),
    ("images/certificates/PHOTO-2025-11-02-22-13-55.jpg",               "images/certificates/PHOTO-2025-11-02-22-13-55.jpg",                 "#11", "Unity Unleashed Workshop"),
    ("images/certificates/PHOTO-2025-11-02-22-14-08.jpg",               "images/certificates/PHOTO-2025-11-02-22-14-08.jpg",                 "#12", "EVOLV 2.0 Bootcamp"),
    ("images/certificates/PHOTO-2025-11-02-22-14-55.jpg",               "images/certificates/PHOTO-2025-11-02-22-14-55.jpg",                 "#13", "FOSS Relay Coding"),
    ("images/certificates/PHOTO-2025-11-02-22-15-12.jpg",               "images/certificates/PHOTO-2025-11-02-22-15-12.jpg",                 "#14", "Code a Pookalam"),
    ("images/certificates/PHOTO-2025-12-02-19-56-54.jpg",               "images/certificates/PHOTO-2025-12-02-19-56-54.jpg",                 "#15", "CSI Webathon Participant"),
    ("images/certificates/PHOTO-2026-02-17-20-59-17.jpg",               "images/certificates/PHOTO-2026-02-17-20-59-17.jpg",                 "#16", "TECHLETICS 4.0 Quake Clash"),
    ("images/certificates/PHOTO-2026-03-13-22-21-42.jpg",               "images/certificates/PHOTO-2026-03-13-22-21-42.jpg",                 "#17", "JUMPSTART 8.0 Bootcamp"),
]

def make_card(thumb, link, num, name):
    return (
        f'<div class="cert-card" onclick="window.open(\'{link}\', \'_blank\')" role="button" tabindex="0">'
        f'<div class="cert-card-inner"><img src="{thumb}" alt="{name}" loading="lazy"/></div>'
        f'<div class="cert-card-footer"><span class="cert-card-num">{num}</span><span class="cert-card-name">{name}</span></div>'
        f'</div>'
    )

cards_html = "".join(make_card(*c) for c in CERT_DATA)

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace just the contents of the track
html = re.sub(
    r'<div class="cert-track" id="cert-track">.*?</div>\s*</div>\s*</div>\s*</section>',
    f'<div class="cert-track" id="cert-track">{cards_html}</div></div></div></section>',
    html,
    flags=re.DOTALL
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done! Scanned and renamed all certificates.")
