import { Injectable, signal } from '@angular/core';
import { rawMaterialsResponse } from '../../models/raw-materials.model';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialsStateService {
  private currentRawMaterial = signal<rawMaterialsResponse | null>(null);

  setCurrentRawMaterial(rawMaterial: rawMaterialsResponse) {
    this.currentRawMaterial.set(rawMaterial);
  }

  getCurrentRawMaterial(): rawMaterialsResponse | null {
    return this.currentRawMaterial();
  }

  clearCurrentRawMaterial() {
    this.currentRawMaterial.set(null);
  }
}

