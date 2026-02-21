import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStatus } from '../../models/task.model';

export interface NewTaskFormValue {
  title: string;
  assignee: string;
  sprint: string;
  estimatedHours: number;
  status: TaskStatus;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input({ required: true }) draft!: NewTaskFormValue;
  @Output() taskSubmitted = new EventEmitter<void>();

  submitTask(): void {
    this.taskSubmitted.emit();
  }
}
