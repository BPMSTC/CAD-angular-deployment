import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskMetadata } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task<TaskMetadata>;
  @Output() statusChanged = new EventEmitter<number>();

  readonly nextStatusLabel = (status: string): string => {
    const labelMap: Record<string, string> = {
      todo: 'Start Task',
      'in-progress': 'Mark Done',
      done: 'Reopen'
    };
    return labelMap[status] ?? 'Update';
  };

  changeStatus(): void {
    this.statusChanged.emit(this.task.id);
  }
}
