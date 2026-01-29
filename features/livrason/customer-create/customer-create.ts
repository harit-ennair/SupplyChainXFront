import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {customerRequest} from '../../../models/customer.model';
import {CustomerServic} from '../../../core/services/customer.servic';
import {CustomerStateService} from '../../../core/services/customer-state.service';

@Component({
  selector: 'app-customer-create',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css',
})
export class CustomerCreate implements OnInit {

  private customerService = inject(CustomerServic);
  private customerStateService = inject(CustomerStateService);
  private router = inject(Router);

  public customerIdToUpdate: number | null = null;
  public isLoading = false;
  public isEditMode = false;

  private fb = inject(FormBuilder);
  public customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit(): void {
    const customerToEdit = this.customerStateService.getCurrentCustomer();
    if (customerToEdit) {
      this.customerIdToUpdate = customerToEdit.idCustomer;
      this.isEditMode = true;
      this.customerForm.patchValue({
        name: customerToEdit.name,
        email: customerToEdit.email,
        address: customerToEdit.address,
        city: customerToEdit.city
      });
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) return;

    this.isLoading = true;

    const customerRequest: customerRequest = {
      name: this.customerForm.value.name!,
      email: this.customerForm.value.email!,
      address: this.customerForm.value.address!,
      city: this.customerForm.value.city!
    };

    if (this.customerIdToUpdate) {
      // UPDATE
      this.customerService
        .updateCustomer(this.customerIdToUpdate, customerRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/livraison/customers']);
          }
        });
    } else {
      // CREATE
      this.customerService
        .createCustomer(customerRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/livraison/customers']);
          }
        });
    }
  }

  resetForm() {
    this.customerForm.reset();
    this.customerIdToUpdate = null;
    this.isEditMode = false;
    this.customerStateService.clearCurrentCustomer();
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['/livraison/customers']);
  }

}
