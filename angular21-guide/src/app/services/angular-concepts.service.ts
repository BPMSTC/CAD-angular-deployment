import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CodeTab {
  lang: 'ts' | 'html' | 'css';
  label: string;
  code: string;
}

export interface AngularConcept {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  keyPoints: string[];
  color: string;
  icon: string;
  tags: string[];
  codeTabs: CodeTab[];
}

@Injectable({ providedIn: 'root' })
export class AngularConceptsService {
  readonly focusFilter = signal('');

  constructor(private readonly http: HttpClient) {}

  getConcepts(): AngularConcept[] {
    return [
      {
        id: 'what-is-angular',
        title: 'What Angular Is (and Why It Exists)',
        shortTitle: 'What is Angular?',
        summary:
          'Angular helps teams build structured, maintainable SPAs where conventions and tooling are already baked in — no manual wiring required.',
        color: '#DD0031',
        icon: '🅰️',
        tags: ['fundamentals', 'SPA', 'framework'],
        keyPoints: [
          'SPA concept: the browser loads the app once, then Angular handles all navigation client-side — no full page reloads.',
          'Framework vs library: Angular ships with routing, forms, HTTP, and DI out of the box. React/Vue leave those choices to you.',
          'Angular is opinionated — it enforces structure, which makes large team codebases more consistent and maintainable.',
          'TypeScript is first-class: type safety catches bugs before runtime and powers editor autocomplete.',
          'Vanilla JS requires you to manually wire events, update the DOM, and track state. Angular automates all of that.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'Vanilla JS (before)',
            code: `// ❌ Vanilla JS — manual DOM wiring, doesn't scale
const input = document.getElementById('name');
const output = document.getElementById('greeting');

input.addEventListener('input', () => {
  output.textContent = 'Hello, ' + input.value + '!';
});

// Every feature needs more event listeners, more querySelector calls,
// more state variables — it quickly becomes unmanageable.`
          },
          {
            lang: 'html',
            label: 'Angular (after)',
            code: `<!-- ✅ Angular — declarative, readable, and maintainable -->

<!-- Two-way binding keeps the input and the greeting in sync -->
<input [(ngModel)]="name" placeholder="Your name" />

<!-- Interpolation reads the value and updates the DOM automatically -->
<p>Hello, {{ name }}!</p>

<!-- Angular handles ALL the DOM updates for you. -->`
          }
        ]
      },
      {
        id: 'project-structure',
        title: 'Angular Project Structure + CLI',
        shortTitle: 'Project & CLI',
        summary:
          'Orient yourself before diving into syntax: see how a project is generated, served, and bootstrapped in modern Angular 21.',
        color: '#1565C0',
        icon: '🏗️',
        tags: ['CLI', 'structure', 'bootstrap'],
        keyPoints: [
          'ng new <app-name> scaffolds a complete, ready-to-run Angular project in seconds.',
          'ng serve starts a local dev server with hot-reload at http://localhost:4200.',
          'main.ts is the single entry point — it calls bootstrapApplication() to start the app.',
          'app.config.ts wires in framework features (router, HTTP, animations) using provider functions.',
          'Standalone components are the Angular 21 default — no NgModules needed for most apps.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'main.ts',
            code: `// main.ts — the single entry point for the entire application
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication() kicks everything off.
// It mounts AppComponent and applies the providers from appConfig.
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));`
          },
          {
            lang: 'ts',
            label: 'app.config.ts',
            code: `// app.config.ts — register framework features here (Angular 21 style)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),   // enables <router-outlet> and routerLink
    provideHttpClient(),     // enables HttpClient injection anywhere
  ]
};`
          }
        ]
      },
      {
        id: 'components',
        title: 'Components (The Core Building Block)',
        shortTitle: 'Components',
        summary:
          'Every Angular feature builds on components. Master the anatomy, then the four binding types, and everything else clicks into place.',
        color: '#6A1B9A',
        icon: '🧩',
        tags: ['components', 'bindings', 'templates'],
        keyPoints: [
          '@Component decorator defines the selector, template, styles, and imports for a component.',
          'Interpolation {{ }} reads a value from the class and renders it in the template.',
          'Property binding [src]="imageUrl" sets a DOM property dynamically from the class.',
          'Event binding (click)="handler()" calls a class method when a DOM event fires.',
          'Two-way binding [(ngModel)]="name" keeps an input and a class property perfectly in sync.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'TypeScript',
            code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',   // used as <app-profile> in other templates
  standalone: true,
  imports: [FormsModule],    // FormsModule enables [(ngModel)]
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // signal() creates reactive state — the template updates automatically
  name = signal('Student');
  avatarUrl = signal('https://i.pravatar.cc/80');

  greet(): void {
    alert('Hello, ' + this.name() + '!');
  }
}`
          },
          {
            lang: 'html',
            label: 'Template',
            code: `<!-- profile.component.html -->

<!-- Property binding: sets the [src] attribute from the class -->
<img [src]="avatarUrl()" alt="Avatar" />

<!-- Interpolation: reads name() and renders it -->
<h2>Hello, {{ name() }}!</h2>

<!-- Two-way binding: input ↔ name signal stay in sync -->
<input [(ngModel)]="name" placeholder="Enter your name" />

<!-- Event binding: calls greet() when the button is clicked -->
<button (click)="greet()">Say Hello</button>`
          }
        ]
      },
      {
        id: 'directives-control-flow',
        title: 'Directives and Control Flow',
        shortTitle: 'Directives & @if/@for',
        summary:
          'Dynamic UI becomes natural with Angular\'s modern @if / @for control flow syntax and built-in directives for styling and behavior.',
        color: '#00796B',
        icon: '🔀',
        tags: ['@if', '@for', 'directives', 'control flow'],
        keyPoints: [
          '@if (condition) { } is Angular 17+ control flow — replaces the old *ngIf directive.',
          '@for (item of list; track item.id) { } replaces *ngFor and requires a track expression.',
          'track tells Angular how to identify items so it can reuse DOM nodes efficiently instead of re-rendering everything.',
          'Attribute directives like [class.active]="isActive" add or remove CSS classes conditionally.',
          '@empty inside @for renders a fallback when the list is empty — no extra *ngIf needed.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'TypeScript',
            code: `import { Component, signal } from '@angular/core';

interface Task { id: number; text: string; done: boolean; }

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  tasks = signal<Task[]>([
    { id: 1, text: 'Learn Angular signals', done: true  },
    { id: 2, text: 'Build a component',     done: false },
    { id: 3, text: 'Deploy the app',        done: false },
  ]);

  toggle(id: number): void {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }
}`
          },
          {
            lang: 'html',
            label: 'Template',
            code: `<!-- tasks.component.html -->

@if (tasks().length > 0) {
  <ul>
    @for (task of tasks(); track task.id) {

      <!-- [class.done] adds the CSS class only when task.done is true -->
      <li [class.done]="task.done">

        {{ task.text }}

        <button (click)="toggle(task.id)">
          {{ task.done ? 'Undo' : 'Complete' }}
        </button>
      </li>
    }
  </ul>
} @else {
  <!-- @empty alternative: shown when the list is empty -->
  <p>No tasks yet — add one!</p>
}`
          }
        ]
      },
      {
        id: 'services-di',
        title: 'Services and Dependency Injection',
        shortTitle: 'Services & DI',
        summary:
          'Keep UI logic in components and business/state logic in services. Angular\'s DI system wires them together automatically.',
        color: '#E65100',
        icon: '💉',
        tags: ['services', 'DI', 'singleton', '@Injectable'],
        keyPoints: [
          'Services hold shared state and business logic — components stay focused on displaying data.',
          '@Injectable({ providedIn: \'root\' }) registers a service as a singleton available everywhere.',
          'inject() is the modern way to pull a service into a component (replaces constructor injection).',
          'Because services are singletons, two components that inject the same service share the same state.',
          'This is how the filter signal works in THIS app — set in the service, read by the topics component.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'cart.service.ts',
            code: `import { Injectable, signal, computed } from '@angular/core';

// providedIn: 'root' → one shared instance across the whole app
@Injectable({ providedIn: 'root' })
export class CartService {

