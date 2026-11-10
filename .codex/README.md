# Project notes

- Follow the root `AGENTS.md`; obtain an explicit branch or worktree selection before edits.
- Stack: Astro static output, TypeScript, Tailwind CSS, React islands.
- `src/data/site.ts` owns demo identity, navigation, practice areas, and FAQ content.
- This is a fictional Harvey Specter demonstration. Contact details are fictional and photos depict stock models.
- Preserve `site.isDemo: true` until a real identity and contact details have been supplied.
- Indexing requires a real `SITE_URL` at build time and `site.isDemo: false`.
- Use `.astro` for content and layout; hydrate React only where interaction requires it.
- Validate with `npm run check` and `npm run build`.
- Run `npm run check:build` with the same `BASE_PATH` and `SITE_URL` as the build to validate links and assets.
- GitHub Pages publishes from `main` via `.github/workflows/pages.yml`; pull requests only validate.
- Use `withBase` from `src/lib/paths.ts` for internal paths; preserve root-level development and `/law-ltd/` deployment.
- Use `npm run dev -- --host 127.0.0.1` for local development.
