import { Routes } from '@angular/router';
import { countryDetailResolver } from './core/resolvers/country-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'detail/:name',
    loadComponent: () =>
      import('./pages/detail/detail.component').then((c) => c.DetailComponent),
    resolve: { countryDetail: countryDetailResolver },
  },
];
