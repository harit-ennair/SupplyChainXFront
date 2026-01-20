import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ProductService} from '../../../core/services/product.service';
import {ProductStateService} from '../../../core/services/product-state.service';
import {productResponse} from '../../../models/product.model';

@Component({
  selector: 'app-product',
  imports: [
    RouterLink
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  private productService = inject(ProductService);
  private productStateService = inject(ProductStateService);
  private router = inject(Router);
  protected products =  signal<productResponse[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  updateProduct(productId: number) {
    const productToUpdate = this.products().find(p => p.idProduct === productId);
    if (productToUpdate) {
      this.productStateService.setProductForEdit(productToUpdate);
      this.router.navigate(['/production/productCreate']);
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProducts(id).subscribe(() => this.loadProducts());
  }

}
