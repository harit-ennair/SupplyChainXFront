import {Component, inject, OnInit, signal} from '@angular/core';
import {RawMaterialsService} from '../../../core/services/raw-materials.service';
import {rawMaterialsResponse} from '../../../models/raw-materials.model';
import {RouterLink, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RawMaterialsStateService} from '../../../core/services/raw-materials-state.service';

@Component({
  selector: 'app-raw-materials',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './raw-materials.html',
  styleUrl: './raw-materials.css',
})
export class RawMaterials implements OnInit {


  private rawMaterialsService = inject(RawMaterialsService);
  private rawMaterialsStateService = inject(RawMaterialsStateService);
  private router = inject(Router);
  protected rawmaterials = signal<rawMaterialsResponse[]>([]);


  ngOnInit(): void {
    this.loadRawMaterials();
  }

  loadRawMaterials(){
    this.rawMaterialsService.getSuppliers().subscribe(data => this.rawmaterials.set(data));
  }

  updateMaterial(id: number): void {
    const materialToUpdate = this.rawmaterials().find(m => m.idMaterial === id);
    if (materialToUpdate) {
      this.rawMaterialsStateService.setCurrentRawMaterial(materialToUpdate);
      this.router.navigate(['/procurements/rawMaterialCreate']);
    }
  }


  deleteMaterial(id: number): void {
    this.rawMaterialsService.deleteSupplier(id).subscribe(() => {
      this.loadRawMaterials();
    });
  }


}
