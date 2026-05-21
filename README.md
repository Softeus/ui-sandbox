# UI Sandbox — Component Lab

> Design systems playground: 12 UI kits, 3 component types, side-by-side comparison.

A single-page React application that renders **Buttons**, **Inputs**, and **Native Selects** across 12 different UI libraries and styling approaches. Each kit is isolated in its own showcase panel, allowing direct visual comparison of APIs, styling strategies, bundle impact, and developer experience.

Dark/light mode toggle, live components (they work — hover, focus, click), and an architectural approach indicator that explains *why* each kit works the way it does.

---

## Quick Start

```bash
npm install
npm run dev      # starts Vite dev server (default http://localhost:5173)
npm run build    # production build with typecheck
```

---

## Architecture Overview

The project is structured as a **single-page comparison tool**, not an app that *uses* one design system. Every kit lives in its own isolated showcase file and is mounted dynamically via a tab switch.

### Stack

| Layer | Technology |
|---|---|
| Build | Vite 8 + Rolldown |
| Language | TypeScript 6 (strict) |
| React | 19.2 |
| CSS Framework | Tailwind CSS v4 (utility-first, JIT) |
| Layout containers | Tailwind utility classes + shared `Panel` component |
| Dark/light mode | Manual toggle, passed as `dark: boolean` prop to every showcase |

### Key architectural decisions

1. **No global CSS reset from any kit.** Each kit's global CSS is either imported as a static stylesheet (Bootstrap, Blueprint, Radix, Mantine, shadcn) or injected by the kit's provider component (MUI, Antd, Chakra). For Chakra specifically, the default CSS preflight (`* { font: inherit }` reset) is intentionally **disabled** to prevent global style bleed into the app header.

2. **Per-showcase providers.** Kits that require a React context provider (Mantine, MUI, Chakra, Antd, Radix) wrap their showcase content in that provider *inside the showcase file*, not at the app root. This keeps providers scoped and prevents cross-contamination.

3. **Single render approach.** Unlike tabbed navigation that mounts/unmounts, all kit showcases are mounted when the user selects a kit. Previous kit's component unmounts, new one mounts — simple and predictable React lifecycle.

4. **Desktop-first.** Layout uses Tailwind `max-w-6xl`, responsive with `sm:` breakpoints for mobile, but the primary focus is a desktop comparison experience.

---

## Component Types

The header has three tabs:

### Buttons
Each kit's button component displayed in a **Variants × States** matrix, plus a **Sizes** grid.

Supported states per kit:
- **Default** — normal rendering
- **Disabled** — `disabled` prop
- **Loading** — spinner/loading state (where kit supports it)
- **With Icon** — button with icon, or icon-only button
- **Danger** — destructive/error color palette variant

Supported variants per kit:
- Antd: solid, outlined, dashed, text, link
- Radix: solid, soft, surface, outline, ghost
- Mantine: filled, light, outline, subtle, default, white, transparent
- Bootstrap: primary, secondary, success, danger, warning, info, light, dark, link
- Ariakit: headless — Tailwind-styled demo buttons
- MUI: contained, outlined, text
- Blueprint: solid, outlined, minimal
- Chakra: solid, subtle, surface, outline, ghost, plain
- shadcn/ui: default, secondary, outline, ghost, destructive
- CSS Modules: handcrafted buttons with CSS Modules
- Styled Components: `styled.button` with tagged template literals
- Vanilla Extract: zero-runtime TypeScript-first buttons
- **Tailwind** (reference section): handcrafted utility-first buttons

### Inputs
Each kit's text input components in **States**, **Variants**, and **Sizes** grids. Includes textarea and native select where applicable.

### Selects (new)
Native `<select>` element or the kit's closest equivalent. Shows **States** (default, disabled, error), **Sizes**, and where relevant, **Variants** or a multi-select demo.

---

## UI Kits & Architectural Approaches

