This website is built using React with Redux Toolkit. The 3D graphics and physics engine are done with React Three Fiber, Drei, and Rapier. Emotion/styled is used for styling and GSAP powers animations.

## Local setup

1. Use Node.js 20.19+, 22.13+, or 24+ and enable Corepack with `corepack enable`.
2. Install dependencies with `yarn install`.
3. Copy `.env.example` to `.env` and set `VITE_EMAIL_KEY` to an EmailJS public browser key. The site still runs without this key, but the contact form reports that it is unavailable.
4. Start the development server with `yarn dev`.

## Checks

- `yarn lint` runs type-aware ESLint checks, including React Hooks and Fast Refresh rules.
- `yarn typecheck` runs strict TypeScript validation.
- `yarn test` runs the unit and regression suite.
- `yarn build` creates a production bundle.
- `yarn validate` runs linting, type-checking, tests, and the production build.

Installing dependencies configures the Husky pre-commit hook automatically. Every commit runs `yarn validate`; fix any reported issue before committing.

Built with Vite.
