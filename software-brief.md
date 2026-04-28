# Lead Gen System: Turo-to-Private Calculator

## Project Summary
**What:** Landing page with "Turo vs Private" earnings calculator — a lead magnet that shows luxury car hosts exactly how much more money they'd make by going private.

**Who:** Luxury/exotic car Turo hosts (fleet owners and high-end single-car hosts)

**Main Result:** Capture email addresses of qualified prospects who want to escape Turo's fees and build their own private rental business.

---

## Recommended Product Shape

**App Type:** Single-page landing site with embedded interactive calculator

**MVP Focus:** 
- High-converting landing page
- Simple but compelling calculator (Turo earnings vs Private earnings)
- Email capture gate (see results after entering email)
- Basic admin to view/download leads

**Strategic Positioning:** 
- Position as "The Turo Escape Calculator"
- Focus on the pain: Turo takes 25-40% + no customer ownership
- Promise: See your true earning potential in 30 seconds

---

## Core Features

### Must-Have (MVP)
1. **Hero Section** — Headline, subhead, CTA to calculator
2. **Interactive Calculator:**
   - Inputs: Monthly rental days, avg daily rate, number of cars
   - Calculates: Turo take (25-40%), private take (0% platform fee)
   - Shows: Monthly difference, yearly difference, 3-year projection
3. **Email Gate** — User enters email to see full results
4. **Results Page** — Detailed breakdown with "Get the full guide" CTA
5. **Lead Capture** — Store emails + calculation data
6. **Simple Admin Dashboard** — View leads, export CSV

### Secondary (Post-MVP)
- PDF report generation ("Your Private Rental Business Plan")
- Email sequence trigger (welcome + nurture series)
- A/B testing on headlines
- Social proof section (testimonials from hosts who made the switch)

### Future
- Full SaaS platform for managing private rentals
- Integration with booking systems
- Insurance partner referrals

---

## User Roles

1. **Visitor (Turo Host)** — Uses calculator, enters email, views results
2. **Admin (You/Dave)** — Views leads, exports data, manages content

---

## Screen / Page Map

1. **Landing Page (`/`)**
   - Hero with headline: "Stop Giving Turo 40% of Your Money"
   - Pain points (Turo fees, no customer ownership, strict policies)
   - Calculator CTA
   - Social proof (placeholder for now)
   - FAQ

2. **Calculator Section** (inline or `/calculator`)
   - 3 input fields
   - "Calculate My Escape" button
   - Email gate modal after submit

3. **Results Page (`/results` or modal)**
   - Big number: "You'd make $X more per year"
   - Breakdown table: Turo vs Private
   - 3-year projection
   - CTA: "Get the Complete Guide to Going Private"

4. **Admin Dashboard (`/admin`)**
   - Login protected
   - Leads table (email, car count, monthly days, rate, calculated savings, date)
   - Export to CSV
   - Stats (total leads, avg potential savings)

---

## User Flow

### First-Time Visitor Flow
1. Lands on page from ad/organic
2. Reads headline + value prop
3. Clicks "See How Much You're Losing"
4. Enters: rental days, daily rate, car count
5. Clicks calculate
6. Email gate appears: "Enter email to see your results"
7. Enters email → sees full breakdown
8. CTA to download guide (future) or book call

### Admin Flow
1. Login to `/admin`
2. View leads table
3. Filter/sort
4. Export CSV for email marketing

---

## Recommended Tech Stack

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| **Frontend** | Next.js 14 (App Router) | Fast, SEO-friendly, easy deployment |
| **Styling** | Tailwind CSS + shadcn/ui | Beautiful UI fast, consistent design |
| **Database** | SQLite (local file) or Vercel Postgres | Simple, zero config, perfect for MVP |
| **Auth** | NextAuth.js or simple password | Admin only, keep it simple |
| **Deployment** | Vercel | One-click, fast, free tier |
| **Email** | Resend or SendGrid (placeholder) | Capture now, send later |

**Why this stack:**
- Speed to launch (can deploy in hours)
- No complex backend needed
- Easy to scale later
- Claude builds this stack extremely well

---

## System Design Notes

### Data Model
```
Lead {
  id: string
  email: string
  carCount: number
  monthlyDays: number
  dailyRate: number
  turoCommission: number (default 0.30)
  calculatedMonthlyLoss: number
  calculatedYearlyLoss: number
  createdAt: datetime
  source: string (utm tracking)
}
```

### Calculation Logic
```
monthlyRevenue = monthlyDays * dailyRate * carCount
turoTake = monthlyRevenue * turoCommission
privateTake = monthlyRevenue * 0.05 (payment processing only)
monthlySavings = turoTake - privateTake
yearlySavings = monthlySavings * 12
threeYearSavings = yearlySavings * 3
```

### Security
- Rate limiting on calculator submissions (prevent spam)
- Email validation
- Admin route protected
- No sensitive data stored

### Scalability
- SQLite fine for 10k leads
- Easy migration to Postgres later
- Static export possible if needed

---

## MVP Build Plan

### Phase 1 (Core Lead Gen)
- Landing page design + copy
- Calculator component
- Email capture + storage
- Results display
- Basic admin view

