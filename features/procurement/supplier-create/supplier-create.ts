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


  private fb = inject(FormBuilder);
  public supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    leadTime: [0, [Validators.required, Validators.min(1)]]
  });

  onSubmit(){
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.value;
      const supplierRequest: SupplierRequest = {
        name: formValue.name || '',
        contact: formValue.contact || '',
        rating: Number(formValue.rating) || 0,
        leadTime: Number(formValue.leadTime) || 0
      };

      this.supplierService.createSupplier(supplierRequest).subscribe(() => {
        this.supplierForm.reset();
      });
    }
  }

}
