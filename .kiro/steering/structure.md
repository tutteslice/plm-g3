# Project Structure

## Directory Organization

```
/
├── components/       # Reusable UI components
├── pages/           # Route-level page components
├── hooks/           # Custom React hooks (Context providers)
├── data/            # Static data and seed files
├── public/          # Static assets (images, robots.txt, sitemap)
├── dist/            # Production build output (generated)
└── node_modules/    # Dependencies (generated)
```

## Key Files

- `App.tsx` - Root component with routing setup
- `types.ts` - Core TypeScript interfaces and enums
- `constants.ts` - Application constants (shipping, thresholds)
- `index.tsx` - Application entry point
- `index.html` - HTML template
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

## Architecture Patterns

### State Management
- React Context API for global state
- Custom hooks: `useCart`, `useProducts`
- Providers wrap app in `App.tsx`: ProductsProvider → CartProvider → HashRouter

### Routing
- HashRouter (not BrowserRouter) for compatibility
- Route structure defined in `App.tsx`
- Layout component wraps all routes
- ScrollToTop component handles scroll restoration

### Component Structure
- Functional components with TypeScript
- Props interfaces defined inline or in types.ts
- React.FC type for component definitions

### Data Flow
- Product data: `data/products.ts` → ProductsProvider → components
- Cart state: localStorage ↔ CartProvider ↔ components
- Cart persists across sessions via localStorage key: `privateLivesMatterCart`

## Naming Conventions

- Components: PascalCase (e.g., `ProductCard.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useCart.tsx`)
- Types/Enums: PascalCase (e.g., `ProductBrand`, `CartItem`)
- Files: Match component/hook name

## Type System

Core types in `types.ts`:
- `Product` - Product data model
- `CartItem` - Product + cart-specific fields (quantity, selections, cartItemId)
- `ProductBrand`, `ProductCategory` - Enums for classification
- `SocialLink`, `BrandLinkInfo` - UI helper types

## Styling Approach

- Tailwind CSS utility classes
- Responsive design with mobile-first breakpoints
- Custom color scheme via Tailwind config (primary, primary-text, etc.)
- Fixed header with appropriate padding on main content
