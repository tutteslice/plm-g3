# Private Lives Matter AI Studio App

## Project Overview

Private Lives Matter is a React-based e-commerce frontend application built using Vite and TypeScript. It features a modern online store with a routing system set up for different pages like Landing, Shop, Product Details, Cart, Checkout, and various policy pages.

The application manages product categories such as "Prints", "PLM™ Designs", and "Second-Hand Gems".

### Tech Stack
*   **Framework:** React 19 (`react`, `react-dom`)
*   **Routing:** React Router v7 (`react-router-dom` using `HashRouter`)
*   **Build Tool:** Vite 6
*   **Language:** TypeScript
*   **Styling:** Custom CSS/Components (implied by the components structure)

### Architecture
*   `components/`: Contains reusable UI components like `Header`, `Footer`, `ProductCard`, and `Layout`.
*   `pages/`: Contains the main page views mapped to specific routes.
*   `hooks/`: Contains custom React hooks, notably `useCart` for managing shopping cart state globally using Context (`CartProvider`).
*   `data/`: Contains static data, such as `products.ts`.
*   `types.ts`: Defines the core domain models (`Product`, `CartItem`, `ProductCategory`).

## Building and Running

The project requires Node.js.

### Prerequisites
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Environment variables: You must set your `GEMINI_API_KEY` in a `.env.local` file. The application is configured to expose this key to the Vite environment.

### Scripts
*   **Development Server:**
    ```bash
    npm run dev
    ```
    Starts the Vite dev server locally (configured to host on `0.0.0.0:3000`).
*   **Build:**
    ```bash
    npm run build
    ```
    Builds the app for production.
*   **Preview:**
    ```bash
    npm run preview
    ```
    Locally preview the production build.

## Development Conventions

*   **TypeScript:** Ensure all new code is strongly typed. Core business models are located in `types.ts`.
*   **Routing:** The application currently utilizes `HashRouter`. Ensure navigation functions and Link components are compatible with hash-based routing.
*   **Path Aliasing:** The `@` alias is configured in `vite.config.ts` to map to the root directory `.` for easier absolute imports, though relative imports are commonly used in the main app file.
*   **State Management:** Cart state is handled via React Context in the `useCart` hook. Other global state needs might be managed similarly or kept local to pages/components.
