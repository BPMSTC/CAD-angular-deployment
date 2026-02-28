import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal(this.loadPreference());

  constructor() {
    // Apply the theme to <html> whenever the signal changes
    effect(() => {
      const isDark = this.dark();
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      try { localStorage.setItem('ng-hub-theme', isDark ? 'dark' : 'light'); } catch { /* ignore */ }
    });
    // Apply immediately on first load
    document.documentElement.setAttribute('data-theme', this.dark() ? 'dark' : 'light');
  }

  toggle(): void {
    this.dark.update(v => !v);
  }

  private loadPreference(): boolean {
    try {
      const stored = localStorage.getItem('ng-hub-theme');
      if (stored) return stored === 'dark';
    } catch { /* ignore */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }
}
