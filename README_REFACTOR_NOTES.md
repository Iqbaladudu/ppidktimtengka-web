Refactor summary (automatically generated)

- Extracted Header, Hero, Stats, About, Programs, CTA, Footer into separate, typed components under src/components.
- Added Site context in src/context/SiteContext.tsx. Use `useSite()` to access site metadata and stats across components.
- Implemented `usePrefersReducedMotion` hook to respect user's reduced motion preference and avoid pointless animations.
- Page now composes smaller components and lazy-loads the Hero component for performance.
- Added a unit test for Header to ensure siteName renders via context.

Notes & recommendations:
- Consider creating a `ui` folder for shared small components (Badge, Avatar, Card) and moving repeated patterns there.
- Introduce an error boundary at top-level if you expect runtime errors from nested components.
- Add more unit tests and snapshot tests for visual regressions (playwright or chromatic).
- If server-side rendering performance is a concern, evaluate which components can be deferred using dynamic imports with client-only rendering.
