#!/usr/bin/env python3
"""Generate favicons, 1200x630 share cards, sitemap, robots.txt, and llms files.

Descriptive copy is limited to the supported Continuia lines. Page body HTML
is not rewritten here.
"""

import json
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
OG_DIR = os.path.join(SRC, "og")
FONT_DIR = "/tmp/fonts"
SERIF = os.path.join(FONT_DIR, "SourceSerif4-Semibold.ttf")
SANS = "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"
SANS_MED = "/usr/share/fonts/truetype/macos/Inter-Medium.ttf"
SANS_REG = "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"

LINE_A = (
    "AI organizes, matches, and drafts but never diagnoses on its own, "
    "and a licensed, board-certified physician reviews every AI-assisted opinion."
)
LINE_B = (
    "A documented specialist second opinion at the point of care, "
    "with no formal referral, and consults logged as they happen."
)
LINE_C = "Contact sales@continuia.ai."
SENT_A = "AI organizes, matches, and drafts but never diagnoses on its own."
SENT_B = "A licensed, board-certified physician reviews every AI-assisted opinion."

# file, title, description, canonical path, image, alt, robots, indexable,
# eyebrow, headline, sub, llms anchor, llms label, changefreq, priority
PAGES = [
    (
        "index.html",
        "Continuia | Second Opinions and Clinical Governance",
        "Visit the Continuia homepage. A documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/",
        "home.png",
        "Continuia share card. A documented specialist second opinion at the point of care, with no formal referral.",
        "index, follow",
        True,
        "Continuia",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "home",
        "Home",
        "weekly",
        "1.0",
    ),
    (
        "insights.html",
        "Continuia Insights | Specialist Second Opinions",
        "The Continuia Insights page. A documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/insights.html",
        "insights.png",
        "Continuia Insights share card. A documented specialist second opinion at the point of care.",
        "index, follow",
        True,
        "Continuia Insights",
        "A documented specialist second opinion at the point of care",
        "AI organizes, matches, and drafts. It never diagnoses on its own.",
        "insights",
        "Continuia Insights",
        "weekly",
        "0.9",
    ),
    (
        "governance.html",
        "Continuia Governance for Point of Care Decisions",
        "The Continuia Governance page. A documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/governance.html",
        "governance.png",
        "Continuia Governance share card. Consults are logged as they happen, with no formal referral.",
        "index, follow",
        True,
        "Continuia Governance",
        "Consults logged as they happen, with no formal referral",
        "A documented specialist second opinion at the point of care.",
        "governance",
        "Continuia Governance",
        "weekly",
        "0.9",
    ),
    (
        "products.html",
        "Continuia Products | Second Opinions and Governance",
        "Continuia products: AI organizes, matches, and drafts but never diagnoses on its own. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/products.html",
        "products.png",
        "Continuia products share card. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "index, follow",
        True,
        "Products",
        "A licensed, board-certified physician reviews every AI-assisted opinion",
        "AI organizes, matches, and drafts but never diagnoses on its own.",
        "products",
        "Products",
        "weekly",
        "0.8",
    ),
    (
        "about.html",
        "About Continuia | How AI-Assisted Opinions Are Reviewed",
        "About Continuia: AI organizes, matches, and drafts but never diagnoses on its own. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/about.html",
        "about.png",
        "About Continuia share card. AI organizes, matches, and drafts but never diagnoses on its own.",
        "index, follow",
        True,
        "About",
        "AI organizes, matches, and drafts but never diagnoses on its own",
        "A licensed, board-certified physician reviews every AI-assisted opinion.",
        "about",
        "About",
        "monthly",
        "0.7",
    ),
    (
        "partners.html",
        "Continuia Partners for Hospitals, Plans, and Clinics",
        "The Continuia partner pages: a documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/partners.html",
        "partners.png",
        "Continuia partners share card. A documented specialist second opinion at the point of care.",
        "index, follow",
        True,
        "Partners",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "partners",
        "Partners",
        "monthly",
        "0.8",
    ),
    (
        "partners/hospitals.html",
        "Continuia for Hospitals | Second Opinions at Care",
        "Continuia for hospital teams: a documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/partners/hospitals.html",
        "hospitals.png",
        "Continuia for hospitals share card. A documented specialist second opinion at the point of care.",
        "index, follow",
        True,
        "Hospitals",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "hospitals",
        "Hospitals",
        "monthly",
        "0.7",
    ),
    (
        "partners/nursing-and-living.html",
        "Continuia for Skilled Nursing and Assisted Living",
        "For skilled nursing and assisted living: a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/partners/nursing-and-living.html",
        "nursing.png",
        "Continuia for skilled nursing share card. Contact sales@continuia.ai.",
        "index, follow",
        True,
        "Skilled nursing",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Contact sales@continuia.ai.",
        "nursing",
        "Skilled nursing and assisted living",
        "monthly",
        "0.7",
    ),
    (
        "partners/doctors-and-specialists.html",
        "Continuia Partners | Support for Doctors and Specialists",
        "Continuia for doctors and specialists: a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/partners/doctors-and-specialists.html",
        "doctors-partners.png",
        "Continuia for doctors share card. A documented specialist second opinion with no formal referral.",
        "index, follow",
        True,
        "Doctors and specialists",
        "A documented specialist second opinion with no formal referral",
        "Consults are logged as they happen. Contact sales@continuia.ai.",
        "doctors-partners",
        "Doctors and specialists",
        "monthly",
        "0.7",
    ),
    (
        "partners/clinics-diagnostics.html",
        "Continuia for Clinics and Diagnostic Centers",
        "Continuia for clinics and diagnostic centers: a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/partners/clinics-diagnostics.html",
        "clinics.png",
        "Continuia for clinics share card. A documented specialist second opinion at the point of care.",
        "index, follow",
        True,
        "Clinics",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Contact sales@continuia.ai.",
        "clinics",
        "Clinics and diagnostic centers",
        "monthly",
        "0.7",
    ),
    (
        "partners/health-plans-tpas.html",
        "Continuia for Health Plans and Administrators",
        "Continuia for health plan teams: a documented specialist second opinion at the point of care, with no formal referral. Consults are logged as they happen.",
        "https://continuia.ai/partners/health-plans-tpas.html",
        "health-plans.png",
        "Continuia for health plans share card. Consults are logged as they happen.",
        "index, follow",
        True,
        "Health plans",
        "Consults are logged as they happen, with no formal referral",
        "A documented specialist second opinion at the point of care.",
        "health-plans",
        "Health plans",
        "monthly",
        "0.7",
    ),
    (
        "partners/benefit-consultants.html",
        "Continuia for Benefit Consultants and Wellness Plans",
        "Continuia for benefit consultant groups: a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/partners/benefit-consultants.html",
        "benefits.png",
        "Continuia for benefit consultants share card. Contact sales@continuia.ai.",
        "index, follow",
        True,
        "Benefit consultants",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Contact sales@continuia.ai.",
        "benefits",
        "Benefit consultants",
        "monthly",
        "0.7",
    ),
    (
        "partners/advocacy-ngos.html",
        "Continuia for Patient Advocacy Groups and NGOs",
        "Continuia for advocacy groups and NGOs: a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/partners/advocacy-ngos.html",
        "advocacy.png",
        "Continuia for advocacy groups share card. A documented specialist second opinion with no formal referral.",
        "index, follow",
        True,
        "Advocacy and NGOs",
        "A documented specialist second opinion with no formal referral",
        "Consults are logged as they happen. Contact sales@continuia.ai.",
        "advocacy",
        "Advocacy groups and NGOs",
        "monthly",
        "0.7",
    ),
    (
        "partners/medical-tourism.html",
        "Continuia for Medical Tourism and Concierge Health",
        "Continuia for medical tourism: a documented specialist second opinion at the point of care, with no formal referral. Consults are logged as they happen.",
        "https://continuia.ai/partners/medical-tourism.html",
        "tourism.png",
        "Continuia for medical tourism share card. Consults are logged as they happen.",
        "index, follow",
        True,
        "Medical tourism",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "tourism",
        "Medical tourism",
        "monthly",
        "0.7",
    ),
    (
        "doctors.html",
        "Find a Specialist on the Continuia Network",
        "Continuia network specialists: a documented second opinion at the point of care. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/doctors.html",
        "doctors.png",
        "Continuia specialists share card. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "index, follow",
        True,
        "Specialists",
        "A licensed, board-certified physician reviews every AI-assisted opinion",
        "A documented second opinion at the point of care.",
        "doctors",
        "Find a specialist",
        "weekly",
        "0.7",
    ),
    (
        "share-your-story.html",
        "Share Your Story | Start a Continuia Second Opinion",
        "Share your story with Continuia to get a documented specialist second opinion at the point of care, with no formal referral. Contact sales@continuia.ai.",
        "https://continuia.ai/share-your-story.html",
        "share.png",
        "Share your story share card. A documented specialist second opinion with no formal referral.",
        "index, follow",
        True,
        "Share your story",
        "A documented specialist second opinion with no formal referral",
        "Contact sales@continuia.ai.",
        "share",
        "Share your story",
        "monthly",
        "0.7",
    ),
    (
        "getInTouch.html",
        "Contact Continuia at sales@continuia.ai",
        "sales@continuia.ai. AI organizes, matches, and drafts but never diagnoses on its own. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/getInTouch.html",
        "contact.png",
        "Contact Continuia share card. Email sales@continuia.ai.",
        "index, follow",
        True,
        "Contact",
        "A licensed, board-certified physician reviews every AI-assisted opinion",
        "AI organizes, matches, and drafts but never diagnoses on its own.",
        "contact",
        "Contact",
        "monthly",
        "0.7",
    ),
    (
        "employees.html",
        "Continuia Second Opinions for Self-Insured Employers",
        "Continuia for employer groups: a documented specialist second opinion at the point of care, with no formal referral. Consults are logged as they happen.",
        "https://continuia.ai/employees.html",
        "employers.png",
        "Continuia for employers share card. A documented specialist second opinion at the point of care.",
        "noindex, nofollow",
        False,
        "Employers",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "employers",
        "Employers",
        None,
        None,
    ),
    (
        "himss26.html",
        "Continuia at HIMSS 2026 | Governance and Audit",
        "Continuia for HIMSS meetings: a documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.",
        "https://continuia.ai/himss26.html",
        "himss.png",
        "Continuia at HIMSS share card. A documented specialist second opinion at the point of care.",
        "noindex, nofollow",
        False,
        "HIMSS",
        "A documented specialist second opinion at the point of care",
        "No formal referral. Consults are logged as they happen.",
        "himss",
        "HIMSS",
        None,
        None,
    ),
    (
        "cxa-globallaunch-c1a7e3d.html",
        "Join the Continuia Founding Circle of Physicians",
        "Founding circle: AI organizes, matches, and drafts but never diagnoses on its own. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/cxa-globallaunch-c1a7e3d.html",
        "founding.png",
        "Continuia founding circle share card. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "noindex, nofollow, noarchive, nosnippet",
        False,
        "Founding circle",
        "A licensed, board-certified physician reviews every AI-assisted opinion",
        "AI organizes, matches, and drafts but never diagnoses on its own.",
        "founding",
        "Founding circle",
        None,
        None,
    ),
    (
        "404.html",
        "Page Not Found | Continuia",
        "Page not found. AI organizes, matches, and drafts but never diagnoses on its own. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/404.html",
        "default.png",
        "Continuia share card. AI organizes, matches, and drafts but never diagnoses on its own.",
        "noindex, nofollow",
        False,
        "Continuia",
        "AI organizes, matches, and drafts but never diagnoses on its own",
        "A licensed, board-certified physician reviews every AI-assisted opinion.",
        "not-found",
        "Page not found",
        None,
        None,
    ),
    (
        "doctorProfile.html",
        "Continuia Specialist Profile from the Doctor Directory",
        "Continuia specialist profile: a documented second opinion at the point of care. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "https://continuia.ai/doctorProfile.html",
        "profile.png",
        "Continuia specialist profile share card. A licensed, board-certified physician reviews every AI-assisted opinion.",
        "noindex, nofollow",
        False,
        "Specialist profile",
        "A licensed, board-certified physician reviews every AI-assisted opinion",
        "A documented second opinion at the point of care.",
        "profile",
        "Specialist profile",
        None,
        None,
    ),
]