  // Private signal — components can read but not set directly
  private items = signal<string[]>([]);

  // computed() derives a read-only value from the signal
  itemCount = computed(() => this.items().length);

  addItem(name: string): void {
    this.items.update(list => [...list, name]);
  }

  removeAll(): void {
    this.items.set([]);
  }

  getItems() { return this.items; }
}`
          },
          {
            lang: 'ts',
            label: 'shop.component.ts',
            code: `import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  template: \`
    <p>Items in cart: {{ cart.itemCount() }}</p>
    <button (click)="cart.addItem('Widget')">Add Widget</button>
    <button (click)="cart.removeAll()">Clear Cart</button>
  \`
})
export class ShopComponent {
  // inject() asks Angular's DI system for the CartService singleton
  cart = inject(CartService);
}`
          }
        ]
      },
      {
        id: 'routing',
        title: 'Routing',
        shortTitle: 'Routing',
        summary:
          'Angular\'s router turns a single-page app into a multi-page experience — with URL-driven navigation, route params, and lazy loading.',
        color: '#283593',
        icon: '🗺️',
        tags: ['routing', 'RouterLink', 'lazy loading', 'params'],
        keyPoints: [
          'provideRouter(routes) in app.config.ts activates the router for the whole app.',
          '<router-outlet> is a placeholder — Angular swaps the active component in here on navigation.',
          'routerLink="/path" navigates without a full page reload. routerLinkActive="active" adds a CSS class.',
          'Route parameters like { path: \'product/:id\' } let you pass data through the URL.',
          'loadComponent: () => import(…) defers loading a component until its route is first visited — great for performance.'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'app.routes.ts',
            code: `import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ProductsComponent } from './pages/products.component';

export const routes: Routes = [
  // Exact match for the root path
  { path: '', component: HomeComponent },

  // Regular route
  { path: 'products', component: ProductsComponent },

  // Route parameter — accessed via ActivatedRoute
  { path: 'product/:id', component: ProductDetailComponent },

  // Lazy-loaded route: bundle only downloaded when user visits /admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent)
  },

  // Catch-all redirect for unknown URLs
  { path: '**', redirectTo: '' }
];`
          },
          {
            lang: 'html',
            label: 'nav template',
            code: `<!-- app.component.html -->

<nav>
  <!-- routerLink navigates without reloading the page -->
  <a routerLink="/">Home</a>

  <!-- routerLinkActive adds the "active" CSS class on the matching route -->
  <a routerLink="/products" routerLinkActive="active">Products</a>

  <!-- exact match: only active when the path is exactly "/" -->
  <a routerLink="/" routerLinkActive="active"
     [routerLinkActiveOptions]="{ exact: true }">Home</a>
</nav>

<!-- Angular renders the active route's component here -->
<router-outlet />`
          }
        ]
      },
      {
        id: 'http-observables',
        title: 'HTTP + Observables',
        shortTitle: 'HTTP & Observables',
        summary:
          'Connect your app to a backend using HttpClient and Observables — and let the async pipe handle subscriptions so you never forget to unsubscribe.',
        color: '#00838F',
        icon: '🌐',
        tags: ['HTTP', 'Observable', 'async pipe', 'RxJS'],
        keyPoints: [
          'HttpClient.get<T>(url) returns an Observable — the HTTP request fires when something subscribes.',
          'Services are the right place for HTTP calls; components subscribe and display the results.',
          'The async pipe in templates subscribes automatically AND unsubscribes when the component is destroyed.',
          'pipe(map(…), catchError(…)) lets you transform or handle errors before data reaches the template.',
          'An Observable is a stream — it can emit once (HTTP response) or many times (WebSocket, events).'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'products.service.ts',
            code: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Product { id: number; name: string; price: number; }

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private url = 'https://api.example.com/products';

  // Returns an Observable — the GET request only fires when subscribed
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map(products => products.filter(p => p.price > 0)), // transform
      catchError(err => { console.error(err); return []; }) // handle errors
    );
  }
}`
          },
          {
            lang: 'html',
            label: 'Template',
            code: `<!-- products-list.component.html -->

