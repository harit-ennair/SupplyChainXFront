import {inject,Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {SupplierRequest, SupplierResponse} from '../../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  private apiUrl  = 'http://localhost:8080/api/suppliers';

  private http  = inject(HttpClient);

  getSuppliers(){
    return this.http.get<SupplierResponse[]>(this.apiUrl);
  }

  createSupplier(supplier: SupplierRequest){
    return this.http.post<SupplierRequest>(this.apiUrl, supplier);
  }





  deleteSupplier(supplierId: number){
    const url = `${this.apiUrl}/${supplierId}`;
    return this.http.delete<void>(url);
  }



}
