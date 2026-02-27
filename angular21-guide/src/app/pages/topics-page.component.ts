import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularConcept, AngularConceptsService } from '../services/angular-concepts.service';

@Component({
  selector: 'app-topics-page',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './topics-page.component.html',
  styleUrl: './topics-page.component.css'
})
export class TopicsPageComponent {
  private readonly conceptsService = inject(AngularConceptsService);

  concepts$ = this.conceptsService.loadConcepts$();
  filter = this.conceptsService.focusFilter;
  totalConcepts = computed(() => this.conceptsService.getConcepts().length);

  updateFilter(value: string): void {
    this.filter.set(value);
  }

  isVisible(concept: AngularConcept): boolean {
    return this.filter() === 'all' || concept.title.toLowerCase().includes(this.filter().toLowerCase());
  }
}
