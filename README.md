# Omvandling

A Vue + Vite app for converting ingredient measurements using density values from `ingredienser.json`.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview build locally

```bash
npm run preview
```

## Scripts

- `npm run dev`: Start Vite development server.
- `npm run build`: Type-check and build production assets.
- `npm run preview`: Serve the built app from `dist/`.

## Dependencies

- Runtime: `vue`
- Dev: `vite`, `@vitejs/plugin-vue`, `typescript`, `vue-tsc`, `@types/node`, `@vue/tsconfig`

## Data source

- `public/ingredienser.json`
- Structure: ingredient name as key, with `densitet` in `kg/dm3`.

## Deployment configuration

- GitHub Actions workflow: `.github/workflows/build.yml`
- Uses `skywarth/vite-github-pages-deployer@v1.5.0`
- Deploy base path is configured to `/` (`public_base_path: /`)
- Repository setting required: `Settings -> Pages -> Build and deployment -> Source: GitHub Actions`
