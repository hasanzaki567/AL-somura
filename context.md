# Al-Sumora Project Context

## Existing Architecture
- **Frontend**: React 19 single-page application built with Vite.
- **Styling**: Tailwind CSS v4, uses `lucide-react` for icons and `motion` for animations.
- **State Management**: Local React state (`useState`) in `App.tsx` handling navigation (ActiveTab), CartItems, and modals.
- **Backend**: Currently no actual backend integration. `package.json` includes `express` but there is no API server or database connected.
- **Data Storage**: Hardcoded mock data residing in `src/data/` (`products.ts`, `boutiques.ts`, `reviews.ts`).
- **Database Structure**: None exists yet. The mock data defines `Product`, `ProductColor`, `CartItem`, `MonogramConfig`, `Boutique`, and `Review` interfaces in `src/types.ts`.

## Current Features
- **Views**: Home, Shop, About, Contact, Product Details.
- **Cart**: Slide-out cart drawer, add/update/remove cart items.
- **Customization**: Bespoke / Monogram options.
- **Navigation**: Tab-based single-page navigation without a routing library like `react-router-dom`.
- **Modals**: Legal (Privacy/Terms), Search overlay.

## Changes Being Made (Planned)
- Implementing a real backend API (Express) with a connected database.
- Implementing robust Authentication & Authorization (Admin vs Customer roles).
- Migrating hardcoded products to a database schema.
- Implementing persistent carts, order creation with price snapshots, and stock management.
- Creating a secure, hidden Admin dashboard for product, order, and customer management.
- Transitioning tab-based navigation to proper URL-based routing (`react-router-dom`).

## Important Assumptions
- The current design/UI components are generally acceptable and should be reused/extended rather than replaced.
- The project is currently a frontend-only demo and needs a full backend infrastructure built from scratch using the requested technologies (Express).
- We can choose the database technology (e.g., PostgreSQL with Prisma or MongoDB) since none is currently set up.

## Migration Decisions
- We will seed the new database with the existing hardcoded data from `src/data/products.ts` so no existing visual products are lost.
- Moving from local state to a proper global state/context for Auth and Cart.

## Potential Risks
- Transitioning from simple state-based tabs to a routing library might require refactoring how modals and global states (like `isCartOpen`) are managed.
- Ensuring the new backend securely integrates with the frontend without exposing sensitive routes.

## How Existing Data is Being Protected
- Hardcoded data will be used as the initial seed for the database.
- No files will be destructively deleted until the new database pipeline is fully tested and verified.

## New Features Implemented
- *(To be updated as features are built)*
