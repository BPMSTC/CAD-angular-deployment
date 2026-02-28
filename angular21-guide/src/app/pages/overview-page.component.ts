import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularConceptsService } from '../services/angular-concepts.service';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {
  private service = inject(AngularConceptsService);

  // Used to render concept chips in the "8 Topics" section
  concepts = this.service.getConcepts();

  // ── Signal Playground ──────────────────────────────────────────────────
  // These three lines are the actual source powering the live demo below.

  count    = signal(0);
  doubled  = computed(() => this.count() * 2);
  isEven   = computed(() => this.count() % 2 === 0);
  effectLog = signal<string[]>(['Waiting for first change…']);

  constructor() {
    // effect() runs whenever count changes — students see this live
    effect(() => {
      const val = this.count();
      if (val === 0) return; // skip the initial zero
      this.effectLog.update(log => {
        const entry = `→ count changed to ${val}`;
        return [...log.slice(-4), entry]; // keep last 5 entries
      });
    });
  }

  increment(): void { this.count.update(n => n + 1); }
  decrement(): void { this.count.update(n => Math.max(0, n - 1)); }
  reset():     void { this.count.set(0); this.effectLog.set(['Reset to 0']); }
}
