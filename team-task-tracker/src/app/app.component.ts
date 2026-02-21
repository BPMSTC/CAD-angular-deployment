import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent, NewTaskFormValue } from './components/task-form/task-form.component';
import { Task, TaskMetadata, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly taskService = inject(TaskService);

  pageTitle = 'Team Task Tracker';
  newTaskTitle = 'Learn Angular data binding';

  tasks = signal<Task<TaskMetadata>[]>(this.taskService.getInitialTasks());
  taskCount = signal(this.tasks().length);
  completedCount = signal(this.tasks().filter((task) => task.status === 'done').length);
  remainingCount = computed(() => this.taskCount() - this.completedCount());

  readonly draftTask: NewTaskFormValue = {
    title: 'Practice TypeScript generics',
    assignee: 'Taylor',
    sprint: 'Sprint 5',
    estimatedHours: 2,
    status: 'todo'
  };

  completedTasks = computed(() => this.tasks().filter((task) => task.status === 'done'));
  getLabel = (task: Task<unknown>): string => task.title.toUpperCase();

  addTask = (): void => {
    if (!this.draftTask.title.trim()) {
      return;
    }

    const nextId = this.tasks().length + 1;
    const newTask = this.taskService.createTask(nextId, this.draftTask.title.trim(), this.draftTask.status, {
      assignee: this.draftTask.assignee,
      sprint: this.draftTask.sprint,
      estimatedHours: this.draftTask.estimatedHours
    });

    this.tasks.update((currentTasks) => [...currentTasks, newTask]);
    this.syncSignalCounters();
  };

  cycleTaskStatus = (taskId: number): void => {
    this.tasks.update((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextStatus: TaskStatus =
          task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo';

        return { ...task, status: nextStatus };
      })
    );

    this.syncSignalCounters();
  };

  private syncSignalCounters(): void {
    this.taskCount.set(this.tasks().length);
    this.completedCount.set(this.tasks().filter((task) => task.status === 'done').length);
  }
}
