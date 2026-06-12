# Capital Mota Clothing

Capital Mota Clothing is a Vite, React, TypeScript, shadcn-ui, and Tailwind CSS storefront for an Austin-based heavyweight streetwear brand rooted in 420 culture.

The site is built as a production-facing brand website for Capital Mota, with SEO metadata, Open Graph sharing, product-oriented structured data, and a clean local development workflow.

## Live Site

https://capitalmota.com

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Supabase
- React Query
- Framer Motion

## Local Development

Clone the repository:

```bash
git clone https://github.com/aperez8910-maker/capitalmota.git
cd capitalmota
```

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Setup

This project uses Supabase environment variables at runtime. Keep local values in your local environment file and do not commit real runtime values.

Required variables:

```bash
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

## Production Checklist

Before publishing changes:

- Run `npm install`
- Run `npm run build`
- Confirm the storefront loads locally
- Confirm metadata points to `https://capitalmota.com/`
- Confirm no private runtime files are committed
- Push to GitHub

## Built By

Capital Mota Clothing storefront maintained by Alexander Emilio Perez.