KEYS = (
    "file",
    "title",
    "description",
    "canonical",
    "image",
    "alt",
    "robots",
    "indexable",
    "eyebrow",
    "headline",
    "sub",
    "anchor",
    "label",
    "changefreq",
    "priority",
)


def pages():
    return [dict(zip(KEYS, row)) for row in PAGES]


def assert_copy(rows):
    titles = [r["title"] for r in rows]
    descs = [r["description"] for r in rows]
    assert len(titles) == len(set(titles)), "duplicate titles"
    assert len(descs) == len(set(descs)), "duplicate descriptions"
    bad = []
    for r in rows:
        n = len(r["title"])
        d = len(r["description"])
        if n > 60 or not (150 <= d <= 160):
            bad.append((r["file"], n, d, r["description"]))
        for field in ("title", "description", "alt", "eyebrow", "headline", "sub"):
            text = r[field]
            for ch in ("\u2014", "\u2013", "\u2192", "\u2190"):
                if ch in text:
                    bad.append((r["file"], field, "dash-or-arrow"))
    if bad:
        for item in bad:
            print("COPY", item)
        raise SystemExit(1)


def load_logo():
    # Both assets already use a transparent background. Do not knock out
    # near-white pixels: the icon uses them as highlights.
    logo = Image.open(os.path.join(SRC, "continuia.png")).convert("RGBA")
    icon = Image.open(os.path.join(SRC, "continuia.webp")).convert("RGBA")
    return logo, icon


