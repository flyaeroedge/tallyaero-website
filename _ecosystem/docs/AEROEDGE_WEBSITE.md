# AeroEdge Website
## Structure, Branding & Content Guide

---

## 1. Overview

The AeroEdge website (`aeroedge_website/`) is a static HTML/CSS site hosted on GitHub Pages at `tallyaero.com`. It serves as the marketing and information hub for the AeroEdge ecosystem.

**Repository:** `gherkin-aviation/aeroedge-website`
**Hosting:** GitHub Pages
**Domain:** tallyaero.com

---

## 2. Site Structure

### Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page, ecosystem overview, about preview |
| EM Diagram | `tools/em-diagram.html` | EM Diagram tool description and features |
| Maneuver Overlay | `tools/maneuver-overlay.html` | Overlay tool description and features |
| Logbook | `products/logbook.html` | Logbook features, comparison table, screenshots |
| Aircraft | `products/aircraft.html` | Aircraft tracking features |
| Scheduler | `products/scheduler.html` | Scheduling features |
| Syllabus | `products/syllabus.html` | Syllabus builder features |
| Learn | `learn/index.html` | Educational content, common questions |
| Sneak Peek | `preview/index.html` | UI preview screenshots |
| About | `about.html` | Creator bio, mission, philosophy, contact |

### Directory Structure

```
aeroedge_website/
├── index.html              # Homepage
├── about.html              # About page
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # Navigation, interactions
├── images/
│   ├── logo.png            # Main logo
│   ├── logo2.png           # Favicon
│   ├── creator.jpg         # About page photo
│   ├── em-diagram-screenshot.png
│   ├── overlay-screenshot.png
│   ├── milconversion.png   # Logbook feature
│   ├── importexport.png    # Logbook feature
│   ├── context.png         # Logbook feature
│   └── training.png        # Logbook feature
├── tools/
│   ├── em-diagram.html
│   └── maneuver-overlay.html
├── products/
│   ├── logbook.html
│   ├── aircraft.html
│   ├── scheduler.html
│   └── syllabus.html
├── learn/
│   └── index.html
└── preview/
    └── index.html
```

---

## 3. Branding

### AEROEDGE Logo Text

The brand name is styled with colored text throughout the site:

- **AERO** = Blue (`--blue-primary: #2980B9`)
- **EDGE** = Orange (`--orange-primary: #E65C00`)

**HTML Format:**
```html
<span class="brand-text"><span class="aero">AERO</span><span class="edge">EDGE</span></span>
```

**On Orange Backgrounds** (buttons, badges):
```html
<span class="brand-text brand-text-light"><span class="aero">AERO</span><span class="edge">EDGE</span></span>
```
- AERO stays blue
- EDGE becomes white for visibility

### Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--orange-primary` | #E65C00 | Primary buttons, accents, EDGE text |
| `--orange-dark` | #CC4A00 | Button hover states |
| `--blue-primary` | #2980B9 | Links, AERO text |
| `--blue-dark` | #1a5276 | Link hover states |
| `--navy-bg` | #0A1628 | Dark sections, page headers |
| `--text-light` | #FFFFFF | Text on dark backgrounds |
| `--text-muted` | #A0AEC0 | Secondary text |
| `--success-green` | #28A745 | Live Tool badges |

### Page Header Badges

Badges appear in page headers to indicate status:

| Status | Class | Color |
|--------|-------|-------|
| Live Tool | `badge badge-live` | Green (`--success-green`) |
| In Development | `badge badge-dev` | Orange (`--orange-primary`) |

---

## 4. Navigation

### Universal Nav Bar

All pages share a consistent navigation structure:

```
[Logo] Home | Live Tools ▼ | Ecosystem ▼ | Learn | Sneak Peek | About | [Try EM Diagram] [Try Overlay Tool]
                  │                │
                  │                └── Logbook, Aircraft, Scheduler, Syllabus
                  └── EM Diagram, Maneuver Overlay
```

### Dropdowns

- **Live Tools:** Links to tool pages (EM Diagram, Maneuver Overlay)
- **Ecosystem:** Links to product pages (Logbook, Aircraft, Scheduler, Syllabus)

### CTA Buttons

Two primary call-to-action buttons in nav:
- "Try EM Diagram" → https://app.tallyaero.com
- "Try Overlay Tool" → https://overlay.tallyaero.com

---

## 5. Key Pages Detail

### Homepage (`index.html`)

Sections:
1. Hero with tagline
2. Live Tools showcase (EM Diagram, Overlay)
3. Ecosystem overview (6 products grid)
4. About preview with creator photo
5. Footer

### Logbook Page (`products/logbook.html`)

Most detailed product page with:

**Showcase Features (4 cards with screenshots):**
1. Military Conversion Engine
2. Multiple Import Avenues
3. Context Logbooks
4. Training Integration

**Comparison Table:**
- AeroEdge vs. "Typical Logbook"
- Green checkmarks for AeroEdge features
- Red X marks for competitor limitations
- Yellow tilde for partial support

**Additional Features (8 cards):**
- Simulator & Ground Logbooks
- Currency & Alerts
- CFI Resource Database
- Paper Bridge
- Reports & Analytics
- Full Customization
- Export Options
- Your Data, Your Choice

**Key Messaging:**
- Configurable for ALL aircrew (pilots, flight engineers, loadmasters, navigators, WSOs)
- Not just pilots - anyone who logs flight time

### Learn Page (`learn/index.html`)

Educational Q&A organized by topic:
- Understanding Your Performance Envelope
- Multi-Engine Performance
- Steep Turns & Training Maneuvers
- The Impossible Turn (6 questions)

### About Page (`about.html`)

Sections:
1. Page header
2. Creator bio with credentials
3. Mission statement
4. Design philosophy (6 principles)
5. The Greybeard Principle
6. Technical approach
7. Contact section with bug reporting info
8. CTA to try tools

**Bug Reports:**
- Note about error reporting links in EM Diagram and Overlay Tool nav bars
- Email: info@tallyaero.com

---

## 6. Technical Notes

### EM Diagram Description

The EM diagram is described as:
> A **three-axis plot: airspeed vs. turn rate vs. load factor (G)**. Overlaid on this are Ps (specific excess power) contours, angle of bank shading, and turn radius lines.

### Dynamic Vmc

Vmc test conditions (accurate):
- Max gross weight
- Most rearward CG
- Sea level
- Critical engine **windmilling** (not feathered)
- 5° bank into the good engine
- Takeoff power

---

## 7. Deployment

### Publishing Changes

1. Make changes to HTML/CSS files
2. Commit with descriptive message
3. Push to `main` branch
4. GitHub Pages auto-deploys

```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

### Testing Locally

Open HTML files directly in browser or use a local server:
```bash
cd aeroedge_website
python -m http.server 8000
# Visit http://localhost:8000
```

---

## 8. Future Additions

- [ ] Screenshots for Aircraft, Scheduler, Syllabus pages
- [ ] Video backgrounds for page headers (infrastructure in place)
- [ ] Featured Articles section (waiting for AOPA contract)
- [ ] Additional Learn page content

---

## 9. Related Documentation

- [Master Orchestration](./AEROEDGE_MASTER_ORCHESTRATION.md)
- [Go-to-Market](./AEROEDGE_GO_TO_MARKET.md)
- [User Flows & UX](./AEROEDGE_USER_FLOWS_UX.md)
