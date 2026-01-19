import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SupplierService} from '../../../core/services/supplier.service';
import {SupplierResponse} from '../../../models/supplier.model';
import {SupplierStateService} from '../../../core/services/supplier-state.service';

@Component({
  selector: 'app-supplier',
  imports: [
    RouterLink
  ],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit {

  private supplierService = inject(SupplierService);
  private router = inject(Router);
  private supplierStateService = inject(SupplierStateService);
  protected suppliers = signal<SupplierResponse[]>([]);


  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier(){
    this.supplierService.getSuppliers().subscribe(data => this.suppliers.set(data));
  }

  deleteSupplier(supplierId: number){
    this.supplierService.deleteSupplier(supplierId).subscribe(() => {
      this.loadSupplier();
    });
  }

  updateSupplier(supplierId: number){
    const supplierToUpdate = this.suppliers().find(s => s.idSupplier === supplierId);
    if (supplierToUpdate) {
      this.supplierStateService.setSupplierForEdit(supplierToUpdate);
      this.router.navigate(['/procurements/SupplierCreate']);
    }
  }

}
