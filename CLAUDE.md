# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 application built with Vite that provides a grade calculator interface. It connects to a GraphQL backend to convert numerical scores to letter grades. This is a modern conversion of a legacy Angular 6 application.

## Development Commands

### Local Development
- `npm run dev` - Start Vite dev server at http://localhost:4200/ (auto-opens browser)
- `npm run preview` - Preview production build locally

### Building
- `npm run build` - TypeScript check + production build (output to `dist/`)
- `npm run build:dev` - Build with development environment configuration
- `npm run build:prod` - Build with production environment configuration

### Testing & Quality
- `npm run test` - Run unit tests via Vitest
- `npm run test:ui` - Run tests with UI interface
- `npm run type-check` - Run TypeScript type checking without building

## Architecture

### Technology Stack
- **Framework:** Vue 3 with Composition API (`<script setup>`)
- **Build Tool:** Vite 7
- **Language:** TypeScript
- **GraphQL Client:** Apollo Client v3 with `@vue/apollo-composable`
- **Styling:** Tailwind CSS 4
- **Testing:** Vitest + Vue Test Utils

### Project Structure
```
src/
├── apollo/
│   └── client.ts          # Apollo Client configuration
├── composables/
│   └── useGrade.ts        # GraphQL query composable
├── App.vue                # Main application component
├── main.ts                # Application entry point
└── env.d.ts               # TypeScript environment definitions
```

### GraphQL Integration
Apollo Client is configured in [src/apollo/client.ts](src/apollo/client.ts):
- GraphQL endpoint URI is environment-specific (from `import.meta.env.VITE_GRAPHQL_URI`)
- InMemoryCache with `addTypename: false`
- Fetch policy set to `no-cache`
- Apollo client provided at app root via Vue's `provide/inject` in [main.ts](src/main.ts)

### Composables Pattern
The application uses Vue 3 Composables (reusable composition functions):
- **useGrade** ([composables/useGrade.ts](src/composables/useGrade.ts)) - Handles GraphQL query for grade calculation
  - Uses `useLazyQuery` for manual query execution
  - Returns reactive refs: `grade`, `isLoading`, `error`
  - Async function: `getGradeFromScore(score: number)`

### Environment Configuration
Three environment files in project root:
- **`.env`** (default/development): `http://localhost:8080/graphql`
- **`.env.development`** (staging): `http://13.250.41.39:8082/graphql`
- **`.env.production`**: `http://43.208.224.38:8082/graphql`

Access via `import.meta.env.VITE_*` (all env vars must be prefixed with `VITE_`)

### Component Architecture
Single-file component structure with Composition API:
- `<script setup>` - Uses Composition API with automatic component registration
- `<template>` - Vue template syntax (v-model, v-if, @click, :class)
- `<style scoped>` - Component-scoped CSS

### Key Vue 3 Patterns Used
- **Reactive State:** `ref()` for reactive values
- **Computed Properties:** `computed()` for derived state
- **Template Directives:**
  - `v-model` for two-way binding
  - `v-if` for conditional rendering
  - `:class` for dynamic class binding
  - `@click` / `@submit.prevent` for event handling

## Docker Deployment

Multi-stage Docker build:
1. **Build stage:** Node 22 Alpine - installs deps and runs `npm run build`
2. **Production stage:** nginx Alpine - serves static files

Build with environment-specific configuration:
```bash
# Development build
docker build --build-arg BUILD_MODE=development -t grade-app:dev .

# Production build (default)
docker build -t grade-app:prod .
```

Run container:
```bash
docker run -p 80:80 grade-app:prod
```

The nginx configuration ([nginx-custom.conf](nginx-custom.conf)) handles SPA routing by serving `index.html` for all routes.

## Vite Configuration

[vite.config.ts](vite.config.ts) key settings:
- Dev server on port 4200 (matches original Angular port)
- Path alias: `@` → `./src`
- Sourcemaps enabled for non-production builds
- Options API disabled for smaller bundle size
- Auto-opens browser on dev server start

## Migration Notes

This project was migrated from Angular 6 to Vue 3:
- Angular services → Vue composables
- RxJS Observables → async/await with reactive refs
- Angular CLI → Vite
- Karma/Jasmine → Vitest

Key conversions:
- `ngModel` → `v-model`
- `*ngIf` → `v-if`
- `(click)` → `@click`
- `[class]` → `:class`
- `environment.graphqlUri` → `import.meta.env.VITE_GRAPHQL_URI`

## Performance Benefits

Compared to the original Angular 6 application:
- **Bundle Size:** ~260KB (Vue) vs ~larger Angular bundle
- **Build Speed:** Vite builds in ~1s vs longer Angular CLI builds
- **Dev Experience:** Instant HMR with Vite
- **Simpler Codebase:** Fewer config files, less boilerplate

## Important Notes

- All environment variables must be prefixed with `VITE_` to be exposed to the client
- Apollo Client is provided at the app root - all components have access via `@vue/apollo-composable`
- Tailwind CSS is imported via `style.css` in [main.ts](src/main.ts)
- TypeScript strict mode is enabled
- Path alias `@/` can be used for imports (e.g., `import { useGrade } from '@/composables/useGrade'`)