def wrap_text(draw, text, font, max_w):
    words = text.split()
    lines = []
    cur = ""
    for word in words:
        trial = word if not cur else cur + " " + word
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_card(path, logo, icon, eyebrow, headline, sub):
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h), "#f8f7fb")
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((0, 0, 16, h), fill="#7c3aed")
    od.ellipse((880, -160, 1320, 280), fill=(139, 92, 246, 42))
    od.ellipse((980, 340, 1360, 760), fill=(109, 40, 217, 28))
    mark = icon.resize((300, 300), Image.Resampling.LANCZOS)
    # Fade the decorative mark.
    alpha = mark.getchannel("A").point(lambda p: int(p * 0.16))
    mark.putalpha(alpha)
    overlay.paste(mark, (860, 250), mark)
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    logo_w = 430
    logo_h = max(1, round(logo_w * logo.height / logo.width))
    logo_r = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    img.paste(logo_r, (56, 44), logo_r)

    max_w = 1040
    eye_font = ImageFont.truetype(SANS, 22)
    sub_font = ImageFont.truetype(SANS_REG, 26)
    size = 58
    lines = []
    head_font = None
    while size >= 36:
        head_font = ImageFont.truetype(SERIF, size)
        lines = wrap_text(draw, headline, head_font, max_w)
        if len(lines) <= 3:
            break
        size -= 2

    y = 44 + logo_h + 36
    # Tracked eyebrow in brand violet.
    gap = 1.4
    x = 56
    for ch in eyebrow.upper():
        draw.text((x, y), ch, font=eye_font, fill="#6b46c1")
        x += draw.textlength(ch, font=eye_font) + gap
    y += 40
    line_gap = int(size * 1.12)
    for line in lines:
        draw.text((56, y), line, font=head_font, fill="#1a1523")
        y += line_gap
    y += 8
    sub_lines = wrap_text(draw, sub, sub_font, max_w)
    for line in sub_lines:
        draw.text((56, y), line, font=sub_font, fill="#4a4358")
        y += 36

    draw.line((56, 568, 1144, 568), fill="#e5e1f2", width=2)
    foot = ImageFont.truetype(SANS_MED, 22)
    draw.text((56, 584), "continuia.ai", font=foot, fill="#6b46c1")
    sales = "sales@continuia.ai"
    sw = draw.textlength(sales, font=foot)
    draw.text((1144 - sw, 584), sales, font=foot, fill="#4a4358")

    rgb = img.convert("RGB")
    rgb.save(path, "PNG", optimize=True)
    return rgb


