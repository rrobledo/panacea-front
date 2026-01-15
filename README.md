# Panacea Frontend

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>
<br/>

A modern React/TypeScript enterprise application for bakery production management. Built with Ant Design, AG Grid, and a component-driven architecture with generic reusable data handling patterns.

This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## Table of Contents

- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [API & Data Fetching](#api--data-fetching)
- [Routing Structure](#routing-structure)
- [Styling Approach](#styling-approach)
- [Key Features](#key-features)
- [Configuration](#configuration)
- [Learn More](#learn-more)
- [Improvements Roadmap](#improvements-roadmap)

---

## Available Scripts

### Running the development server.

```bash
npm run dev
```

### Building for production.

```bash
npm run build
```

### Running the production server.

```bash
npm run start
```

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Core** | React | 18.3.1 |
| | TypeScript | 4.9.5 |
| | React Router DOM | 6.23.1 |
| **UI Library** | Ant Design | 5.18.0 |
| | Ant Design Icons | 5.3.7 |
| **Data Grid** | AG Grid React | 31.3.4 |
| **Build Tool** | Vite | 3.x+ |
| **HTTP Client** | Axios | 1.7.2 |
| **Date Handling** | Day.js | 1.11.12 |
| **Charting** | Chart.js / chartjs-react | 4.2.1 |
| **Auth** | reactjs-social-login | 2.6.3 |
| **Print** | react-to-print | 2.15.1 |

---

## Project Structure

```
panacea-front/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── DataList.tsx      # Generic list view with CRUD actions
│   │   ├── DataCreate.tsx    # Generic create form wrapper
│   │   ├── DataEdit.tsx      # Generic edit form wrapper
│   │   ├── DataGrid.tsx      # AG Grid data display
│   │   ├── DataProvider.tsx  # API communication class
│   │   ├── InputDataGrid.tsx # Inline editable grid
│   │   ├── InputListSearch.tsx # Modal search picker
│   │   ├── ClipboardImageItem.tsx # Image paste handler
│   │   └── GenericFilter.tsx # Reusable filter form
│   │
│   ├── cruds/                # CRUD operation modules
│   │   ├── insumos/          # Raw materials management
│   │   ├── productos/        # Products management
│   │   ├── proveedores/      # Suppliers management
│   │   ├── remitos/          # Shipping records
│   │   └── facturas/         # Invoices & payments
│   │
│   ├── reportes/             # Reporting modules
│   │   └── costos/           # Cost analysis reports
│   │       ├── Produccion.tsx
│   │       ├── Ventas.tsx
│   │       ├── Planning.tsx
│   │       ├── Programacion.tsx
│   │       ├── Estimaciones.tsx
│   │       └── PrecioProductos.tsx
│   │
│   ├── utils/                # Utility functions and hooks
│   │   ├── localStorage.ts   # useLocalStorage hook
│   │   └── useRunOnce.ts     # Single execution hook
│   │
│   ├── App.tsx               # Main App component
│   ├── Main.tsx              # Router & layout wrapper
│   └── index.tsx             # Entry point
│
├── public/                   # Static assets
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite bundler config
└── .env                      # Environment variables
```

---

## Architecture Overview

### Design Patterns

1. **Container/Presentational Pattern** - Generic wrapper components with props
2. **Singleton Pattern** - DataResource instance initialized once in Main.tsx
3. **Custom Hooks Pattern** - useLocalStorage, useRunOnce for reusable logic
4. **Compound Components** - DataCreate/Edit contain Form items
5. **Forward Ref Pattern** - GenericFilter uses forwardRef for parent access
6. **Render Props** - filterAsForm, summaryList passed as JSX elements

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Main.tsx                              │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │  DataResource   │    │  Auth State     │                 │
│  │  (API Client)   │    │  (localStorage) │                 │
│  └────────┬────────┘    └────────┬────────┘                 │
│           │                      │                           │
│           ▼                      ▼                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              React Router (Routes)                      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
    │   DataList    │ │  DataCreate   │ │   DataEdit    │
    │   Component   │ │   Component   │ │   Component   │
    └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
            │                 │                 │
            ▼                 ▼                 ▼
    ┌─────────────────────────────────────────────────────┐
    │              Domain-Specific Modules                 │
    │  (productos, insumos, remitos, facturas, reportes)  │
    └─────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Core Generic Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| **DataList** | Generic list view with CRUD actions, filtering, summary | `ds`, `resource`, `columns`, `filters`, `summary` |
| **DataCreate** | Generic create form wrapper | `ds`, `resource`, form fields |
| **DataEdit** | Generic edit form wrapper with data loading | `ds`, `resource`, `editable` |
| **DataGrid** | AG Grid data display | `ds`, `resource`, `colDefs` |
| **InputDataGrid** | Inline editable grid for nested data | `colDefs`, `value`, `onChange` |
| **InputListSearch** | Modal search picker for lookups | `ds`, `resource`, `searchFieldName` |
| **DataProvider** | API communication class | `endpoint` |

### CRUD Module Pattern

Each CRUD module follows a standardized pattern:

```
cruds/[resource]/
├── [resource].tsx        # List view (uses DataList)
├── [resource]Create.tsx  # Create form (uses DataCreate)
└── [resource]Edit.tsx    # Edit form (uses DataEdit)
```

### Nested Resources

- **Productos → Costos** (product costs breakdown)
- **Facturas → Pagos** (invoice payments)

Both use `resourceParent` parameter for hierarchical routing.

---

## State Management

### Strategy: Minimal Local State + localStorage

| Level | Technology | Use Case |
|-------|-----------|----------|
| **Component Local** | React `useState` | Form inputs, UI state |
| **Browser Storage** | Custom `useLocalStorage` | Auth token, user profile |
| **Global** | Google Sign-In Context | Authentication state |

### Authentication Flow

```
App Launch → Check localStorage (token, profile)
  → If empty: Show Google Login Button
  → If present: Show Main App with Routes
  → Logout: Clear localStorage, reset state
```

---

## API & Data Fetching

### DataProvider Class

Located at `/src/components/DataProvider.tsx`, manages all HTTP communication:

```typescript
class DataResource {
  getList(resource: string, filters?: any)     // GET list with filters
  get(resource: string, id: any)               // GET single item
  post(resource: string, data: any)            // POST create
  patch(resource: string, id: any, data: any)  // PATCH update
  delete(resource: string, id: any, data: any) // DELETE
  getUrl(url: string)                          // Generic GET
}
```

### API Endpoints

- **Production:** `https://panacea-one.vercel.app/costos`
- **Development:** `http://localhost:8000/costos`

### Data Transformation

- **Dates:** Converted between Dayjs objects and "YYYY-MM-DD" strings
- **Images:** Encoded to base64 for API transmission
- **Lookups:** Resolved from related resources

---

## Routing Structure

### Route Categories

**Dashboard:**
```
/                    → Produccion report (home)
/main_dashboard      → MainDashboard
```

**CRUD Routes (RESTful pattern):**
```
/{resource}          → List view
/{resource}/create   → Create form
/{resource}/edit/:id → Edit form
```

**Available Resources:**
- `/remitos` - Shipping records
- `/productos` - Products
- `/insumos` - Raw materials
- `/proveedores` - Suppliers
- `/ctacteprov` - Invoices (accounts payable)

**Nested Resources:**
```
/productos/:producto_id/costos/create
/productos/:producto_id/costos/edit/:id
/ctacteprov/:factura_id/pagos/create
/ctacteprov/:factura_id/pagos/edit/:id
```

**Reports:**
- `/costos_materia_prima` - Raw material costs
- `/planning` - Planning report
- `/programacion` - Programming/scheduling
- `/produccion` - Production report
- `/ventas` - Sales report
- `/precioproductos` - Product prices
- `/estimaciones` - Estimates

---

## Styling Approach

### CSS Strategy: Hybrid

1. **Ant Design Theming** - `theme.useToken()` for consistent colors
2. **Inline Styles** - Layout styling, grid dimensions
3. **CSS Classes** - `.selected-row`, AG Grid themes
4. **Responsive Design** - Layout.Sider with breakpoint="lg"

### Theme Support

- Light/Dark mode via Ant Design theme system
- AG Grid Quartz theme (adapts to light/dark)

---

## Key Features

### Authentication
- Google OAuth 2.0 integration
- Token persistence in localStorage
- Conditional UI rendering

### Data Grid (AG Grid)
- Multiple column types (text, numbers, dates, select)
- Column grouping
- Row selection (single/multiple)
- Editable cells
- Custom cell renderers

### Advanced Forms
- Image clipboard paste handler
- Searchable lookup fields
- Nested inline data grids
- Date pickers with format control
- Currency formatting

### Reporting
- Sales reports with client breakdown
- Production reports
- Cost analysis reports
- Planning & scheduling
- Print functionality via react-to-print

### Financial Module
- Invoice tracking
- Supplier payment tracking
- Budget categories (MATERIA_PRIMA, SUELDO, etc.)
- Payment types (EFECTIVO, TRANSFERENCIA, etc.)

---

## Configuration

### Environment Variables

```env
BUILD_PATH='./build'
```

### TypeScript Configuration

- Target: ES5
- JSX: react-jsx
- Strict mode enabled
- Module resolution: node

### Build Scripts

```bash
npm start    # Development server
npm build    # Production build
npm test     # Run tests
```

---

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://ant.design/components/overview)
- **AG Grid React** [Docs](https://www.ag-grid.com/react-data-grid/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Google Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

---

## Improvements Roadmap

### High Priority

#### 1. Error Handling & User Feedback
- **Current:** Console.log for errors, no user-facing error messages
- **Improvement:** Implement global error boundary, toast notifications (Ant Design message/notification), and proper error states in components
- **Files:** All components with API calls

#### 2. Loading States
- **Current:** Basic Spin component, inconsistent across components
- **Improvement:** Add skeleton loaders, standardize loading patterns, implement Suspense boundaries
- **Files:** `DataList.tsx`, `DataEdit.tsx`, report components

#### 3. Form Validation
- **Current:** Minimal validation, inconsistent rules
- **Improvement:** Implement comprehensive validation schemas (consider Zod or Yup), add field-level validation feedback
- **Files:** All `*Create.tsx` and `*Edit.tsx` files

#### 4. TypeScript Strictness
- **Current:** Many `any` types used throughout
- **Improvement:** Define proper interfaces for all data models, API responses, and props
- **Files:** All components, especially `DataProvider.tsx`

### Medium Priority

#### 5. State Management
- **Current:** Prop drilling, localStorage for global state
- **Improvement:** Consider React Context for shared state (DataResource, user), or lightweight state library (Zustand)
- **Impact:** Cleaner component tree, easier testing

#### 6. Code Splitting & Lazy Loading
- **Current:** All routes loaded upfront
- **Improvement:** Implement React.lazy() for route components, reduce initial bundle size
- **Files:** `Main.tsx`, route definitions

#### 7. API Layer Improvements
- **Current:** Direct axios calls, no caching, no retry logic
- **Improvement:** Implement React Query or SWR for data fetching with caching, background updates, and automatic retries
- **Files:** `DataProvider.tsx`, all components fetching data

#### 8. Testing Coverage
- **Current:** Testing libraries installed but minimal tests
- **Improvement:** Add unit tests for utilities, integration tests for CRUD flows, component tests
- **Files:** Create `__tests__` directories

#### 9. Environment Configuration
- **Current:** Hardcoded API URL in Main.tsx
- **Improvement:** Use environment variables for all configuration (API URL, OAuth client ID)
- **Files:** `Main.tsx`, `.env`

### Low Priority

#### 10. Accessibility (a11y)
- **Current:** Relies on Ant Design's built-in accessibility
- **Improvement:** Add ARIA labels to custom components, keyboard navigation testing, screen reader testing
- **Files:** Custom components

#### 11. Internationalization (i18n)
- **Current:** Hardcoded Spanish text
- **Improvement:** Extract strings to translation files, implement i18n library (react-i18next)
- **Impact:** Support for multiple languages

#### 12. Performance Optimization
- **Current:** Some useMemo usage
- **Improvement:** Audit and add React.memo, useMemo, useCallback where beneficial, virtualize long lists
- **Files:** Components with complex renders

#### 13. Documentation
- **Current:** No inline documentation
- **Improvement:** Add JSDoc comments to components and functions, generate API documentation
- **Files:** All components

#### 14. Consistent Code Style
- **Current:** Mixed patterns (some use `window.location.reload()`, inconsistent naming)
- **Improvement:** Add ESLint with strict rules, Prettier for formatting, pre-commit hooks
- **Files:** All source files

### Architecture Improvements

#### 15. Component Composition
- **Current:** Generic components are flexible but complex
- **Improvement:** Consider extracting more composable hooks (useList, useCreate, useEdit)
- **Impact:** More reusable logic, easier testing

#### 16. API Response Types
- **Current:** No typed API responses
- **Improvement:** Generate types from backend API (OpenAPI/Swagger) or define shared types
- **Impact:** Type safety across frontend-backend boundary

#### 17. Feature Modules
- **Current:** Flat folder structure for cruds
- **Improvement:** Consider feature-based folder structure with co-located components, hooks, and types
- **Structure:**
  ```
  features/
    productos/
      components/
      hooks/
      types/
      index.ts
  ```

#### 18. Delete Confirmation Pattern
- **Current:** Uses `window.location.reload()` after delete
- **Improvement:** Use React Router navigation or state update to refresh data
- **Files:** `DataEdit.tsx`

---

## Browser Support

- **Production:** >0.2% global usage, not dead, not Opera Mini
- **Development:** Latest Chrome, Firefox, Safari

---

## License

MIT
