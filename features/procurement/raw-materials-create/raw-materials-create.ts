import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {rawMaterialsRequest} from '../../../models/raw-materials.model';
import {RawMaterialsService} from '../../../core/services/raw-materials.service';
import {RawMaterialsStateService} from '../../../core/services/raw-materials-state.service';

@Component({
  selector: 'app-raw-materials-create',
  imports: [ReactiveFormsModule],
  templateUrl: './raw-materials-create.html',
  styleUrl: './raw-materials-create.css',
})
export class RawMaterialsCreate implements OnInit {

  private rawMaterialsService = inject(RawMaterialsService);
  private rawMaterialsStateService = inject(RawMaterialsStateService);
  private router = inject(Router);

  public rawMaterialIdToUpdate: number | null = null;
  public isLoading = false;
  public isEditMode = false;

  private fb = inject(FormBuilder);
  public rawMaterialForm = this.fb.group({
    name: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]],
    stockMin: [0, [Validators.required, Validators.min(0)]],
    unit: ['', Validators.required]
  });

  ngOnInit(): void {
    const rawMaterialToEdit = this.rawMaterialsStateService.getCurrentRawMaterial();
    if (rawMaterialToEdit) {
      this.rawMaterialIdToUpdate = rawMaterialToEdit.idMaterial;
      this.isEditMode = true;
      this.rawMaterialForm.patchValue({
        name: rawMaterialToEdit.name,
        stock: rawMaterialToEdit.stock,
        stockMin: rawMaterialToEdit.stockMin,
        unit: rawMaterialToEdit.unit
      });
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.rawMaterialForm.invalid) return;

    this.isLoading = true;

    const rawMaterialRequest: rawMaterialsRequest = {
      name: this.rawMaterialForm.value.name!,
      stock: Number(this.rawMaterialForm.value.stock),
      stockMin: Number(this.rawMaterialForm.value.stockMin),
      unit: this.rawMaterialForm.value.unit!
    };

    if (this.rawMaterialIdToUpdate) {
      // UPDATE
      this.rawMaterialsService
        .updateSupplier(this.rawMaterialIdToUpdate, rawMaterialRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/procurements/rawMaterials']);
          }
        });
    } else {
      // CREATE
      this.rawMaterialsService
        .createSupplier(rawMaterialRequest)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetForm();
            this.router.navigate(['/procurements/rawMaterials']);
          }
        });
    }
  }

  resetForm() {
    this.rawMaterialForm.reset();
    this.rawMaterialIdToUpdate = null;
    this.isEditMode = false;
    this.rawMaterialsStateService.clearCurrentRawMaterial();
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['/procurements/rawMaterials']);
  }

}
