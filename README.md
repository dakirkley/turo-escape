# TuroEscape Lead Generation System

## Project Structure

```
turo-escape-leadgen/
├── app/
│   ├── page.tsx              # Landing page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Calculator.tsx        # Main calculator component
│   ├── EmailGate.tsx         # Email capture modal
│   ├── Results.tsx           # Results display
│   └── LeadTable.tsx         # Admin lead table
├── lib/
│   ├── db.ts                 # Database functions
│   └── calculations.ts       # Calculator logic
├── public/
├── next.config.js
├── tailwind.config.ts
├── package.json
└── .env.local
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```
   ADMIN_PASSWORD=your-secure-password
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Features

- Interactive earnings calculator
- Email capture gate
- Turo vs Private comparison
- Admin dashboard with CSV export
- Mobile-responsive design
- Dark premium aesthetic

## Calculator Logic

- Turo commission: 30%
- Private processing: 5%
- Shows monthly, yearly, and 3-year projections
