# 03 - Understanding Angular Architecture

## Architecture choices in this demo

This app uses **standalone components** (modern Angular style):

- `AppComponent` = orchestrator/container
- `TaskFormComponent` = input concern
- `TaskListComponent` = list concern
- `TaskCardComponent` = per-item concern
- `TaskService` = shared business/data logic
- `Task<TMetadata>` model = typed domain contract

## Composition model

`AppComponent` owns state and passes data down via `@Input`.
Child components raise events with `@Output`.

This demonstrates one-way data flow + event-up communication.

## Service purpose (future weeks)

`TaskService` is intentionally simple so students can later connect it to:

- HTTP APIs
- persistence
- state management patterns
