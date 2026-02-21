export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface TaskMetadata {
  sprint: string;
  assignee: string;
  estimatedHours: number;
}

export interface Task<TMetadata> {
  id: number;
  title: string;
  status: TaskStatus;
  metadata: TMetadata;
}
