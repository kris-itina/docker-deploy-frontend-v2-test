# Grade Calculator - Vue 3 + Vite

A simple grade calculator application built with Vue 3, TypeScript, Vite, and Apollo GraphQL. Migrated from Angular 6.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation build tool
- **TypeScript** - Type-safe JavaScript
- **Apollo Client** - GraphQL client
- **Bootstrap 5** - CSS framework
- **Vitest** - Unit testing framework

## Environment Configuration

Three environments supported:
- **Development** (`.env`): localhost:8080
- **Staging** (`.env.development`): 13.250.41.39:8082
- **Production** (`.env.production`): 52.74.162.217:8085

## Docker Deployment

```bash
# Build Docker image
docker build -t grade-app .

# Run container
docker run -p 80:80 grade-app
```

## Project Structure

```
src/
├── apollo/          # Apollo Client configuration
├── composables/     # Vue composables (reusable logic)
├── App.vue          # Main component
└── main.ts          # Application entry point
```

## Available Scripts

- `npm run dev` - Start dev server (http://localhost:4200)
- `npm run build` - Build for production
- `npm run build:dev` - Build with staging environment
- `npm run build:prod` - Build with production environment
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run type-check` - Run TypeScript type checking

## GraphQL API

Query: `getGradeFromScore($score: Float!)`

Returns letter grade (A, B, C, D, or F) based on numeric score input.

## Development

The application uses Vue 3 Composition API with `<script setup>` syntax for a modern, reactive development experience. See [CLAUDE.md](CLAUDE.md) for detailed architecture documentation.
