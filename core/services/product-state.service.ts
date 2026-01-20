import { Injectable, signal } from '@angular/core';
import { productResponse } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private currentProduct = signal<productResponse | null>(null);

  setProductForEdit(product: productResponse) {
    this.currentProduct.set(product);
  }

  getCurrentProduct() {
    return this.currentProduct();
  }

  clearCurrentProduct() {
    this.currentProduct.set(null);
  }
}