### 1. Antd (`antd`)
| | |
|---|---|
| **Approach** | Runtime CSS-in-JS |
| **Package** | `antd` v6 |
| **How it works** | Every component describes its styles in a JavaScript object. The built-in `cssinjs` engine converts these objects to CSS at runtime, injecting `<style>` tags into the DOM. |
| **Pros** | Themes and colors can be changed on-the-fly without rebuilding. Very mature component library with excellent documentation. |
| **Cons** | Runtime cost per render. Large bundle (1.2+ MB). |

### 2. Radix Themes (`radix`)
| | |
|---|---|
| **Approach** | Design Tokens + CSS custom properties |
| **Package** | `@radix-ui/themes` v3 |
| **How it works** | Theming is built entirely on CSS custom properties — all colors, shadows, radii are CSS variables. Switching themes changes only variable values, and the browser repaints instantly. No JavaScript overhead for theme switching. |
| **Pros** | Excellent performance. Beautiful default design. Accessibility-first primitives underneath (based on Radix Primitives). |
| **Cons** | Less flexible than headless libraries for custom designs. |

### 3. Mantine (`mantine`)
| | |
|---|---|
| **Approach** | Runtime CSS-in-JS (Emotion) |
| **Package** | `@mantine/core` v9 |
| **How it works** | Styles are described as JavaScript objects and converted to `<style>` tags at runtime via Emotion. Each component generates its own CSS during render. Supports `MantineProvider` for global theming. |
| **Pros** | Huge component library (100+ components). Fast developer onboarding. Rich inputs like DatePicker, RichTextEditor. |
| **Cons** | Runtime CSS generation adds computational cost per render. |

### 4. Bootstrap (`bootstrap`)
| | |
|---|---|
| **Approach** | Static CSS Framework |
| **Package** | `react-bootstrap` v2 + `bootstrap` v5 |
| **How it works** | Classic approach: all CSS is pre-compiled into static files. React components (`react-bootstrap`) are just thin wrappers that apply Bootstrap CSS classes and manage interaction logic. No runtime CSS generation. |
| **Pros** | Instantly fast — CSS loads once and never changes. Huge ecosystem, well-known class naming. |
| **Cons** | Less flexible for custom designs. JavaScript-unaware styling (no component-level type-safe styles). |

### 5. Ariakit (`ariakit`)
| | |
|---|---|
| **Approach** | Headless / Behavioral |
| **Package** | `@ariakit/react` v0.4 |
| **How it works** | Contains zero CSS — only programmatic logic, ARIA attributes, focus management, and keyboard navigation. All styling is done by the developer, typically with Tailwind CSS. |
| **Pros** | Full visual control. No fighting with default styles. Accessible by default. Tiny bundle. |
| **Cons** | You must design everything yourself. Higher initial effort for visual styling. |

### 6. MUI (`mui`)
| | |
|---|---|
| **Approach** | Runtime CSS-in-JS (Emotion) |
| **Package** | `@mui/material` v9 |
| **How it works** | Material Design implementation via Emotion. Supports `styled()`, the `sx` prop, and `ThemeProvider` for deep customization. Components strictly follow Material Design guidelines. |
| **Pros** | Powerful theming engine. Massive ecosystem (icons, grid, advanced customization). Extremely popular. |
| **Cons** | Heavy bundle size. Opinionated Material Design look that can be hard to escape. |

### 7. Blueprint (`blueprint`)
| | |
|---|---|
| **Approach** | Static CSS (SASS) |
| **Package** | `@blueprintjs/core` v6 |
| **How it works** | CSS framework built on SASS, compiled to static CSS at build time. React components map to these pre-compiled styles. No runtime CSS generation. Designed for data-dense desktop interfaces. |
| **Pros** | Excellent for complex desktop applications — dashboards, admin panels, data tools. Predictable, fast. |
| **Cons** | Primarily designed for desktop. Less polished for mobile/touch interfaces. |

