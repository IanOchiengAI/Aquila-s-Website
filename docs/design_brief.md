# AQUILA / OYANGE Photography Portfolio — Design Brief

> **Status:** 🟢 Approved for Development  
> **Recommended Option:** Option 2 — The "Atlas Standard"  
> **Last Updated:** 2026-02-06  
> **Template Source:** [OYANGE Portfolio](https://ianochiengai.github.io/oyange-portfolio/)

---

## 📋 Project Overview

**Client:** Aquila (OYANGE Photography)  
**Business Type:** Portrait & Travel Photography + Mentorship  
**Location:** Nairobi, Kenya  
**Email:** <martinaquila5@gmail.com>

**Core Offerings:**

1. Photography Services (Portraits, Travel, Events)
2. Mentorship Program (Teaching visual storytelling)
3. Print Shop (Selling photography prints)

---

## 🎨 Brand Identity

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-dark` | `#113827` | Primary deep green |
| `brand-gold` | `#D4AF37` | Accent / CTA color |
| `brand-bone` | `#F9F9F7` | Background off-white |

### Typography

| Type | Font | Usage |
|------|------|-------|
| Display | **Syne** (700, 800) | Headlines, Logo |
| Body | **Inter** (300, 400, 500) | Body text, UI |

### Design Language

- **"African Modernism"** — Clean, brutalist simplicity, but warm
- Extensive negative space
- High contrast, gallery-like feel
- Mobile-first (85%+ Kenyan users on mobile)

---

## 🏆 Competitor Analysis

| Photographer | Key Feature | Inspiration for Aquila |
|--------------|-------------|------------------------|
| **Peter McKinnon** | Category-based portfolio (People/Places/Things) | Portfolio organization |
| **Irene Rudnyk** | Workshops, Presets, Kit page | Secondary revenue streams |
| **Siam Bibrian** | Large immersive images, storytelling projects | Visual impact |
| **Rafael Lührs** | Minimal design, clear category labels, videos | Clean aesthetic |

---

## 📄 Three Website Options

### ❌ Option 1: "Digital Business Card" (Simple)

Single-page scrolling site. Fast to build but limited.

| Aspect | Details |
|--------|---------|
| **Scope** | Single Page Application |
| **Features** | Hero + 10-15 images + Mini-about + Contact links |
| **Dev Time** | 3-5 days |
| **Hosting** | FREE (GitHub Pages) |
| **Limitations** | No SEO depth, no shop, no filtering |

---

### ✅ Option 2: "Atlas Standard" (RECOMMENDED)

Professional multi-page architecture. The sweet spot.

| Aspect | Details |
|--------|---------|
| **Scope** | 5-6 core pages |
| **Dev Time** | 1-2 weeks |
| **Hosting** | FREE (Vercel via GitHub) |
| **Cost** | $0/mo + $12/year domain |

**Pages Required:**

1. **Home** — Hero image + Featured Work (3 images)
2. **Portfolio** — Filterable masonry grid [All, People, Places, Events, Travel]
3. **About** — "The Photographer" (Bio) + "The Mentor" (Teaching)
4. **Shop (Lite)** — Print display with "Buy via WhatsApp" buttons
5. **Contact** — Form (Name, Email, Subject, Message)

**Why This Option:**

- ✅ Ships in 10 days
- ✅ Zero maintenance (no database)
- ✅ Can upgrade to Option 3 later
- ✅ Better SEO than Wix/Squarespace
- ✅ 2-3x faster loading (critical for Kenya)

---

### ❌ Option 3: "Ecosystem" (Advanced)

Full platform with CMS, e-commerce, client area.

| Aspect | Details |
|--------|---------|
| **Scope** | Static Site Generator + Headless CMS |
| **Features** | Admin dashboard, shopping cart, client proofing |
| **Dev Time** | 3-4 weeks |
| **Hosting** | $0-15/mo |
| **Best For** | 20+ prints/week, 5+ corporate clients |

---

## 🔄 User Flow (Option 2)

```
┌─────────────────────────────────────────────────────────────┐
│                         LANDING                              │
│                    (index.html)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   HOME / HERO          │
              │   "View Portfolio" CTA │
              └───────────┬────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌───────────┐  ┌─────────────┐  ┌────────────┐
    │ PORTFOLIO │  │    ABOUT    │  │   CONTACT  │
    │ Filterable│  │ Bio+Mentor  │  │   Form     │
    │   Grid    │  └─────────────┘  └────────────┘
    └─────┬─────┘
          │
          ▼
    ┌─────────────┐
    │    SHOP     │
    │ "Buy via    │
    │  WhatsApp"  │
    └─────────────┘
```

---

## 🛠️ Technical Requirements

### Image Optimization (Critical for Kenya)

- **Lazy Loading:** `loading="lazy"` attribute
- **WebP format:** 30-40% smaller than JPEG
- **Responsive images:** `srcset` for mobile/tablet/desktop
- **CDN:** Netlify/Vercel global CDN includes Africa nodes

### Performance Targets

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s

### Mobile-First Design

- 85%+ of Kenyans access internet via mobile
- Touch-friendly gallery interactions
- Single-column layout on mobile

### Future Integrations

- **Payments:** M-Pesa integration possible
- **Forms:** Formspree for contact form
- **Analytics:** Google Analytics

---

## 📁 Project Structure

```
Aquila's Website/
├── logo.jpg                    # Brand logo
├── design_brief.md             # This file
└── oyange-portfolio-main/
    ├── index.html              # Home + Portfolio
    ├── about.html              # About Page
    ├── contact.html            # Contact Form
    ├── shop.html               # Shop (Lite) [TO CREATE]
    ├── project.html            # Project Detail Template
    ├── README.md
    └── js/
        ├── main.js             # Core animations
        ├── admin.js            # Admin panel
        └── cloudinary-helper.js
```

---

## 🎯 Development Phases

### Phase 1: Foundation ✅

- [x] Research competitors
- [x] Document common features
- [x] Choose hosting (Netlify/GitHub Pages)
- [x] Select Option 2 as build target

### Phase 2: Build (CURRENT)

- [ ] Update brand colors (#113827, #D4AF37, #F9F9F7)
- [ ] Update typography (Syne, Inter)
- [ ] Implement filterable portfolio grid
- [ ] Create About page sections
- [ ] Build Shop (Lite) page
- [ ] Style contact form

### Phase 3: Polish

- [ ] Add micro-animations
- [ ] Optimize images for Kenya speeds
- [ ] Test on mobile devices
- [ ] Accessibility check

### Phase 4: Deploy

- [ ] Deploy to Vercel via GitHub
- [ ] Connect custom domain
- [ ] Set up analytics
- [ ] Final testing

---

## 📝 AI Development Prompts

### Lovable Prompt (Option 2)

```
Create a multi-page professional photography portfolio for "OYANGE" acting as a Senior Web Architect.

STYLE: Inspired by Peter McKinnon and Rafael Luhrs, but with a Kenyan identity.
COLORS: Primary #113827 (Deep Green), Accent #D4AF37 (Gold).
TECH: React + Tailwind CSS + Shadcn UI (for clean components).

PAGES REQUIRED:
1. Home: Hero image with a "View Portfolio" CTA. Featured Work section (3 images).
2. Portfolio: A filterable masonry grid. Filters: [All, People, Places, Events, Travel]. Clicking a filter instantly reshuffles the grid.
3. About: A specialized profile page. Section for "The Photographer" (Bio) and "The Mentor" (Teaching philosophy).
4. Shop (Lite): A grid display of 4 prints. instead of "Add to Cart," the button says "Buy via WhatsApp".
5. Contact: A clean form layout (Name, Email, Subject Dropdown, Message).

UX DETAILS:
- Sticky Navigation bar that disappears on scroll down and reappears on scroll up.
- fast loading images (use placeholders).
- Typography: 'Syne' for headers, 'Inter' for body.
```

### Gemini Prompt (Option 2)

```
Act as Atlas. We are building the OYANGE professional site. Write the code for two specific files: `index.html` (Home/Portfolio) and `contact.html`.

TECH STACK:
- Semantic HTML5.
- Tailwind CSS (CDN).
- Vanilla JavaScript (embedded in bottom of HTML).

PAGE 1: index.html (The Portfolio)
- Feature a Filterable Gallery.
- Logic: Create buttons [People, Travel, Events]. Use JavaScript to toggle visibility of images based on `data-category` attributes.
- Gallery Style: Masonry layout.
- Hero: "Beyond the Mosaic."

PAGE 2: contact.html
- A working form structure aimed at Formspree.
- Fields: Name, Email, Service Type (Dropdown), Message.
- Styling: Minimalist input fields with bottom-borders only (no heavy boxes).

AESTHETIC:
- Primary Color: #113827.
- Font: Syne (700 weight for headers), Inter (light weight for body).
- Ensure the Navigation bar is consistent across both files.
```

---

## 💰 Cost Summary

| Item | Cost |
|------|------|
| Hosting (Vercel via GitHub) | **$0/month** |
| Domain (Namecheap) | **~$12/year** |
| SSL Certificate | **FREE** (included) |
| CDN | **FREE** (included) |
| **Total Year 1** | **~$12** |

---

## ✅ Why Custom Code > Wix/Squarespace

1. **Cost:** $0/month vs $15-27/month
2. **Speed:** 2-3x faster loading (critical for Africa)
3. **SEO:** Better Google ranking
4. **Future-proof:** No vendor lock-in
5. **M-Pesa:** Custom payment integration possible
6. **Scalability:** Handles 10,000+ visitors

---

## 📞 Contact Details for Site

- **Email:** <martinaquila5@gmail.com>
- **Phone:** [To be provided]
- **Social:** Instagram, LinkedIn
- **Location:** Nairobi, Kenya

---

## 🚀 Next Steps for Agents

1. **Update brand colors** in all HTML files to new palette
2. **Update fonts** to Syne + Inter
3. **Implement filterable gallery** with category buttons
4. **Create shop.html** with WhatsApp buy buttons
5. **Style About page** with Photographer + Mentor sections
6. **Optimize images** for Kenya mobile speeds

---

*This design brief serves as the single source of truth for all development agents working on this project.*
