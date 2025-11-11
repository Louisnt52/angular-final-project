import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards/auth.guard';

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
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
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
        loadChildren: () => import('./pages/users/user/user.routes').then(m => m.userRoutes),
        //canActivate: [authGuard, adminGuard]
    },
    {
        path: '**',
        redirectTo: 'product'
    }
];