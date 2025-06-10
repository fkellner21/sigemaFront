import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEquiposDeModeloComponent } from './lista-equipos-de-modelo.component';

describe('ListaEquiposDeModeloComponent', () => {
  let component: ListaEquiposDeModeloComponent;
  let fixture: ComponentFixture<ListaEquiposDeModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEquiposDeModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEquiposDeModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
