import { Routes } from '@angular/router';
import {SupplierCreate} from './features/procurement/supplier-create/supplier-create';

export const routes: Routes = [

  {
    path: 'procurements',
    children: [

      { path: 'Supplier', loadComponent: () => import('./features/procurement/supplier/supplier').then(m => m.Supplier) },
      { path: 'SupplierCreate', loadComponent: () => import('./features/procurement/supplier-create/supplier-create').then(m => m.SupplierCreate) },

    ]
  }

];
