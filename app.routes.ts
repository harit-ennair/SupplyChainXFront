import { Routes } from '@angular/router';
import {SupplierCreate} from './features/procurement/supplier-create/supplier-create';
import {RawMaterialsCreate} from './features/procurement/raw-materials-create/raw-materials-create';

export const routes: Routes = [

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
