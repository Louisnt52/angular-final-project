import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },  
    {
        path:'',
        loadComponent: () => import('./pages/main-layout/main-layout'),
        children:[
            {
                path: '',
                loadComponent: () => import('./pages/home/home'),
                canActivate: [authGuard]
            },
            {
                path:'product',
                loadComponent: () => import('./pages/product/product'),
                canActivate: [authGuard]
            },
            {
                path:'product/add',
                loadComponent: () => import('./components/product-add/product-add').then(m => m.ProductAdd),
                canActivate: [authGuard]
            },
            {
                path: 'product/edit/:id',
                loadComponent: () => import('./components/product-edit/product-edit').then(m => m.ProductEdit),
                canActivate: [authGuard]
            },
            {
                path: 'product/delete/:id',
                loadComponent: () => import('./components/product-delete/product-delete').then(m => m.ProductDelete),
                canActivate: [authGuard]
            },
            {
                path: 'forms',
                loadComponent: () => import('./pages/forms/forms'),
                canActivate: [authGuard]
            },
            {
                path: 'reactive-forms',
                loadComponent: () => import('./pages/reactive-forms/reactive-forms'),
                canActivate: [authGuard]
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/users/user/user.routes').then(m => m.userRoutes),
                canActivate: [authGuard, adminGuard]
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];