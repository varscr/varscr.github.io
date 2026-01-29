# Fabio Vargas - Portfolio

A minimal, production-ready portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Single-page design** with smooth scrolling between sections
- **Static export** ready for GitHub Pages deployment
- **Subtle animations** powered by Framer Motion
- **Responsive design** optimized for all devices
- **SEO optimized** with proper metadata and Open Graph tags

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages (static export)

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

Build the static export:

```bash
npm run build
```

This creates an `out` directory with the static files ready for deployment.

## Deployment to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. The static files will be in the `out` directory

3. Deploy the `out` directory contents to your GitHub Pages:

   **Option A: Manual deployment**
   ```bash
   # From the out directory
   git init
   git add .
   git commit -m "Deploy portfolio"
   git branch -M gh-pages
   git remote add origin https://github.com/VarScr/varscr.github.io.git
   git push -f origin gh-pages
   ```

   **Option B: Using npm package**
   ```bash
   npx gh-pages -d out -b gh-pages
   ```

4. Go to your repository settings → Pages → Set source to `gh-pages` branch

5. Your site will be live at `https://varscr.github.io`

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Section components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/                 # Reusable UI components
│       ├── Section.tsx
│       └── Card.tsx
├── lib/
│   └── data.ts             # Centralized content data
└── public/                 # Static assets
```

## Updating Content

All portfolio content is centralized in `lib/data.ts`. Edit this file to update:

- Personal information
- Professional experience
- Skills and technologies
- Featured projects
- Contact information

After updating, rebuild the project and redeploy.

## License

© 2026 Fabio Vargas. All rights reserved.
