# Project Learnings & Guidelines

This document tracks mistakes, best practices, and guidelines specific to this project to avoid rethinking and ensure a consistent, professional workflow.

## 1. Database & State Management
- **Mistake to Avoid**: Trusting frontend cart calculations. 
  - *Correction*: The backend must always recalculate the order total based on the products' current prices stored in the database.
- **Mistake to Avoid**: Updating historical order prices when a product price changes.
  - *Correction*: Store a snapshot of the product details (price, name) in the `OrderItem` table at the time of checkout.
- **Mistake to Avoid**: Destructive product deletions.
  - *Correction*: Use soft-deletes (e.g., `status: 'archived'`) so historical orders referencing the product don't break.
- **Mistake to Avoid**: Using local state (e.g., `activeTab`) for a multi-page e-commerce app.
  - *Correction*: Use a proper routing library (e.g., `react-router-dom`) so URLs are shareable, SEO-friendly, and users can use the back button.

## 2. Authentication & Security
- **Mistake to Avoid**: Hiding the Admin panel only via frontend UI checks (e.g., conditionally rendering a link).
  - *Correction*: Enforce Role-Based Access Control (RBAC) at the backend API level. Verify the user's role (`admin`) via a secure session/JWT for every protected operation.
- **Mistake to Avoid**: Storing sensitive user data or auth tokens insecurely (e.g., plain `localStorage` without HTTP-only cookies for sessions where applicable).
  - *Correction*: Use secure authentication mechanisms, preferably HTTP-only cookies for session tokens.

## 3. UI / UX Standards
- **Mistake to Avoid**: Generic UI components and over-animation.
  - *Correction*: Stick to the premium leather brand aesthetic. Use subtle transitions, white/off-white palette, and proper spacing. Avoid neon colors or excessive gradients.
- **Mistake to Avoid**: Missing loading states for asynchronous operations.
  - *Correction*: Always use skeleton loaders or spinners for data fetching (Products, Orders, Admin Dashboard) to avoid blank screens.

## 4. Workflows
- **Mistake to Avoid**: Losing cart data when a user signs up/logs in during checkout.
  - *Correction*: Merge the local unauthenticated cart with the user's persistent backend cart upon successful login.
- **Mistake to Avoid**: Not checking stock constraints during checkout.
  - *Correction*: Validate available stock atomically on the backend right before confirming the order creation.

## 5. Deployment & Configuration
- **Mistake to Avoid**: Leaking environment variables to the frontend.
  - *Correction*: Ensure only variables prefixed with `VITE_` are exposed to the client. Keep all database URIs and JWT secrets strictly on the backend.
