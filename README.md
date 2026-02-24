# Private Lives Matter - E-Commerce Storefront

Private Lives Matter is a modern, React-based e-commerce frontend built to support a unique clothing brand dedicated to rave and festival culture. 

Born out of frustration at festival security gates, our mission is simple: **"To the peak, not the precinct."** Every item in our signature PLM™ Designs collection features a discreetly hand-sewn hidden pocket, allowing our community to securely stash their essentials and focus entirely on the music and the moment.

## Features

- **Dynamic Shop Filtering:** A robust, real-time filtering system that allows users to sort and narrow down products by Brand, Category (e.g., Swimwear, Activewear, Underwear), and specific Collections.
- **Interactive Product Galleries:** Product cards feature hoverable thumbnail galleries that instantly update the main image without needing to navigate away.
- **Image Magnification:** A custom-built, responsive image magnifier allows users to examine the high-quality textures, prints, and details of the clothing by simply hovering over the product images.
- **Cart Management:** A persistent shopping cart using local storage, featuring size and color selection validation, unique item ID generation, and an interactive sidebar.
- **Responsive Design:** Fully responsive, mobile-first design built with Tailwind CSS, ensuring a seamless shopping experience across all devices.

## Tech Stack

- **Framework:** React 19 (`react`, `react-dom`)
- **Routing:** React Router v7 (`react-router-dom` using `HashRouter`)
- **Build Tool:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Building and Running Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/tutteslice/plm-g3.git
   cd plm-g3
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your required API keys (if applicable to your environment):
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Scripts

- **Start Development Server:**
  ```bash
  npm run dev
  ```
  Starts the Vite dev server locally.

- **Build for Production:**
  ```bash
  npm run build
  ```
  Compiles the application into static files in the `dist` directory.

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
  Locally preview the compiled production build.

## Project Structure

*   `components/`: Reusable UI elements (Header, Product Cards, Image Magnifier, Cart Sidebar).
*   `pages/`: Main route views (Landing, Shop, Product Detail, Checkout, Media, Policies).
*   `hooks/`: Custom React hooks (`useCart`, `useProducts`) managing global state via Context.
*   `data/`: Static product inventory and seed data (`products.ts`).
*   `types.ts`: Core TypeScript interfaces and enums mapping the domain models.
