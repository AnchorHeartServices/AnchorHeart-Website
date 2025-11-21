# AnchorHeart Services - Design Guidelines

## Design Approach

**Reference-Based Healthcare Design**: Drawing inspiration from trusted healthcare platforms like Oscar Health, One Medical, and Headway, combined with the warmth of care-focused services like Care.com. The design prioritizes trust, compassion, and professionalism while maintaining accessibility and clarity.

**Core Principles**:
- **Trust through transparency**: Clear pricing, straightforward information
- **Compassionate professionalism**: Warm but credible visual language
- **Accessibility-first**: High contrast, clear hierarchy, mobile-friendly
- **Human-centered**: Focus on people, not just services

---

## Color Palette

### Primary Colors
**Light Mode**:
- Primary Navy Blue: `220 80% 25%` - Trust, professionalism, medical authority
- Primary Background: `210 20% 98%` (slate-50) - Soft, clean canvas
- Surface White: `0 0% 100%` - Cards, containers

**Dark Mode**:
- Primary Navy Blue: `220 75% 45%` (lighter navy for contrast)
- Background: `215 28% 17%` (dark slate)
- Surface: `215 25% 27%` (elevated surfaces)

### Accent Colors
- Success Green: `142 76% 36%` (emerald-600) - Confirmations, positive states
- Alert Red: `0 72% 51%` (red-500) - Important notices, urgency
- Soft Navy Tint: `220 100% 96%` - Backgrounds, highlights

### Semantic Colors
- Text Primary: `215 25% 27%` (slate-800/900)
- Text Secondary: `215 16% 47%` (slate-600)
- Text Muted: `214 32% 91%` (slate-500)
- Borders: `214 32% 91%` (slate-200)

---

## Typography

**Font Families**:
- **Primary**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) - Maximum performance and native feel
- **Display/Headlines**: Consider Inter or DM Sans via Google Fonts for extra polish (optional enhancement)

**Type Scale**:
- Display (Hero Headlines): `text-4xl sm:text-5xl` (2.25rem/3rem), `font-extrabold`, `tracking-tight`
- H2 (Section Headers): `text-3xl`, `font-bold`, `tracking-tight`
- H3 (Card Titles): `text-lg`, `font-semibold`
- Body Large: `text-lg`, `leading-relaxed`
- Body: `text-base`, `leading-normal`
- Small/Labels: `text-sm`, `text-xs uppercase tracking-wide`

**Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700), Extrabold (800)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of `2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32`
- Micro spacing (gaps, padding): `2, 3, 4`
- Component spacing: `6, 8, 10`
- Section spacing: `12, 16, 20` (mobile), `24, 32` (desktop)

**Grid System**:
- Max container width: `max-w-6xl` (72rem)
- Content width: `max-w-4xl` for text-heavy sections
- Column grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for cards

**Vertical Rhythm**:
- Hero section: `py-16 sm:py-20`
- Content sections: `py-12 sm:py-20`
- Component internal padding: `p-4 sm:p-6` (cards), `p-6 sm:p-8` (emphasized)

---

## Component Library

### Core Components

**Buttons**:
- Primary: Navy blue background, white text, rounded-xl, shadow, hover effect
- Secondary: White background, slate border, hover:border-slate-400
- Icon buttons: Matching style with integrated icons

**Cards**:
- Service Cards: White background, slate-200 border, rounded-2xl, p-6, subtle shadow, hover lift effect
- Stat Cards: White background, ring-1 ring-slate-100, rounded-2xl, icon + label + value layout
- Feature boxes: Sky-50 background for highlighted content

**Form Elements**:
- Inputs: Rounded-lg, slate-300 border, px-3 py-2, focus:ring pattern
- Select dropdowns: Matching input style
- Range sliders: Custom styling with sky-700 track
- Checkboxes: Standard with clear labels

