import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home/home')},
  { path: 'demo', loadComponent: () => import('./pages/demo/demo')},
  { path: 'demo-dnd', loadComponent: () => import('./pages/demo-dnd/demo-dnd')},
  { path: 'demo-overlay', loadComponent: () => import('./pages/demo-overlay/demo-overlay')},
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard')},
  { path: 'demo-components', loadComponent: () => import('./pages/demo-components/demo-components')},
  { path: 'demo-forms-template', loadComponent: () => import('./pages/demo-forms-template/demo-forms-template')},
  { path: 'demo-customize-theme1', loadComponent: () => import('./pages/demo-theming/customize-demo1')},
  { path: 'demo-customize-theme2', loadComponent: () => import('./pages/demo-theming/customize-demo2')},
  { path: 'demo-forms-reactive', loadComponent: () => import('./pages/demo-forms-reactive/demo-forms-reactive')},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
