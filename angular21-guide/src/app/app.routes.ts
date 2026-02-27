import { Routes } from '@angular/router';
import { OverviewPageComponent } from './pages/overview-page.component';
import { TopicsPageComponent } from './pages/topics-page.component';

export const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'topics', component: TopicsPageComponent },
  { path: '**', redirectTo: '' }
];
