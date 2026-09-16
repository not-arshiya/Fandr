# Fandr

A Patreon / Buy Me a Coffee-style creator support platform. Visitors can discover a creator's public profile and send them one-time financial support through a secure Stripe checkout.

# Features

- **Google OAuth authentication** via NextAuth.js
- **Custom public creator profiles** at `/username`
- **One-time payments** via Stripe Checkout
- **Server-verified payment recording** via Stripe webhooks (not just client-side redirects)
- **MongoDB** for storing users and payment records

# Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [NextAuth.js](https://next-auth.js.org/) (Google provider)
- [Stripe](https://stripe.com/) (Checkout + Webhooks)
- [Tailwind CSS](https://tailwindcss.com/)

# How it works

1. A user signs in with Google via NextAuth.
2. On first login, a user document is created in MongoDB.
3. The user picks a unique, lowercase username, generating a public profile at `/username`.
4. Visitors to that profile can choose an amount and click "Support," which creates a Stripe Checkout session.
5. On successful payment, Stripe sends a signed webhook event to the app's `/api/webhook` route.
6. The webhook signature is verified server-side, then the payment is recorded in MongoDB — this can't be spoofed by a client redirect alone.

# Running locally

1. Clone the repo and install dependencies:
```bash
   npm install
```
2. Create a `.env.local` file with the following variables:
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

3. Run the dev server:
```bash
   npm run dev
```
4. In a separate terminal, forward Stripe webhooks locally:
```bash
   stripe listen --forward-to localhost:3000/api/webhook
```

# Status

This is a portfolio/learning project built to demonstrate a full-stack payment and authentication flow. Stripe is currently running in **test mode** — no real payments are processed.

# Live Demo: 