import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'product',
        loadComponent: () => import('./pages/product/product')
    },
    {
        path: 'forms',
        loadComponent: () => import('./pages/forms/forms')
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/users/users')
    },
    {
        path: '**',
        redirectTo: 'product'
    }
];