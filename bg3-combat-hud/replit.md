# BG3 Combat HUD - Foundry VTT Module

## Overview

This is a Baldur's Gate 3-inspired combat HUD module for Foundry Virtual Tabletop. The project aims to recreate the dark fantasy RPG interface aesthetic of BG3, featuring a bottom-panel combat interface with character portraits, action economy tracking, hotbar system, and spell slot management. The module enhances combat gameplay in Foundry VTT by providing an immersive, visually appealing interface that prioritizes information hierarchy for split-second combat decisions.

While the repository structure shows a full-stack web application setup with React, Express, and database configurations, the core deliverable is a FoundryVTT module that integrates with the virtual tabletop platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme configuration supporting light/dark modes
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

**Design System**:
- Custom color palette inspired by BG3's dark fantasy aesthetic (deep charcoals, warm golds, crimson for HP)
- Typography using serif fonts (Cinzel/Spectral) for medieval RPG feel
- Component variants using class-variance-authority for consistent styling patterns
- Design tokens defined in Tailwind config for borders, shadows, and color schemes

**FoundryVTT Integration**:
- Custom Application class extending Foundry's base Application
- Handlebars templates for HUD rendering (templates/hud.hbs)
- Module manifest (module.json) defining compatibility with Foundry v11-v13
- Custom CSS styling (styles/hud.css) for BG3-inspired interface
- JavaScript modules for HUD logic and Foundry hooks integration

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for bundling server code

**API Design**:
- RESTful API structure with routes prefixed under `/api`
- Request/response logging middleware for debugging
- JSON body parsing with raw body access for webhook verification
- CORS and credential handling for cross-origin requests

**Session Management**:
- PostgreSQL-backed sessions using connect-pg-simple
- Cookie-based authentication with secure configuration

### Data Storage

**Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Schema Location**: `shared/schema.ts` defines database tables
- **Connection**: Environment variable `DATABASE_URL` for database connectivity

**Current Schema**:
- Users table with UUID primary keys, unique usernames, and password storage
- Schema defined using Drizzle's PostgreSQL table builders
- Zod integration via drizzle-zod for runtime validation

**Design Decision**: PostgreSQL chosen for relational data integrity and robust transaction support. Neon serverless provides automatic scaling and connection pooling without infrastructure management overhead.

### Authentication & Authorization

**Current Implementation**:
- User model with username/password authentication
- Session-based authentication (foundation in place)
- Storage interface abstraction (IStorage) allowing swap between MemStorage and PostgreSQL implementations

**Design Pattern**: Repository pattern via IStorage interface enables testing with in-memory storage while production uses PostgreSQL, facilitating unit tests without database dependencies.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component
- **cmdk**: Command palette/menu component
- **vaul**: Drawer component for mobile-friendly overlays

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **Drizzle ORM**: Type-safe SQL query builder and schema manager
- **drizzle-zod**: Zod schema generation from Drizzle tables

### Validation & Forms
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Performant form state management
- **@hookform/resolvers**: Zod resolver for React Hook Form integration

### Development Tools
- **Vite**: Fast build tool with HMR for development
- **esbuild**: JavaScript bundler for production builds
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code mapping for debugging
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### FoundryVTT Platform
- Foundry Virtual Tabletop v11-v13 compatibility
- Foundry Application API for custom UI rendering
- Foundry Hooks system for lifecycle events
- Foundry keybinding system for keyboard shortcuts
- Foundry settings API for user preferences

### Utilities
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Component variant management
- **clsx** & **tailwind-merge**: Conditional CSS class composition
- **nanoid**: Unique ID generation