def save_icon(icon, size, path, scale=0.82):
    canvas = Image.new("RGBA", (size, size), "#ffffff")
    inner = max(1, int(size * scale))
    resized = icon.resize((inner, inner), Image.Resampling.LANCZOS)
    if size >= 128:
        resized = ImageEnhance.Sharpness(resized).enhance(1.15)
    x = (size - inner) // 2
    y = (size - inner) // 2
    canvas.paste(resized, (x, y), resized)
    out = canvas.convert("RGB")
    out.save(path, "PNG", optimize=True)
    return out


def write_favicons(icon):
    save_icon(icon, 16, os.path.join(SRC, "favicon-16x16.png"), 0.9)
    save_icon(icon, 32, os.path.join(SRC, "favicon-32x32.png"), 0.9)
    save_icon(icon, 48, os.path.join(SRC, "favicon-48x48.png"), 0.88)
    save_icon(icon, 180, os.path.join(SRC, "apple-touch-icon.png"), 0.86)
    save_icon(icon, 192, os.path.join(SRC, "android-chrome-192x192.png"), 0.86)
    save_icon(icon, 512, os.path.join(SRC, "android-chrome-512x512.png"), 0.84)
    ico_images = [
        Image.open(os.path.join(SRC, name)).convert("RGBA")
        for name in ("favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png")
    ]
    ico_images[0].save(
        os.path.join(SRC, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico_images[1:],
    )
    manifest = {
        "name": "Continuia",
        "short_name": "Continuia",
        "icons": [
            {"src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
        ],
        "theme_color": "#7c3aed",
        "background_color": "#ffffff",
        "display": "standalone",
    }
    with open(os.path.join(SRC, "site.webmanifest"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2)
        fh.write("\n")


def write_llms(rows):
    public = [r for r in rows if r["indexable"]]
    private = [r for r in rows if not r["indexable"]]

    def section(r):
        return "\n".join(
            [
                f'<a id="{r["anchor"]}"></a>',
                f'## {r["label"]}',
                "",
                r["canonical"],
                "",
                LINE_A,
                "",
                LINE_B,
                "",
                LINE_C,
                "",
            ]
        )

    llms = ["# Continuia", "", f"> {LINE_A}", "", LINE_B, "", LINE_C, "", "## Pages", ""]
    for r in public:
        note = "Documented specialist second opinion at the point of care. Contact sales@continuia.ai."
        llms.append(f'- [{r["label"]}](https://continuia.ai/llms-full.txt#{r["anchor"]}): {note}')
    llms += [
        "",
        "## Optional",
        "",
        "- [Full notes](https://continuia.ai/llms-full.txt): The same supported description for each page, including pages marked noindex.",
        "",
    ]
    for r in private:
        note = "Marked noindex. Same supported description. Contact sales@continuia.ai."
        llms.append(f'- [{r["label"]}](https://continuia.ai/llms-full.txt#{r["anchor"]}): {note}')
    llms.append("")
    with open(os.path.join(SRC, "llms.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(llms))

    full = [
        "# Continuia",
        "",
        f"> {LINE_A}",
        "",
        LINE_B,
        "",
        LINE_C,
        "",
        "## Pages",
        "",
    ]
    for r in public:
        full.append(section(r))
    full.append("## Optional")
    full.append("")
    for r in private:
        full.append(section(r))
    with open(os.path.join(SRC, "llms-full.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(full))


def write_sitemap(rows):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for r in rows:
        if not r["indexable"]:
            continue
        lines.append("  <url>")
        lines.append(f'    <loc>{r["canonical"]}</loc>')
        lines.append("    <lastmod>2026-11-13</lastmod>")
        lines.append(f'    <changefreq>{r["changefreq"]}</changefreq>')
        lines.append(f'    <priority>{r["priority"]}</priority>')
        lines.append("  </url>")
    lines.append("</urlset>")
    lines.append("")
    with open(os.path.join(SRC, "sitemap.xml"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))


def write_robots():
    live_path = "/tmp/live-robots.txt"
    live = open(live_path, encoding="utf-8").read()
    preamble, _, rest = live.partition("# BEGIN Cloudflare Managed content")
    managed, _, _after = rest.partition("# END Cloudflare Managed Content")
    # Keep every previously disallowed crawler except the ones this policy allows.
    # Blank lines separate groups, so grouped user-agents stay together.
    allowed = [
        "GPTBot",
        "OAI-SearchBot",
        "ChatGPT-User",
        "ClaudeBot",
        "Claude-User",
        "Claude-SearchBot",
        "PerplexityBot",
        "Perplexity-User",
        "Google-Extended",
        "Applebot-Extended",
        "CCBot",
    ]
    allowed_set = set(allowed)
    groups = []
    current = []
    for line in managed.splitlines():
        if line.strip() == "":
            if current:
                groups.append(current)
                current = []
            continue
        current.append(line)
    if current:
        groups.append(current)

    disallow_groups = []
    for group in groups:
        agents = [ln.split(":", 1)[1].strip() for ln in group if ln.startswith("User-agent:")]
        if not agents or agents == ["*"]:
            continue
        if any(agent in allowed_set for agent in agents):
            continue
        disallow_groups.append(group)

    out = [preamble.rstrip("\n"), "", "# BEGIN Cloudflare Managed content", ""]
    out.append("User-agent: *")
    out.append("Content-Signal: search=yes,ai-input=yes,ai-train=yes,use=reference")
    out.append("Allow: /")
    out.append("")
    out.append("# AI search and indexing crawlers")
    for agent in allowed:
        out.append(f"User-agent: {agent}")
        out.append("Allow: /")
        out.append("")
    out.append("# Other crawlers kept disallowed from the live robots.txt")
    for group in disallow_groups:
        out.extend(group)
        out.append("")
    out.append("# END Cloudflare Managed Content")
    out.append("")
    out.append("User-agent: *")
    out.append("Allow: /")
    out.append("")
    out.append("Sitemap: https://continuia.ai/sitemap.xml")
    out.append("Allow: /llms.txt")
    out.append("Allow: /llms-full.txt")
    out.append("Crawl-delay: 1")
    out.append("")
    out.append("Disallow: /admin/")
    out.append("Disallow: /api/")
    out.append("")
    text = "\n".join(out)
    with open(os.path.join(SRC, "robots.txt"), "w", encoding="utf-8") as fh:
        fh.write(text)
    if "User-agent: AwarioSmartBot\nUser-agent: AwarioRssBot\nDisallow: /" not in text:
        raise SystemExit("robots dropped the grouped Awario disallow")
    missing = [agent for agent in allowed if f"User-agent: {agent}\nAllow: /" not in text]
    if missing:
        raise SystemExit(f"robots missing allow for {missing}")


def write_sheet(cards):
    # Contact sheet for review. Not shipped on the site.
    thumb_w, thumb_h = 480, 252
    cols = 3
    label_h = 28
    rows_n = (len(cards) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w + 20, rows_n * (thumb_h + label_h) + 20), "#ffffff")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(SANS_REG, 16)
    for i, (name, im) in enumerate(cards):
        c = i % cols
        r = i // cols
        x = 10 + c * thumb_w
        y = 10 + r * (thumb_h + label_h)
        thumb = im.resize((thumb_w - 8, thumb_h - 8), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y + label_h))
        draw.text((x, y + 4), name, font=font, fill="#1a1523")
    os.makedirs("/opt/cursor/artifacts", exist_ok=True)
    sheet_path = "/opt/cursor/artifacts/share-cards.png"
    sheet.save(sheet_path, "PNG", optimize=True)
    print("sheet", sheet_path, sheet.size)


def main():
    rows = pages()
    assert_copy(rows)
    os.makedirs(OG_DIR, exist_ok=True)
    logo, icon = load_logo()
    cards = []
    seen = set()
    # Default card uses the 404 copy, which is the neutral brand card.
    default = next(r for r in rows if r["image"] == "default.png")
    for r in [default] + rows:
        dest = os.path.join(OG_DIR, r["image"])
        if dest in seen:
            continue
        seen.add(dest)
        rgb = draw_card(dest, logo, icon, r["eyebrow"], r["headline"], r["sub"])
        with Image.open(dest) as check:
            assert check.size == (1200, 630), check.size
        cards.append((r["image"], rgb))
        print("card", r["image"], os.path.getsize(dest))
    write_favicons(icon)
    write_llms(rows)
    write_sitemap(rows)
    write_robots()
    meta_path = os.path.join(ROOT, "scripts", "pages.json")
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(rows, fh, indent=2)
        fh.write("\n")
    write_sheet(cards)
    print("pages", len(rows), "indexable", sum(1 for r in rows if r["indexable"]))


if __name__ == "__main__":
    main()
