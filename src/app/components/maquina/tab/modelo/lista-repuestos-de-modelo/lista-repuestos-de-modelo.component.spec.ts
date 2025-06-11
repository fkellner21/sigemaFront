import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRepuestosDeModeloComponent } from './lista-repuestos-de-modelo.component';

describe('ListaRepuestosDeModeloComponent', () => {
  let component: ListaRepuestosDeModeloComponent;
  let fixture: ComponentFixture<ListaRepuestosDeModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRepuestosDeModeloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaRepuestosDeModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
