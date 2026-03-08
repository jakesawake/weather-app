# AGENTS.md — Weather App

Guidelines for AI coding agents operating in this repository.

## Project Overview

Vanilla JavaScript weather application built with Vite. No UI framework.
Uses ES modules (`"type": "module"` in package.json). No TypeScript.

### Key Directories

```
weather-app/
├── index.html          # SPA entry point (Vite serves this)
├── vite.config.js      # Vite configuration
├── package.json        # Project manifest (only devDep: vite)
├── public/             # Static assets (served as-is)
└── src/
    ├── main.js         # App entry point (imported by index.html)
    ├── api-calls.js    # Weather API call logic
    └── style.css       # Application styles
```

---

## Build / Dev / Preview Commands

```bash
# Start local dev server (auto-opens browser)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview

# Install dependencies
npm install
```

### Tests

No test framework is currently configured. If tests are added (e.g., Vitest),
update this section with:

```bash
# Run all tests (placeholder — not yet configured)
npx vitest run

# Run a single test file
npx vitest run src/some-file.test.js

# Run tests matching a pattern
npx vitest run -t "test name pattern"

# Watch mode
npx vitest
```

When adding Vitest, install it as a dev dependency (`npm i -D vitest`) and add
a `"test"` script to package.json.

### Linting / Formatting

No linter or formatter is currently configured. If ESLint or Prettier are added,
update this section. Recommended setup:

```bash
# Lint (placeholder — not yet configured)
npx eslint src/

# Format (placeholder — not yet configured)
npx prettier --write src/
```

---

## Code Style Guidelines

### Language & Module System

- Vanilla JavaScript (ES2020+). No TypeScript.
- ES modules everywhere (`import`/`export`). Never use `require()` / `module.exports`.
- The project sets `"type": "module"` in package.json — all `.js` files are ESM.

### File Naming

- Use **kebab-case** for filenames: `api-calls.js`, `weather-utils.js`.
- CSS files use kebab-case: `style.css`, `weather-card.css`.
- Test files (when added) should be co-located or in a `__tests__/` directory,
  named `<module>.test.js`.

### Imports

- Use ES module `import` / `export` syntax exclusively.
- Use relative paths for local imports: `import { fetchWeather } from './api-calls.js'`.
- Include the `.js` extension in relative imports (required by native ESM and Vite).
- Group imports in this order, separated by blank lines:
  1. Third-party packages (e.g., `import axios from 'axios'`)
  2. Local modules (e.g., `import { fetchWeather } from './api-calls.js'`)
  3. CSS imports (e.g., `import './style.css'`)

### Formatting

- Use **2-space indentation** (matches Vite scaffold defaults).
- Use **double quotes** for strings (consistent with existing config files).
- Use **semicolons** at end of statements.
- Keep lines under 100 characters where practical.
- Use trailing commas in multi-line objects/arrays.

### Naming Conventions

- **Variables and functions**: `camelCase` — `fetchWeather`, `locationInput`.
- **Constants**: `UPPER_SNAKE_CASE` for true constants — `API_KEY`, `BASE_URL`.
- **Classes**: `PascalCase` — `WeatherService`.
- **DOM element references**: prefix with descriptive noun — `locationForm`, `searchButton`.
- **Event handlers**: prefix with `handle` or `on` — `handleSubmit`, `onLocationChange`.
- **Boolean variables**: prefix with `is`, `has`, `should` — `isLoading`, `hasError`.

### Functions

- Prefer `const` arrow functions for short utilities:
  `const formatTemp = (temp) => Math.round(temp);`
- Use `function` declarations for top-level named functions and event handlers.
- Keep functions small and single-purpose.
- Use `async`/`await` for asynchronous operations (no raw `.then()` chains).

### Error Handling

- Wrap all API calls in `try`/`catch` blocks.
- Provide user-facing error messages in the DOM, not just console logs.
- Log errors to console for debugging: `console.error("Failed to fetch weather:", error)`.
- Validate user input before making API calls.
- Handle network errors, invalid responses, and missing data gracefully.

```javascript
async function fetchWeather(location) {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(location)}&key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    displayError("Could not retrieve weather data. Please try again.");
    return null;
  }
}
```

### DOM Manipulation

- Use `document.querySelector` / `document.querySelectorAll` for element selection.
- Prefer `textContent` over `innerHTML` when inserting plain text (XSS prevention).
- Use `addEventListener` for event binding, never inline `onclick` attributes.
- Create reusable render functions for UI components.

### CSS

- Use class selectors; avoid ID selectors for styling.
- Use kebab-case for class names: `.weather-card`, `.location-form`.
- Use CSS custom properties (variables) for theming: `--primary-color`, `--font-size-lg`.
- Mobile-first responsive design with media queries.

### Environment & Secrets

- Store API keys in `.env` files (Vite exposes `VITE_`-prefixed vars).
- Access env vars via `import.meta.env.VITE_API_KEY`.
- **Never commit `.env` files.** They are already in `.gitignore`.
- For agent development, check if a `.env.example` exists for required variables.

### Vite-Specific Notes

- Entry HTML is `index.html` at the project root (not in `src/`).
- Static assets in `public/` are served at `/` and copied as-is to `dist/`.
- Assets imported in JS/CSS are processed by Vite (hashing, optimization).
- Use `import.meta.env.MODE` to check environment (`development` / `production`).
- Dev server config is in `vite.config.js` — currently only `server.open: true`.

---

## Git Conventions

- Single `main` branch workflow (currently one commit).
- Write clear, imperative commit messages: "Add weather API integration".
- Keep commits focused — one logical change per commit.

---

## Agent Instructions

- No `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md` files exist.
- No CI/CD pipeline is configured. There is no `.github/workflows/` directory.
- No README.md exists yet.
- When adding new dependencies, use `npm install` (not yarn or pnpm).
- Always run `npm run build` after significant changes to verify the build succeeds.
- If you add a linter or test framework, update the relevant sections above.
