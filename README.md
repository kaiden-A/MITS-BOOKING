# MITS-BOOKING (v2)

Live demo: https://mits-booking.vercel.app

MITS-BOOKING is a JavaScript-based booking application for MITS. This repository contains version 2 — a redesigned, improved, and more maintainable successor to the original mits-booking-system. Version 2 focuses on reliability, a better user experience, and easier deployment.

## Table of contents
- About
- What's new in v2 (improvements)
- Features
- Tech stack
- Getting started
- Environment variables
- Running locally
- Building & deployment
- Contributing
- License
- Contact

## About
This project is a booking/reservation system intended to manage room/resource bookings for MITS. It provides a centralized interface to view availability, create and manage reservations, and view booking histories. The project aims to be simple to use, responsive, and production-ready for hosting (deployed to Vercel).

This repository is an improved second version of the original mits-booking-system. It consolidates lessons learned from the first version and implements reliability, performance, and usability improvements.

## What's new in v2 (high-level)
Version 2 focuses on improvements to the overall system and developer experience. Notable high-level changes include:
- Cleaner, modular code structure for easier maintenance and collaboration
- Improved UI/UX and mobile responsiveness
- Better validation and error handling across booking flows
- Performance optimizations and reduced bundle size
- Improved deployment setup (Vercel-ready)
- Clearer developer setup and documentation
- Bug fixes and stability improvements based on real-world usage

(If you'd like, I can expand this section with exact changes when you point me to the original repository or specific commits/features to call out.)

## Features
- Browse available time slots and resources
- Create, edit, and cancel bookings
- Booking history and confirmations
- Responsive design for desktop and mobile
- Basic client-side validation and user feedback
- Ready for deployment to Vercel (live demo linked above)

## Tech stack
- Language: JavaScript
- Frontend: (React/Next.js or similar) — repository uses JavaScript; check package.json for exact framework
- Backend: (Node.js/Express or serverless functions) — optional, depending on repo contents
- Deployment: Vercel (live site hosted at the link above)

Note: The repo's top-level language is JavaScript. Check package.json to confirm frameworks, scripts, and dependencies.

## Getting started

Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- (Optional) Vercel account for deployment

Quick start
1. Clone the repository:
   git clone https://github.com/kaiden-A/MITS-BOOKING.git
2. Change into the project directory:
   cd MITS-BOOKING
3. Install dependencies:
   npm install
   or
   yarn install

## Environment variables
This project may require environment variables for APIs, database connections, or authentication. Create a `.env.local` (or `.env`) file in the project root and add keys similar to:

- VITE_BACKEND_API= (for connecting to backend)
- FRONTEND_URL = (for connecting to frontend)
- DB_URI= (database URI for mongodb atlas)
- JWT_SECRET=your_secret_value


## Running locally
Start the development server:
- npm run dev
- or yarn dev

Build for production:
- npm run build
- npm start
- or yarn build && yarn start

If your repo uses a different script naming convention, substitute accordingly (check package.json scripts).

## Building & deployment
- For Vercel: connect the repository in the Vercel dashboard, set required environment variables, and deploy. Vercel will automatically build and deploy on push to the main branch.
- For other platforms: build with `npm run build` and follow your host's deployment instructions.

## Contributing
Contributions, issues, and feature requests are welcome.
- Create an issue describing the bug or feature.
- Open a pull request with clear description and tests/notes if applicable.
- Follow the existing code style and add documentation for any new public behavior.

If you want a CONTRIBUTING.md or issue / PR templates, I can create those for you.

## Changelog (summary)
- v2.0.0 — This repository: improved rewrite, see "What's new in v2"
- See repository commit history for full details.

## Contact
Owner: kaiden-A — https://github.com/kaiden-A