### 8. Chakra UI (`chakra`)
| | |
|---|---|
| **Approach** | Compile-time CSS-in-JS (Panda CSS) |
| **Package** | `@chakra-ui/react` v3.35 |
| **How it works** | Styles are described through a type-safe API and compiled to static CSS at build time via Panda CSS. At runtime there is only finished CSS and CSS variables for theming. The developer gets the convenience of CSS-in-JS without runtime overhead. |
| **Pros** | Excellent TypeScript support. Composable and accessible by default. Zero runtime cost for static styles. |
| **Cons** | Requires the Panda CSS build pipeline. Newer ecosystem, fewer community examples. |

### 9. shadcn/ui (`shadcn`)
| | |
|---|---|
| **Approach** | Copy-paste Components |
| **Package** | Not an npm package — components live in `src/components/ui/` |
| **How it works** | Components are copied directly into your project and styled with Tailwind CSS. There is no library dependency — the code is yours, visible and editable. Based on Base UI (`@base-ui/react`) primitives for accessibility. |
| **Pros** | Minimal bundle size. Full control over styling. Transparent implementation. |
| **Cons** | Manual maintenance — updates must be applied by hand. No centralized version management. |

### 10. CSS Modules (`css-modules`)
| | |
|---|---|
| **Approach** | CSS Modules (native) |
| **Package** | None — Vite's native CSS Modules support |
| **How it works** | Each `.module.css` file gets unique hashed class names at build time, scoping styles to the component. No JavaScript runtime for styling — only static CSS. |
| **Pros** | Maximum performance. Zero runtime cost. Full CSS feature support (pseudo-classes, media queries, etc.). |
| **Cons** | No dynamic theming. Must write raw CSS. No component-level type safety for styles. |

### 11. Styled Components (`styled`)
| | |
|---|---|
| **Approach** | Tagged Template CSS-in-JS |
| **Package** | `styled-components` v6 |
| **How it works** | CSS is written literally as CSS inside JavaScript via tagged template literals. The library parses the strings and generates unique hashed class names at runtime. Template literals allow dynamic interpolation. |
| **Pros** | Intuitive DX for developers who think in CSS. Co-located styles. Dynamic theming. |
| **Cons** | Runtime overhead for parsing and injection. Harder to tree-shake. |

### 12. Vanilla Extract (`vanilla`)
| | |
|---|---|
| **Approach** | Zero-runtime CSS-in-JS |
| **Package** | `@vanilla-extract/css` v1.20 |
| **How it works** | Styles are written in TypeScript (`.css.ts` files) but compile to pure CSS files at build time. At runtime, there is zero JavaScript for styling — only references to the generated class names. |
| **Pros** | Type-safe styles with zero runtime cost. Full TypeScript power (variables, functions, theme contracts). |
| **Cons** | Requires build plugin. Static-only — no dynamic `style` prop. Slightly more verbose than template literals. |

---

### Reference section: Tailwind CSS

Every kit tab is followed by a Tailwind-styled equivalent in its own section at the bottom of the page. These are handcrafted using Tailwind utility classes with no component library — serving as a baseline for what you can achieve with utility-first CSS alone.

- **Approach:** Utility-first CSS, no runtime generation
- **How it works:** Atomic utility classes compose the design declaratively in JSX without a separate CSS file. Tailwind v4 JIT compiler generates only the classes actually used in the project.

---

## Project Structure

