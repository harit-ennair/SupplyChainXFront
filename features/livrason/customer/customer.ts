import {Component, inject, OnInit, signal} from '@angular/core';
import {CustomerServic} from '../../../core/services/customer.servic';
import {customerResponse} from '../../../models/customer.model';
import {RouterLink, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CustomerStateService} from '../../../core/services/customer-state.service';

@Component({
  selector: 'app-customer',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {


  private customerService = inject(CustomerServic);
  private customerStateService = inject(CustomerStateService);
  private router = inject(Router);
  protected customers = signal<customerResponse[]>([]);


  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.customerService.getCustomers().subscribe(data => this.customers.set(data));
  }

  updateCustomer(id: number): void {
    const customerToUpdate = this.customers().find(c => c.idCustomer === id);
    if (customerToUpdate) {
      this.customerStateService.setCurrentCustomer(customerToUpdate);
      this.router.navigate(['/livraison/customerCreate']);
    }
  }


  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }


}
