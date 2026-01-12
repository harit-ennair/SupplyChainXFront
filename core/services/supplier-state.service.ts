import { Injectable, signal } from '@angular/core';
import { SupplierResponse } from '../../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierStateService {
  private currentSupplier = signal<SupplierResponse | null>(null);

  setSupplierForEdit(supplier: SupplierResponse) {
    this.currentSupplier.set(supplier);
  }

  getCurrentSupplier() {
    return this.currentSupplier();
  }

  clearCurrentSupplier() {
    this.currentSupplier.set(null);
  }
}
