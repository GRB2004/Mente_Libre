import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicaDetalleComponent } from './tecnica-detalle.component';

describe('TecnicaDetalleComponent', () => {
  let component: TecnicaDetalleComponent;
  let fixture: ComponentFixture<TecnicaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