```
src/
  App.tsx                        # Main app: header, kit tabs, component tabs, layout
  main.tsx                       # React entry point
  index.css                      # Tailwind imports + shadcn CSS variables

  showcase/
    ShowcaseShared.tsx            # Shared UI: Panel, Badge, MatrixHeader, Legend, t(dark)

    # ── Button showcases (all 12 kits + Tailwind) ──
    AntdShowcase.tsx
    RadixShowcase.tsx
    MantineShowcase.tsx
    BootstrapShowcase.tsx
    AriakitShowcase.tsx
    MuiShowcase.tsx
    BlueprintShowcase.tsx
    ChakraShowcase.tsx
    ShadcnShowcase.tsx
    CssModulesShowcase.tsx          (+ CssModulesShowcase.module.css)
    StyledShowcase.tsx
    VanillaShowcase.tsx             (+ VanillaShowcase.css.ts)
    TwShowcase.tsx                  # Tailwind reference

    # ── Input showcases (all 12 kits + Tailwind) ──
    AntdInputShowcase.tsx
    RadixInputShowcase.tsx
    MantineInputShowcase.tsx
    BootstrapInputShowcase.tsx
    AriakitInputShowcase.tsx
    MuiInputShowcase.tsx
    BlueprintInputShowcase.tsx
    ChakraInputShowcase.tsx
    ShadcnInputShowcase.tsx
    CssModulesInputShowcase.tsx     (+ CssModulesInputShowcase.module.css)
    StyledInputShowcase.tsx
    VanillaInputShowcase.tsx        (+ VanillaInputShowcase.css.ts)
    TwInputShowcase.tsx

    # ── Select showcases (all 12 kits + Tailwind) ──
    AntdSelectShowcase.tsx
    RadixSelectShowcase.tsx
    MantineSelectShowcase.tsx
    BootstrapSelectShowcase.tsx
    AriakitSelectShowcase.tsx
    MuiSelectShowcase.tsx
    BlueprintSelectShowcase.tsx
    ChakraSelectShowcase.tsx
    ShadcnSelectShowcase.tsx
    CssModulesSelectShowcase.tsx    (reuses CssModulesInputShowcase.module.css)
    StyledSelectShowcase.tsx
    VanillaSelectShowcase.tsx       (reuses VanillaInputShowcase.css.ts)
    TwSelectShowcase.tsx

  components/ui/                   # shadcn/ui copied components
    select.tsx
    button.tsx
    badge.tsx
    ...

public/                            # static assets
```

**Total:** 39 showcase files + 3 shared modules + 4 shadcn components + App entry

---

## Key Design Decisions

### Why no React Router?
The app is a single screen. Navigating between kits is a simple `useState` switch, not a route. Adding React Router for this would be overengineering.

### Why pass `dark: boolean` as a prop rather than using context?
Each kit has its own theme/provider mechanism. Some use React context (Mantine, MUI), others use CSS variables (Radix, Tw), others are headless (Ariakit). A single global dark mode context would conflict with kit-level providers. Passing `dark` as a prop to each showcase is the simplest, most explicit approach with zero ambiguity about where the theme value comes from.

### Why disable Chakra's preflight?
Chakra UI v3 includes a CSS reset (`* { font: inherit }`) that overrides Tailwind utility classes when the `ChakraProvider` mounts. Since Chakra is only used in its isolated showcase panel, this global reset is unwanted. The fix: create a custom system via `createSystem(defaultConfig, { preflight: false })` and pass it to `ChakraProvider`.

### Why CSS Modules and Vanilla Extract reuse Input styles?
Each of these approaches has its own `.module.css` or `.css.ts` file that defines shared base styles for inputs, textareas, and selects. Rather than duplicating these styles, the select showcases import the existing CSS files from their Input counterparts.

---

## Adding a New Kit

1. Create three showcase files in `src/showcase/`:
   - `KitNameShowcase.tsx` — buttons
   - `KitNameInputShowcase.tsx` — inputs
   - `KitNameSelectShowcase.tsx` — selects
2. If the kit has its own styling files, create them alongside.
3. Add the kit key to the `Kit` type in `App.tsx`.
4. Add entries to `KITS` array with `approach` and `approachBrief`.
5. Register in `BTN`, `INP`, and `SEL` records in `App.tsx`.
6. Add the kit's provider wrapper inside each showcase file if required.

---

## License

Private research project. Not intended for distribution.
