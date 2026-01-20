import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {productRequest} from '../../../models/product.model';
import {ProductService} from '../../../core/services/product.service';
import {ProductStateService} from '../../../core/services/product-state.service';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {

  private productService = inject(ProductService);
  private productStateService = inject(ProductStateService);
  private router = inject(Router);

  public productIdToUpdate: number | null = null;
  public isLoading = false;
  public isEditMode = false;

  private fb = inject(FormBuilder);
  public productForm = this.fb.group({
    name: ['', Validators.required],
    productionTime: [0, [Validators.required, Validators.min(1)]],
    cost: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const productToEdit = this.productStateService.getCurrentProduct();
    if (productToEdit) {
      this.productIdToUpdate = productToEdit.idProduct;
      this.isEditMode = true;
      this.productForm.patchValue({
        name: productToEdit.name,
        productionTime: productToEdit.productionTime,
        cost: productToEdit.cost,
        stock: productToEdit.stock
      });
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.isLoading = true;

    const productRequest: productRequest = {
      name: this.productForm.value.name!,
      productionTime: Number(this.productForm.value.productionTime),
      cost: Number(this.productForm.value.cost),
      stock: Number(this.productForm.value.stock)
    };

    if (this.productIdToUpdate) {
      // UPDATE
      this.productService
        .updateProducts(this.productIdToUpdate, productRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['production/products']);
          }
        });
    } else {
      // CREATE
      this.productService
        .createProducts(productRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['production/products']);
          }
        });
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productIdToUpdate = null;
    this.isEditMode = false;
    this.productStateService.clearCurrentProduct();
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['production/products']);
  }

}
