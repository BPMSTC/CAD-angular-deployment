import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface AngularConcept {
  title: string;
  summary: string;
  keyPoints: string[];
  diagramPlaceholder: string;
}

@Injectable({ providedIn: 'root' })
export class AngularConceptsService {
  readonly focusFilter = signal('all');

  constructor(private readonly http: HttpClient) {}

  getConcepts(): AngularConcept[] {
    return [
      {
        title: '1. What Angular Is (and Why It Exists)',
        summary:
          'Start with the mental model: Angular helps teams build structured, maintainable SPAs where conventions and tooling are already baked in.',
        keyPoints: [
          'SPA concept and why client-side transitions feel fast',
          'Client-side rendering vs server-side rendering at a high level',
          'Framework vs library: Angular provides conventions, not only utilities',
          'Angular is opinionated and TypeScript is first-class',
          'Vanilla JS vs Angular: manual wiring compared to structured architecture'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Compare two columns (Vanilla JS manual wiring vs Angular structured workflow) with SPA navigation shown across components.'
      },
      {
        title: '2. Angular Project Structure + CLI',
        summary:
          'Orient learners before deep syntax: show how the app is generated, served, and bootstrapped in modern Angular 21 projects.',
        keyPoints: [
          'ng new and ng serve essentials',
          'Folder structure overview and what each folder is for',
          'How main.ts and app.config.ts boot the app',
          'Standalone components as the Angular 21 default',
          'What the Angular CLI automates for development and builds'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Project tree with arrows from CLI commands to main.ts -> app.config.ts -> root component bootstrap flow.'
      },
      {
        title: '3. Components (The Core Building Block)',
        summary:
          'Teach components deeply because every Angular feature layers on top of component architecture and template binding.',
        keyPoints: [
          'Standalone component anatomy and @Component decorator',
          'Template and styling responsibilities',
          'Interpolation {{ }} for displaying values',
          'Property binding [] and event binding ()',
          'Two-way binding [(ngModel)] for synchronized form state'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Single component split into TypeScript class, HTML template, and CSS styles with data-flow arrows for each binding type.'
      },
      {
        title: '4. Directives and Control Flow',
        summary:
          'Once components are clear, dynamic UI becomes natural through Angular directives and modern control flow syntax.',
        keyPoints: [
          'Built-in control flow with @if and @for in Angular 17+ through 21',
          'Attribute directives for behavior changes',
          'Structural directives for DOM shape changes',
          'Track expressions/functions in @for for rendering efficiency'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Decision tree showing @if branches and @for list rendering with track function to explain DOM updates.'
      },
      {
        title: '5. Services and Dependency Injection',
        summary:
          'Introduce professional app architecture by separating state/business logic into services and injecting them where needed.',
        keyPoints: [
          'Why services exist and how they support separation of concerns',
          '@Injectable and providedIn: root',
          'Injecting services into components with constructor or inject()',
          'Singleton behavior and shared app-wide state patterns'
        ],
        diagramPlaceholder:
          'Diagram placeholder: One singleton service injected into multiple components, emphasizing shared state and clean separation from UI.'
      },
      {
        title: '6. Routing',
        summary:
          'Show how Angular scales from one-screen demos to real multi-page SPAs with route configuration and lazy loading basics.',
        keyPoints: [
          'provideRouter and route configuration',
          'RouterOutlet and RouterLink fundamentals',
          'Route parameters for dynamic pages',
          'Intro-level lazy loading for feature growth'
        ],
        diagramPlaceholder:
          'Diagram placeholder: URL path map feeding RouterOutlet with optional lazy-loaded feature branch and parameterized route.'
      },
      {
        title: '7. HTTP + Observables (Intro Level)',
        summary:
          'Connect frontend to backend with practical async patterns: HttpClient, subscriptions, and async pipe without deep RxJS theory.',
        keyPoints: [
          'HttpClient basics and GET requests',
          'Subscribing to responses in components/services',
          'Observable mental model for async streams',
          'Using async pipe in templates for reactive UI'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Request/response flow (Component -> Service -> HttpClient -> API -> Observable -> async pipe in template).'
      },
      {
        title: '8. Signals and Modern Reactivity (Angular 21 Reality)',
        summary:
          'Close with Angular’s modern reactive model: signals for state, observables for async streams, and clear boundaries between both.',
        keyPoints: [
          'signal(), computed(), and effect()',
          'Signals vs Observables: state vs async streams',
          'Why Angular moved toward signal-first reactivity',
          'Recommended teaching rule: signals for local/app state, observables for backend/event streams'
        ],
        diagramPlaceholder:
          'Diagram placeholder: Side-by-side model (signals state graph vs observable stream timeline) with arrows to template updates.'
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
