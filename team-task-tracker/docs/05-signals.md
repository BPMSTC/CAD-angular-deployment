# 05 - What are Signals in Angular?

Signals are Angular's fine-grained reactive primitives.

In this app:

- `tasks` is a signal holding task array state.
- `taskCount` and `completedCount` are writable counters.
- `remainingCount` is a computed signal derived from other signals.

```ts
taskCount = signal(0);
completedCount = signal(0);
remainingCount = computed(() => this.taskCount() - this.completedCount());
```

## Why students care

Signals make state updates explicit and predictable.
They provide a concrete contrast with template binding and help students reason about reactive UIs.
