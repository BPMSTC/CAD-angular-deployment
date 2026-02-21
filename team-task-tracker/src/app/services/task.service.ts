import { Injectable } from '@angular/core';
import { Task, TaskMetadata, TaskStatus } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly starterTasks: Task<TaskMetadata>[] = [
    {
      id: 1,
      title: 'Run sprint planning meeting',
      status: 'todo',
      metadata: { sprint: 'Sprint 5', assignee: 'Alex', estimatedHours: 2 }
    },
    {
      id: 2,
      title: 'Create Angular architecture diagram',
      status: 'in-progress',
      metadata: { sprint: 'Sprint 5', assignee: 'Sam', estimatedHours: 3 }
    },
    {
      id: 3,
      title: 'Demo signals to the team',
      status: 'done',
      metadata: { sprint: 'Sprint 5', assignee: 'Jordan', estimatedHours: 1 }
    }
  ];

  getInitialTasks = (): Task<TaskMetadata>[] => [...this.starterTasks];

  createTask = (
    id: number,
    title: string,
    status: TaskStatus,
    metadata: TaskMetadata
  ): Task<TaskMetadata> => ({ id, title, status, metadata });
}
