# 06 - TypeScript Topics for Angular

## Interfaces and Generics

The app model uses generics to keep metadata flexible:

```ts
interface Task<TMetadata> {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  metadata: TMetadata;
}
```

## Anonymous + Arrow Functions

Examples used in the app:

```ts
const completedTasks = tasks.filter((t) => t.status === 'done');
const getLabel = (t: Task<unknown>) => t.title.toUpperCase();
```

## Why this matters in Angular

Angular code is TypeScript-heavy. Students need confidence with:

- typing component state
- typing emitted events
- expressing transformation logic with array methods
- writing reusable generic models