### Phase 2 (Conversion Optimization)
- Email gate with PDF download
- Better copy + social proof
- A/B test framework
- Analytics (Plausible or GA)

### Phase 3 (Automation)
- Email sequences
- CRM integration
- Booking calendar embed

---

## Assumptions OpenClaw Made

### Confirmed User Inputs
- Landing page with calculator lead magnet
- Target: Luxury Turo hosts
- Goal: Capture emails
- Priority: Speed
- Auto-build: Yes
- Auto-deploy: Yes

### Inferred Product Decisions
- Email gate BEFORE showing results (higher conversion)
- 30% default Turo commission (industry average, adjustable)
- 5% private payment processing cost (realistic)
- Single-page design (faster, better UX)
- Admin dashboard included (you need to see leads)
- SQLite database (simplest for MVP)

### Inferred Technical Decisions
- Next.js + Tailwind (Claude's strongest stack)
- Vercel deployment (fastest path)
- No auth provider needed (simple password for admin)
- Mobile-first responsive design

---

## Claude Master Build Prompt

```
Build a Next.js 14 lead generation landing page called "TuroEscape" — a calculator that shows Turo hosts how much more money they'd make by going private.

**Product Overview:**
Single-page landing site with an interactive earnings calculator. Target audience is luxury/exotic car Turo hosts. The goal is capturing email addresses.

**Required Pages/Components:**

1. **Landing Page (`app/page.tsx`)**
   - Hero section: Headline "Stop Giving Turo 40% of Your Money" + subheadline about keeping more revenue and owning your customer relationships
   - Pain points section: Turo's high commissions, no customer ownership, strict policies
   - Calculator CTA section
   - FAQ section (5 common questions about going private)
   - Footer

2. **Calculator Component (`components/Calculator.tsx`)**
   - 3 input fields: Monthly rental days (slider 1-30), Average daily rate ($ input), Number of cars (1-20)
   - "Calculate My Earnings" button
   - On submit: Show email gate modal (overlay)

3. **Email Gate Modal (`components/EmailGate.tsx`)**
   - Overlay with: "See your results" + email input + "Show Me The Money" button
   - Stores lead in database before showing results

4. **Results Component (`components/Results.tsx`)**
   - Big headline: "You'd make $X more per year going private"
   - Comparison table: Turo vs Private (monthly revenue, platform fees, net earnings)
   - 3-year projection
   - CTA: "Get the Complete Guide" (placeholder button)

5. **Admin Dashboard (`app/admin/page.tsx`)**
   - Simple password protection (env var: ADMIN_PASSWORD)
   - Table showing all leads: email, car count, monthly days, rate, calculated yearly savings, date
   - Export CSV button
   - Stats cards: Total leads, avg yearly savings

6. **Database (`lib/db.ts`)**
   - SQLite with better-sqlite3
   - Lead table schema as defined above
   - Functions: createLead, getAllLeads, getLeadStats

**Design Requirements:**
- Use Tailwind CSS with a dark, premium aesthetic (luxury car market)
- Primary color: Emerald green (money/profit theme)
- Secondary: Slate grays
- Clean, modern, trust-building design
- Fully responsive (mobile-first)
- Smooth animations on calculator interactions

**Technical Requirements:**
- Next.js 14 App Router
- TypeScript throughout
- Server Actions for form submissions
- SQLite database (better-sqlite3)
- Environment variables for admin password
- Rate limiting on submissions (simple in-memory or upstash if easy)

**Calculator Logic:**
- Turo commission: 30% (configurable)
- Private payment processing: 5%
- Calculate monthly and yearly savings
- Show 3-year projection

**File Structure:**
```
app/
  page.tsx (landing)
  admin/page.tsx (dashboard)
  layout.tsx
components/
  Calculator.tsx
  EmailGate.tsx
  Results.tsx
  LeadTable.tsx
lib/
  db.ts (database)
  calculations.ts (math logic)
public/
next.config.js
tailwind.config.ts
```

**Quality Standards:**
- Production-ready code
- No placeholder text in UI
- Proper error handling
- Clean, commented code
- SEO meta tags
- OpenGraph image (generate or placeholder)

Build this as a complete, deployable MVP. Focus on the core flow: land → calculate → enter email → see results. Everything should work end-to-end.
```

---

## Claude Fast Prompt

```
Build a Next.js landing page with a Turo vs Private earnings calculator. 

Core flow: User enters monthly rental days, daily rate, car count → enters email to unlock results → sees how much more they'd make going private.

Stack: Next.js 14, Tailwind, SQLite (better-sqlite3), TypeScript.

Pages: Landing with calculator, results view, simple admin dashboard (password protected) to view/export leads.

Design: Dark premium theme, emerald accents, fully responsive.

Calculations: 30% Turo fee vs 5% private processing. Show monthly, yearly, 3-year savings.

Ship a working MVP with no placeholder functionality.
```

---

## Next Steps

**Ready to build?** I have the Claude Master Build Prompt prepared. 

The system will:
1. Generate the full Next.js application
2. Push to GitHub (if configured)
3. Deploy to Vercel (if configured)

**Estimated build time:** 5-10 minutes
**Estimated deployment time:** 2-3 minutes

Do you want me to start the build pipeline now?
