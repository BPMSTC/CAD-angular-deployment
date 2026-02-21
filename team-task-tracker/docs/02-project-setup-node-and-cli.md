# 02 - Angular Project Setup, Node.js, and CLI

## Node.js and npm behind the scenes

When students run `npm start` (which runs `ng serve`):

- Node executes JavaScript tooling (Angular CLI).
- npm resolves scripts from `package.json`.
- Angular CLI compiles TypeScript + templates.
- A dev server serves the app with live reload.

When they run `ng build`:

- code is optimized for production
- assets are bundled and hashed
- output is written to `dist/`

## CLI commands for class

```bash
ng new team-task-tracker
ng generate component task-list
ng generate component task-card
ng serve
ng build
```

Use each command to show students that framework structure is reproducible and automated.
