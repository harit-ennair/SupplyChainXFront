import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productRequest, productResponse} from '../../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductServic {

  private apiUrl  = 'http://localhost:8080/api/products';

  private http  = inject(HttpClient);

  getProducts(){
    return this.http.get<[productResponse]>(this.apiUrl);
  }

  createProducts(product: productRequest){
    return this.http.post<productRequest>(this.apiUrl, product);
  }

  updateProducts(productId: number, product: productRequest){
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<productRequest>(url, product);
  }


  deleteProducts(productId: number){
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }

}