**Pills/Badges**:
- Rounded-full, border slate-200, bg-white/70, backdrop-blur, inline-flex with icons

### Navigation
- Sticky header: White/90 backdrop-blur, border-bottom
- Logo + tagline on left, nav links center/right, CTA button prominent
- Mobile: Hamburger menu (implement if needed)

### Interactive Elements

**Rate Calculator**:
- Light navy tint background container with border
- Grid layout for inputs (sm:grid-cols-2)
- Range slider for hours with live value display
- Result display: White card with large bold price text

**FAQ Accordion**:
- White cards with slate-200 border, rounded-xl
- Chevron icons for expand/collapse
- Smooth content reveal with border-top separator

**Contact Form**:
- Grid layout with full-width and split fields
- Success state: Emerald-50 background with CheckCircle icon
- Clear labels above inputs

---

## Images & Visual Strategy

### Hero Section
**Large Hero Image**: Yes - Use a warm, professional image showing:
- Caregiver and elderly client in home setting (authentic, diverse representation)
- Natural lighting, soft focus on background
- Emotional connection without being clinical
- **Placement**: Right side of hero on desktop (sm:grid-cols-2 split), full-width on mobile
- **Treatment**: Rounded-2xl corners, subtle shadow-xl, background glow effect (sky-100/60 blur layer)

### Supporting Imagery
- **Services Section**: Icon-based (lucide-react icons) - no photos needed, maintains clean aesthetic
- **Trust Indicators**: Consider small partner logos or certification badges (HCA Registry, Insurance badges)
- **Team/About** (if added): Authentic photos of actual caregivers, not stock photos
- **Testimonials**: Client photos optional but increase trust

### Logo
- Custom SVG medical-themed logo (anchor + heart + hands + cross)
- Gradient red heart, navy hands, white cross, light blue halo
- Use at `h-10 w-10` in header, `h-12 w-12` in hero feature box

---

## Visual Effects & Animations

**Minimal, Purposeful Motion**:
- Card hover: Subtle -translate-y-0.5 with shadow increase
- FAQ expand/collapse: No animation beyond content reveal
- Button states: Built-in Tailwind hover/focus states only
- Backdrop blur: Only on header (backdrop-blur) and pills (backdrop-blur)

**Avoid**: Parallax, scroll-triggered animations, loading spinners (unless needed for actual async operations)

---

## Accessibility & Dark Mode

**Accessibility**:
- ARIA labels on interactive elements
- Semantic HTML (header, nav, section, article)
- Form labels properly associated with inputs
- Focus states clearly visible
- Structured data (JSON-LD) for SEO

**Dark Mode Implementation**:
- Consistent throughout entire application
- Dark slate backgrounds (not pure black)
- Lighter sky-blue for primary color
- Maintain contrast ratios (WCAG AA minimum)
- Form inputs: Dark backgrounds with lighter borders

---

## Content Strategy & Structure

### Page Sections (in order):
1. **Hero**: Split layout with headline, CTAs, key stats (response time, satisfaction, coverage)
2. **Services**: 3-column grid of service cards (Companion Care, Personal Care, Advanced Care)
3. **Rate Estimator**: Interactive calculator with service selection, hours slider, premium options
4. **Trust Indicators**: Stats, certifications, coverage information
5. **About/Why Choose**: Story, values, team introduction
6. **FAQ**: Collapsible questions addressing common concerns
7. **Contact**: Form + contact details (phone, email, address) + office hours
8. **Footer**: Minimal - copyright, social links, quick nav

### Multi-Column Usage:
- Hero: 2-column split (content + image)
- Services: 3-column grid on desktop
- Stats: 3-column compact grid
- Contact: 2-column (form + info)
- FAQ: Single column for readability

---

This design creates a professional, trustworthy healthcare service website that balances warmth with credibility, using a navy blue and slate color palette, clear typography hierarchy, and strategic imagery to build emotional connection while maintaining medical authority.