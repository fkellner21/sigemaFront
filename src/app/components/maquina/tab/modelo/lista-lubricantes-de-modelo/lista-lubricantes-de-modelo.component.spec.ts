import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLubricantesDeModeloComponent } from './lista-lubricantes-de-modelo.component';

describe('ListaLubricantesDeModeloComponent', () => {
  let component: ListaLubricantesDeModeloComponent;
  let fixture: ComponentFixture<ListaLubricantesDeModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLubricantesDeModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLubricantesDeModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
