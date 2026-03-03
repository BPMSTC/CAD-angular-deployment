# TODO: Next Steps for the CAD Angular 21 Learning Hub

This page outlines practical next steps to continue improving the project.

## 1) Strengthen learning content

- Add a dedicated page for each core Angular topic with:
  - A short explanation
  - A minimal code example
  - A “common mistakes” section
- Add an end-of-section quiz (3–5 questions) to reinforce concepts.
- Add a final “build it yourself” mini-project brief that ties all topics together.

## 2) Improve developer onboarding

- Expand the root `README.md` with:
  - Quick start prerequisites (Node/npm versions)
  - Install, run, and build commands
  - Project structure summary
- Add a `CONTRIBUTING.md` with coding conventions and PR workflow.

## 3) Add quality checks

- Enable or tighten linting rules for TypeScript templates and styles.
- Add unit tests for:
  - `AngularConceptsService`
  - `ThemeService`
  - `HighlightPipe`
- Add basic component tests for overview/topics pages.
- Configure CI (for example, GitHub Actions) to run lint + test on each PR.

## 4) UX and accessibility pass

- Add keyboard navigation checks for all interactive elements.
- Ensure semantic heading order on all pages.
- Add ARIA labels where needed.
- Validate color contrast for both light and dark themes.
- Add a responsive review for mobile/tablet breakpoints.

## 5) Deployment and release readiness

- Add a deployment guide (e.g., GitHub Pages, Netlify, or Vercel).
- Document environment-specific configuration if needed.
- Add versioning/release notes workflow.
- Add a production build verification checklist.

## 6) Suggested execution order

1. Update documentation (`README.md`, `CONTRIBUTING.md`, this TODO).
2. Add/adjust linting and tests.
3. Improve accessibility and responsive behavior.
4. Set up CI pipeline.
5. Finalize deployment instructions and release checklist.

---

If you want, the next immediate task can be: **create `CONTRIBUTING.md` and a GitHub Actions workflow for lint + test**.
