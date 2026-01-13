import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCreate } from './raw-materials-create';

describe('RawMaterialsCreate', () => {
  let component: RawMaterialsCreate;
  let fixture: ComponentFixture<RawMaterialsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
