# DataNexus.ai

A modern marketplace for discovering, comparing, and evaluating enterprise-grade datasets. Built with React, TypeScript, and Firebase.

## Features

- **AI-Powered Search** - Intelligent search across 8+ data categories (Postal, Email, Healthcare, POI, etc.)
- **Visual Analytics** - Interactive charts for data quality, coverage, and trends
- **Dataset Comparison** - Side-by-side analysis of multiple datasets
- **Compliance Tracking** - Built-in GDPR, ISO 27001, and SOC 2 verification
- **Firebase Authentication** - Secure user authentication and protected routes
- **Data Previews** - Sample data and detailed metadata for each dataset

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Firebase Authentication
- Recharts (data visualization)
- Framer Motion (animations)
- React Router

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit http://localhost:8080

### Environment Variables

Create a `.env` file with Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |

## Project Structure

```
src/
├── components/       # UI components and analytics
├── pages/           # Route pages (Landing, Search, ProductDetail, etc.)
├── data/            # Mock dataset definitions
├── hooks/           # Custom React hooks (useAuth, useAnalytics)
├── lib/             # Firebase and utility functions
└── utils/           # Helper functions
```
---

**Josh** - [@joshhuu](https://github.com/joshhuu)
