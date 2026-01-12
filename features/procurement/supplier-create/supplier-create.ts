import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierRequest} from '../../../models/supplier.model';
import {SupplierService} from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-create',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-create.html',
  styleUrl: './supplier-create.css',
})
export class SupplierCreate {

  private supplierService = inject(SupplierService);
  public supplierIdToUpdate: number | null = null;

  private fb = inject(FormBuilder);
  public supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    leadTime: [0, [Validators.required, Validators.min(1)]]
  });

  onSubmit() {
    if (this.supplierForm.invalid) return;

    const supplierRequest: SupplierRequest = {
      name: this.supplierForm.value.name!,
      contact: this.supplierForm.value.contact!,
      rating: Number(this.supplierForm.value.rating),
      leadTime: Number(this.supplierForm.value.leadTime)
    };

    if (this.supplierIdToUpdate) {
      // UPDATE
      this.supplierService
        .updateSupplier(this.supplierIdToUpdate, supplierRequest)
        .subscribe(() => {
          this.resetForm();
        });
    } else {
      // CREATE
      this.supplierService
        .createSupplier(supplierRequest)
        .subscribe(() => {
          this.resetForm();
        });
    }
  }

  resetForm() {
    this.supplierForm.reset();
    this.supplierIdToUpdate = null;
  }

}
