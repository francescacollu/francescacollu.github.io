 #  Francesca Collu - Personal Website

A modern, responsive personal website built with React, React Router, and Tailwind CSS.

## Features

- Modern React components with TypeScript
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- Article listing and detail pages
- About page

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

To start the development server:

```bash
npm start
# or
yarn start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `build` folder with the optimized production build.

## Project Structure

- `public/` - Static assets and HTML template
- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `lib/` - Utilities and data services
  - `styles/` - Global CSS and styles

### Article data and scripts

**Canonical source:** everything you edit for article datasets and chart outputs lives under **`article-data/<slug>/`**, where `<slug>` matches the article slug in `src/lib/articleDataRaw.ts` (for example `is-italy-a-representative-democracy`, `gender-equality`, `ageismo-femminicidi`, or `baby-names`).

- **`data/`** - Source CSVs and inputs for analysis
- **`scripts/`** - Python (or other) scripts that generate chart outputs
- **`outputs/public/`** - Files served at runtime (`fetch`, `d3.json`); copied into `public/data/articles/<slug>/` by sync
- **`outputs/bundled/`** - Plotly JSON for CRA; copied into `src/components/articles/.../charts/` by sync

**Generated copies (not committed):** `scripts/sync-article-assets.ts` copies from `article-data/` into `public/data/articles/` and into `src/.../charts/*.json`. Those paths are listed in `.gitignore` so the repo does not store duplicate bytes. Sync runs automatically before **`npm start`**, **`npm test`**, and **`npm run build`** (`prestart`, `pretest`, `prebuild`). After changing `article-data/`, run **`npm run sync:article-assets`** or any of those commands. Production **`postbuild`** runs **`npm run verify:assets`** to confirm required files exist under `public/` after the build.

## Technologies Used

- React
- TypeScript
- React Router
- Tailwind CSS
- Framer Motion (for animations)

## License

This project is licensed under the MIT License.
