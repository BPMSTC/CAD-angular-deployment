import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface AngularConcept {
  title: string;
  summary: string;
  keyPoints: string[];
}

@Injectable({ providedIn: 'root' })
export class AngularConceptsService {
  readonly focusFilter = signal('all');

  constructor(private readonly http: HttpClient) {}

  getConcepts(): AngularConcept[] {
    return [
      {
        title: 'Angular philosophy + SPA model',
        summary: 'Angular treats the UI as a tree of reusable components and keeps navigation client-side for fast SPA transitions.',
        keyPoints: ['Opinionated architecture', 'Standalone APIs', 'Client-side routing with preserved state']
      },
      {
        title: 'CLI + project structure',
        summary: 'The Angular CLI generates, serves, tests, and builds apps with a predictable folder layout.',
        keyPoints: ['src/app for feature code', 'angular.json for workspace config', 'Environments and assets in src/']
      },
      {
        title: 'Components + data binding',
        summary: 'Components pair TypeScript logic with templates using interpolation, property binding, and event binding.',
        keyPoints: ['{{ value }} interpolation', '[property] binding', '(event) handlers and [(ngModel)]']
      },
      {
        title: 'Directives + control flow',
        summary: 'Built-in control flow syntax like @if and @for makes conditional and repeated UI easier to read.',
        keyPoints: ['@if/@else blocks', '@for with track expression', 'Attribute directives for behavior']
      },
      {
        title: 'Services + Dependency Injection',
        summary: 'Services centralize business logic and are provided via Angular’s DI container.',
        keyPoints: ['@Injectable services', 'constructor or inject() lookup', 'Singletons through providedIn: root']
      },
      {
        title: 'Routing',
        summary: 'Router configuration maps URL paths to standalone components and supports guards/lazy loading.',
        keyPoints: ['Routes array', 'RouterLink for navigation', 'RouterOutlet as render target']
      },
      {
        title: 'HTTP + Observables',
        summary: 'HttpClient returns Observables that can be composed and consumed with async pipe or subscriptions.',
        keyPoints: ['Typed HTTP requests', 'RxJS operators like map/filter', 'Declarative async UI updates']
      },
      {
        title: 'Signals + modern reactivity',
        summary: 'Signals offer fine-grained reactivity using signal, computed, and effect.',
        keyPoints: ['Writable state with signal()', 'Derived state with computed()', 'Minimal template re-rendering']
      }
    ];
  }

  loadConcepts$(): Observable<AngularConcept[]> {
    return of(this.getConcepts()).pipe(delay(200));
  }

  fetchAngularNews$(): Observable<unknown> {
    return this.http.get('https://angular.dev/assets/content/release-notes.json');
  }
}
