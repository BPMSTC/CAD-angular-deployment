import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task, TaskMetadata } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task<TaskMetadata>[] = [];
  @Input({ required: true }) onStatusChange!: (taskId: number) => void;

  trackByTaskId = (_: number, task: Task<TaskMetadata>): number => task.id;
}
