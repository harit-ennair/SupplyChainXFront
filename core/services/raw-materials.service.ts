import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rawMaterialsRequest, rawMaterialsResponse} from '../../models/raw-materials.model';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialsService {

  private apiUrl  = 'http://localhost:8080/api/raw-materials';

  private http  = inject(HttpClient);

  getSuppliers(){
    return this.http.get<rawMaterialsResponse[]>(this.apiUrl);
  }

  createSupplier(supplier: rawMaterialsRequest){
    return this.http.post<rawMaterialsRequest>(this.apiUrl, supplier);
  }

  updateSupplier(supplierId: number, supplier: rawMaterialsRequest){
    const url = `${this.apiUrl}/${supplierId}`;
    return this.http.put<rawMaterialsRequest>(url, supplier);
  }


  deleteSupplier(supplierId: number){
    const url = `${this.apiUrl}/${supplierId}`;
    return this.http.delete<void>(url);
  }

}
