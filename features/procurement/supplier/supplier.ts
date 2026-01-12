import {Component, inject, OnInit, signal} from '@angular/core';
import {SupplierService} from '../../../core/services/supplier.service';
import {SupplierResponse} from '../../../models/supplier.model';

@Component({
  selector: 'app-supplier',
  imports: [],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit {

  private supplierService = inject(SupplierService);
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

}
