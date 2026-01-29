import { Injectable, signal } from '@angular/core';
import { customerResponse } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerStateService {
  private currentCustomer = signal<customerResponse | null>(null);

  setCurrentCustomer(customer: customerResponse) {
    this.currentCustomer.set(customer);
  }

  getCurrentCustomer(): customerResponse | null {
    return this.currentCustomer();
  }

  clearCurrentCustomer() {
    this.currentCustomer.set(null);
  }
}