<!-- async pipe: subscribes, unwraps the value, AND auto-unsubscribes -->
@if (products$ | async; as products) {

  <p>{{ products.length }} products loaded</p>

  <ul>
    @for (product of products; track product.id) {
      <li>{{ product.name }} — \${{ product.price }}</li>
    }
  </ul>

} @else {
  <!-- Shown while the Observable hasn't emitted yet -->
  <p class="loading">Loading products…</p>
}`
          }
        ]
      },
      {
        id: 'signals',
        title: 'Signals and Modern Reactivity',
        shortTitle: 'Signals',
        summary:
          'Signals are Angular 21\'s reactive state primitive: fine-grained, synchronous, and simple. Combine them with Observables for a complete reactive model.',
        color: '#2E7D32',
        icon: '⚡',
        tags: ['signals', 'computed', 'effect', 'reactivity'],
        keyPoints: [
          'signal(value) creates a reactive container. Read it by calling it like a function: count().',
          'signal.set(newValue) replaces the value. signal.update(fn) derives a new value from the old one.',
          'computed(() => expr) creates a read-only signal that recalculates whenever its dependencies change.',
          'effect(() => sideEffect) runs a function whenever any signal it reads changes — great for logging, localStorage, or DOM side-effects.',
          'Rule of thumb: use signals for synchronous app state, use Observables for async streams (HTTP, WebSocket, timers).'
        ],
        codeTabs: [
          {
            lang: 'ts',
            label: 'TypeScript',
            code: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  // 1. signal() — the reactive source of truth
  count = signal(0);

  // 2. computed() — automatically recalculates when count changes
  doubled  = computed(() => this.count() * 2);
  isEven   = computed(() => this.count() % 2 === 0);

  constructor() {
    // 3. effect() — runs every time count changes
    effect(() => {
      console.log('Count is now:', this.count());
      // Great for: localStorage, analytics, logging
    });
  }

  increment(): void { this.count.update(n => n + 1); }
  decrement(): void { this.count.update(n => Math.max(0, n - 1)); }
  reset():     void { this.count.set(0); }
}`
          },
          {
            lang: 'html',
            label: 'Template',
            code: `<!-- counter.component.html -->
<!-- Templates read signals by calling them: count() -->

<div class="counter">
  <p>Count:   {{ count() }}</p>
  <p>Doubled: {{ doubled() }}</p>
  <p>Parity:  {{ isEven() ? 'Even ✓' : 'Odd' }}</p>

  <button (click)="decrement()" [disabled]="count() === 0">−</button>
  <button (click)="reset()">Reset</button>
  <button (click)="increment()">+</button>
</div>`
          }
        ]
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
