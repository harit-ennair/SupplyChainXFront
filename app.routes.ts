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
  }

];
