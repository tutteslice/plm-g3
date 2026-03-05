# Tech Stack

## Core Technologies

- React 19 with TypeScript
- React Router v7 (using HashRouter)
- Vite 6 (build tool)
- Tailwind CSS (styling)

## Project Configuration

- TypeScript target: ES2022
- Module system: ESNext with bundler resolution
- Path alias: `@/*` maps to project root
- JSX: react-jsx transform

## Common Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build to dist/ directory
npm run preview      # Preview production build locally

# Installation
npm install          # Install dependencies
```

## Environment Variables

Create `.env.local` in project root:
```
GEMINI_API_KEY=your_api_key_here
```

Accessed in code via `process.env.GEMINI_API_KEY`

## Key Dependencies

- react, react-dom: ^19.1.0
- react-router-dom: ^7.6.2
- @vitejs/plugin-react: ^5.0.0
- typescript: ~5.8.2

## Build Configuration

- Dev server: port 3000, host 0.0.0.0
- Vite plugin: React with Fast Refresh
- Path resolution: @ alias for root imports
