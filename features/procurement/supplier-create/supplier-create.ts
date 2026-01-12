import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SupplierRequest} from '../../../models/supplier.model';
import {SupplierService} from '../../../core/services/supplier.service';
import {SupplierStateService} from '../../../core/services/supplier-state.service';

@Component({
  selector: 'app-supplier-create',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-create.html',
  styleUrl: './supplier-create.css',
})
export class SupplierCreate implements OnInit {

  private supplierService = inject(SupplierService);
  private supplierStateService = inject(SupplierStateService);
  private router = inject(Router);

  public supplierIdToUpdate: number | null = null;
  public isLoading = false;
  public isEditMode = false;

  private fb = inject(FormBuilder);
  public supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    leadTime: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    const supplierToEdit = this.supplierStateService.getCurrentSupplier();
    if (supplierToEdit) {
      this.supplierIdToUpdate = supplierToEdit.idSupplier;
      this.isEditMode = true;
      this.supplierForm.patchValue({
        name: supplierToEdit.name,
        contact: supplierToEdit.contact,
        rating: supplierToEdit.rating,
        leadTime: supplierToEdit.leadTime
      });
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.supplierForm.invalid) return;

    this.isLoading = true;

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
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/procurements/Supplier']);
          }
        });
    } else {
      // CREATE
      this.supplierService
        .createSupplier(supplierRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/procurements/Supplier']);
          }
        });
    }
  }

  resetForm() {
    this.supplierForm.reset();
    this.supplierIdToUpdate = null;
    this.isEditMode = false;
    this.supplierStateService.clearCurrentSupplier();
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['/procurements/Supplier']);
  }

}
