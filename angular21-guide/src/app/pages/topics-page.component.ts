import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularConcept, AngularConceptsService, CodeTab } from '../services/angular-concepts.service';
import { HighlightPipe } from '../pipes/highlight.pipe';

@Component({
  selector: 'app-topics-page',
  standalone: true,
  imports: [AsyncPipe, FormsModule, HighlightPipe],
  templateUrl: './topics-page.component.html',
  styleUrl: './topics-page.component.css'
})
export class TopicsPageComponent {
  private readonly service = inject(AngularConceptsService);

  concepts$     = this.service.loadConcepts$();
  filter        = this.service.focusFilter;
  totalConcepts = computed(() => this.service.getConcepts().length);

  // ── Expand / collapse ────────────────────────────────────────────────────
  expandedId = signal<string | null>(null);

  // ── Learned tracking (persisted to localStorage) ─────────────────────────
  learnedIds   = signal<Set<string>>(this.loadLearned());
  learnedCount = computed(() => this.learnedIds().size);
  progressPct  = computed(() =>
    this.totalConcepts()
      ? Math.round((this.learnedIds().size / this.totalConcepts()) * 100)
      : 0
  );

  // ── Active code tab per concept (keyed by concept id → tab label) ─────────
  activeTab = signal<Record<string, string>>({});

  // ── Copy-to-clipboard feedback ─────────────────────────────────────────────
  copiedId = signal<string | null>(null);

  // ── Filter ───────────────────────────────────────────────────────────────
  updateFilter(value: string): void { this.filter.set(value); }

  isVisible(concept: AngularConcept): boolean {
    const f = this.filter().toLowerCase().trim();
    if (!f) return true;
    return (
      concept.title.toLowerCase().includes(f) ||
      concept.summary.toLowerCase().includes(f) ||
      concept.tags.some(t => t.toLowerCase().includes(f))
    );
  }

  // ── Expand helpers ───────────────────────────────────────────────────────
  toggleExpand(id: string): void {
    this.expandedId.update(cur => (cur === id ? null : id));
  }

  isExpanded(id: string): boolean { return this.expandedId() === id; }

  // ── Learned helpers ──────────────────────────────────────────────────────
  toggleLearned(id: string, e: Event): void {
    e.stopPropagation();
    this.learnedIds.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem('ng-hub-learned', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }

  isLearned(id: string): boolean { return this.learnedIds().has(id); }

  // ── Code tab helpers ─────────────────────────────────────────────────────
  getActiveLabel(conceptId: string, tabs: CodeTab[]): string {
    return this.activeTab()[conceptId] ?? tabs[0]?.label ?? '';
  }

  getActiveLang(conceptId: string, tabs: CodeTab[]): string {
    const label = this.getActiveLabel(conceptId, tabs);
    return tabs.find(t => t.label === label)?.lang ?? tabs[0]?.lang ?? 'ts';
  }

  getActiveCode(conceptId: string, tabs: CodeTab[]): string {
    const label = this.getActiveLabel(conceptId, tabs);
    return tabs.find(t => t.label === label)?.code ?? tabs[0]?.code ?? '';
  }

  setActiveTab(conceptId: string, label: string, e: Event): void {
    e.stopPropagation();
    this.activeTab.update(t => ({ ...t, [conceptId]: label }));
  }

  // ── Copy code ────────────────────────────────────────────────────────────
  async copyCode(conceptId: string, code: string, e: Event): Promise<void> {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      this.copiedId.set(conceptId);
      setTimeout(() => this.copiedId.set(null), 2000);
    } catch { /* clipboard not available */ }
  }

  // ── localStorage helpers ─────────────────────────────────────────────────
  private loadLearned(): Set<string> {
    try {
      const raw = localStorage.getItem('ng-hub-learned');
      if (raw) return new Set<string>(JSON.parse(raw));
    } catch { /* ignore */ }
    return new Set<string>();
  }
}
