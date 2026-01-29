import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
  },

  {
    path: 'procurements',
    children: [

      { path: 'Supplier',
        loadComponent: () => import('./features/procurement/supplier/supplier').then(m => m.Supplier) },

      { path: 'SupplierCreate',
        loadComponent: () => import('./features/procurement/supplier-create/supplier-create').then(m => m.SupplierCreate) },

      { path: 'rawMaterials',
        loadComponent: () => import('./features/procurement/raw-materials/raw-materials').then(m => m.RawMaterials)},

      { path: 'rawMaterialCreate',
        loadComponent: () => import('./features/procurement/raw-materials-create/raw-materials-create').then(m => m.RawMaterialsCreate) },


    ]
  },

  {
    path: 'production',
    children: [

      { path: 'products',
        loadComponent: () => import('./features/production/product/product').then(m => m.Product) },

      { path: 'productCreate',
        loadComponent: () => import('./features/production/product-create/product-create').then(m => m.ProductCreate) },


    ]
  },

  {
    path: 'livraison',
    children: [

      { path: 'customers',
        loadComponent: () => import('./features/livrason/customer/customer').then(m => m.Customer) },

      { path: 'customerCreate',
        loadComponent: () => import('./features/livrason/customer-create/customer-create').then(m => m.CustomerCreate) },


    ]
  }

];
