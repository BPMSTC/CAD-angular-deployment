# Team Task Tracker (Angular Teaching App)

This folder contains a complete **teaching-focused Angular application** designed for students transitioning from vanilla JavaScript to Angular.

## Learning Outcomes

By walking through this app, students will learn:

1. **Formal Angular introduction** and framework mindset.
2. **Angular project setup** with Node.js and npm.
3. **Angular architecture basics** (standalone components, model, service, and composition).
4. **All four data-binding styles** in one screen.
5. **Signals** (`signal`, `computed`) for reactive state.
6. **Angular CLI command workflow**.
7. **TypeScript essentials** for Angular:
   - interfaces and types
   - anonymous functions
   - arrow functions / lambdas
   - generics fundamentals

---

## Quick Start

```bash
cd team-task-tracker
npm install
npm start
```

Then open `http://localhost:4200`.

---

## Suggested Live Demo Flow

1. Start with architecture and file tour:
   - `src/main.ts`
   - `src/app/app.component.ts`
   - `src/app/components/*`
   - `src/app/models/task.model.ts`
   - `src/app/services/task.service.ts`
2. Show data binding block in `app.component.html`.
3. Add a task and toggle status to show live `signal` updates.
4. Explain TypeScript features in model/service/component code.
5. End with CLI workflow recap.

---

## Angular CLI Commands to Teach

```bash
ng new team-task-tracker
ng generate component task-list
ng generate component task-card
ng serve
ng build
```

> This repository was created in a restricted environment that could not fetch Angular CLI packages from npm. The project files here reflect what those commands would generate and how they fit together pedagogically.

---

## Documentation Map

- [`docs/01-introduction-to-angular.md`](docs/01-introduction-to-angular.md)
- [`docs/02-project-setup-node-and-cli.md`](docs/02-project-setup-node-and-cli.md)
- [`docs/03-angular-architecture.md`](docs/03-angular-architecture.md)
- [`docs/04-data-binding.md`](docs/04-data-binding.md)
- [`docs/05-signals.md`](docs/05-signals.md)
- [`docs/06-typescript-topics.md`](docs/06-typescript-topics.md)
- [`docs/07-instructor-walkthrough.md`](docs/07-instructor-walkthrough.md)

