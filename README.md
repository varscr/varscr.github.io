# Fabio Vargas - Portfolio

A minimal, production-ready portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dark theme** with modern, minimal design
- **Single-page design** with smooth scrolling between sections
- **Dynamic animations** powered by Framer Motion (parallax, stagger, hover effects)
- **Glassmorphism effects** on interactive elements
- **Gradient dividers** between sections
- **Responsive design** optimized for all devices
- **Static export** ready for GitHub Pages deployment
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

### First-time setup

1. Go to your repository settings → Pages
2. Set source to `gh-pages` branch (root folder)
3. Save

### Deploy updates

Simply run:

```bash
npm run deploy
```

This command will:
- Build the production bundle (`npm run build`)
- Deploy the `out/` folder to the `gh-pages` branch (including the `.nojekyll` file)

After 2-3 minutes, your site will be live at `https://varscr.github.io`

### Manual deployment (alternative)

If you prefer to deploy manually:

```bash
npm run build
npx gh-pages -d out -b gh-pages --dotfiles
```

**Important:** The `--dotfiles` flag ensures the `.nojekyll` file is deployed. This file tells GitHub Pages not to use Jekyll, which would otherwise ignore the `_next/` folder containing all JavaScript and CSS files.

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
└── public/
    ├── .nojekyll           # Tells GitHub Pages to skip Jekyll processing
    └── ...                 # Other static assets
```

## Updating Content

All portfolio content is centralized in `lib/data.ts`. Edit this file to update:

- Personal information
- Professional experience
- Skills and technologies
- Featured projects
- Contact information

After updating, redeploy with:

```bash
npm run deploy
```

## License

© 2026 Fabio Vargas. All rights reserved.
