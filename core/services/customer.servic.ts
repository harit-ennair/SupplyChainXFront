import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {customerRequest, customerResponse} from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerServic {

  private apiUrl  = 'http://localhost:8080/api/customers';

  private http  = inject(HttpClient);


  getCustomers(){
    return this.http.get<[customerResponse]>(this.apiUrl);
  }

  createCustomer(customer: customerRequest){
    return this.http.post<customerRequest>(this.apiUrl, customer);
  }

  updateCustomer(customerId: number, customer: customerRequest){
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.put<customerRequest>(url, customer);
  }


  deleteCustomer(customerId: number){
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete<void>(url);
  }


}
