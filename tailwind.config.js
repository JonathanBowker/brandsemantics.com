// Tailwind v4 + Vite plugin reliably loads `tailwind.config.js`.
// We keep the real config in `tailwind.config.ts` (which reads `src/theme.ts`)
// and re-export it here so the build consistently picks it up.
import config from './tailwind.config.ts';

export default config;

