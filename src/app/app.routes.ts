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
        path: 'product/add',
        loadComponent: () => import('./components/product-add/product-add').then(m => m.ProductAdd)
    },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('./components/product-edit/product-edit').then(m => m.ProductEdit)
    },
    {
        path: 'product/delete/:id',
        loadComponent: () => import('./components/product-delete/product-delete').then(m => m.ProductDelete)
    },
    {
        path: 'forms',
        loadComponent: () => import('./pages/forms/forms')
    },
    {
        path: 'reactive-forms',
        loadComponent: () => import('./pages/reactive-forms/reactive-forms')
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